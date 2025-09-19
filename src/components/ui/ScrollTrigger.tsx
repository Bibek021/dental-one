// ScrollTrigger component for animations and effects

import { useEffect } from 'react';
import type { ScrollTriggerProps } from '../../types/components';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import { cn } from '../../utils';

export function ScrollTrigger({
  onEnter,
  onExit,
  threshold = 0.1,
  triggerOnce = false,
  rootMargin = '0px',
  className,
  children,
  ...props
}: ScrollTriggerProps) {
  const { ref, isIntersecting } = useScrollTrigger({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (isIntersecting && onEnter) {
      onEnter();
    } else if (!isIntersecting && onExit && !triggerOnce) {
      onExit();
    }
  }, [isIntersecting, onEnter, onExit, triggerOnce]);

  return (
    <div
      ref={ref as any}
      className={cn('scroll-trigger', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Animated wrapper that uses ScrollTrigger internally
export interface AnimatedScrollProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn';
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export function AnimatedScroll({
  children,
  animation = 'fadeIn',
  duration = 600,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className,
}: AnimatedScrollProps) {
  const { ref, isIntersecting } = useScrollTrigger({
    threshold,
    triggerOnce,
  });

  const animationClasses = {
    fadeIn: {
      initial: 'opacity-0',
      animate: 'opacity-100',
    },
    slideUp: {
      initial: 'opacity-0 translate-y-8',
      animate: 'opacity-100 translate-y-0',
    },
    slideDown: {
      initial: 'opacity-0 -translate-y-8',
      animate: 'opacity-100 translate-y-0',
    },
    slideLeft: {
      initial: 'opacity-0 translate-x-8',
      animate: 'opacity-100 translate-x-0',
    },
    slideRight: {
      initial: 'opacity-0 -translate-x-8',
      animate: 'opacity-100 translate-x-0',
    },
    scaleIn: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100',
    },
  };

  const currentAnimation = animationClasses[animation];

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-all ease-out',
        isIntersecting ? currentAnimation.animate : currentAnimation.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}

// Stagger animation for multiple children
export interface StaggeredAnimationProps {
  children: React.ReactNode[];
  animation?: AnimatedScrollProps['animation'];
  staggerDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export function StaggeredAnimation({
  children,
  animation = 'slideUp',
  staggerDelay = 100,
  threshold = 0.1,
  triggerOnce = true,
  className,
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedScroll
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          threshold={threshold}
          triggerOnce={triggerOnce}
        >
          {child}
        </AnimatedScroll>
      ))}
    </div>
  );
}