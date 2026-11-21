import { useEffect, useState } from 'react';

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return scrolled;
}

/** Lock body scroll while `active`, compensating for the scrollbar width. */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keep keyboard focus inside `ref` while active; restore focus on exit. */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const container = ref.current;
    const previouslyFocused = document.activeElement;
    const focusables = () => [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    focusables()[0]?.focus();
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [ref, active]);
}

/**
 * Id of the section currently being read (scroll-spy): the last section whose
 * top has passed a line 30% down the viewport. Position-based, so it never
 * sticks on an earlier section during fast scrolls or jumps.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = elements[0];
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el;
        else break;
      }
      // At the very bottom, the last section is the one being read
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        const last = elements[elements.length - 1];
        if (last.getBoundingClientRect().top < window.innerHeight) current = last;
      }
      setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);
  return active;
}
