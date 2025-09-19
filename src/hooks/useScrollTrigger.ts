// Custom hook for scroll-triggered animations and effects

import { useEffect, useRef, useState, useCallback } from 'react';
import type { UseScrollTriggerOptions } from '../types/components';

export function useScrollTrigger({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
}: UseScrollTriggerOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const isCurrentlyIntersecting = entry.isIntersecting;
      
      if (triggerOnce) {
        if (isCurrentlyIntersecting && !hasTriggered) {
          setIsIntersecting(true);
          setHasTriggered(true);
        }
      } else {
        setIsIntersecting(isCurrentlyIntersecting);
      }
    },
    [triggerOnce, hasTriggered]
  );

  useEffect(() => {
    const currentTarget = targetRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(currentTarget);

    return () => {
      observer.disconnect();
    };
  }, [observerCallback, threshold, root, rootMargin]);

  return { ref: targetRef, isIntersecting };
}

// Hook for scroll position
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition(); // Set initial position

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

// Hook for scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      
      if (scrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [lastScrollY]);

  return scrollDirection;
}

// Hook to detect if element is at top of viewport
export function useScrollToTop(threshold = 100) {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.pageYOffset < threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isAtTop;
}