type Cleanup = () => void;

let gsapPromise:
  | Promise<{
      gsap: typeof import('gsap').default;
      ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    }>
  | undefined;

const motionAllowed = (): boolean =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const loadGsap = async () => {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.default;
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
        return {
          gsap,
          ScrollTrigger: scrollTriggerModule.ScrollTrigger
        };
      }
    );
  }

  return gsapPromise;
};

export const initHeroReveal = async (root: HTMLElement | null): Promise<Cleanup | undefined> => {
  if (!root || !motionAllowed()) {
    return undefined;
  }

  const { gsap } = await loadGsap();
  const ctx = gsap.context(() => {
    gsap.set(root.querySelectorAll<HTMLElement>('[data-hero-item]'), {
      y: 24,
      opacity: 0
    });

    gsap.set(root.querySelectorAll<HTMLElement>('[data-hero-image]'), {
      scale: 1.06,
      opacity: 0
    });

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .to(root.querySelectorAll<HTMLElement>('[data-hero-item]'), {
        y: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.08
      })
      .to(
        root.querySelectorAll<HTMLElement>('[data-hero-image]'),
        {
          scale: 1,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12
        },
        0.1
      );
  }, root);

  return () => ctx.revert();
};

export const initSectionReveal = async (
  root: HTMLElement | null,
  selector = '[data-reveal]'
): Promise<Cleanup | undefined> => {
  if (!root) {
    return undefined;
  }

  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) {
    return undefined;
  }

  if (!motionAllowed()) {
    targets.forEach((target) => {
      target.style.opacity = '1';
      target.style.transform = 'none';
    });
    return undefined;
  }

  const { gsap } = await loadGsap();
  const ctx = gsap.context(() => {
    targets.forEach((target, index) => {
      gsap.fromTo(
        target,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.74,
          delay: index * 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 86%',
            once: true
          }
        }
      );
    });
  }, root);

  return () => ctx.revert();
};

export const initParallax = async (
  root: HTMLElement | null,
  selector = '[data-parallax]'
): Promise<Cleanup | undefined> => {
  if (!root || !motionAllowed()) {
    return undefined;
  }

  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) {
    return undefined;
  }

  const { gsap } = await loadGsap();
  const ctx = gsap.context(() => {
    targets.forEach((target) => {
      gsap.fromTo(
        target,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: target.parentElement ?? target,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }, root);

  return () => ctx.revert();
};

export const initMarquee = async (track: HTMLElement | null): Promise<Cleanup | undefined> => {
  if (!track || !motionAllowed()) {
    return undefined;
  }

  const { gsap } = await loadGsap();
  const ctx = gsap.context(() => {
    gsap.to(track, {
      xPercent: -50,
      duration: 22,
      repeat: -1,
      ease: 'none'
    });
  }, track);

  return () => ctx.revert();
};
