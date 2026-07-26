/* ========================================
   AVANYA RESORT — Premium Scroll Animations
   GSAP + ScrollTrigger + Lenis
   ======================================== */

   (() => {
    'use strict';
  
    /* ---------- Helpers ---------- */
    const isMobile = () => window.innerWidth <= 768;
    const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    /* ---------- 1. Loader ---------- */
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      setTimeout(() => {
        loader.classList.add('loaded');
        initAll();
      }, 2200);
    });
  
    /* ---------- 2. Lenis Smooth Scroll ---------- */
    let lenis;
  
    function initLenis() {
      lenis = new Lenis({
        duration: isMobile() ? 1.0 : 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
  
      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
  
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  
    /* ---------- 3. Navigation ---------- */
    function initNav() {
      const nav = document.getElementById('nav');
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileLinks = document.querySelectorAll('[data-mobile-link]');
  
      // Scroll-based nav background
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          nav.classList.toggle('nav--scrolled', self.scroll() > 80);
        },
      });
  
      // Hamburger toggle
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
          gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
          gsap.to(spans[1], { opacity: 0, duration: 0.2 });
          gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
        } else {
          gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
          gsap.to(spans[1], { opacity: 1, duration: 0.2 });
          gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
      });
  
      // Close mobile menu on link click
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          const spans = hamburger.querySelectorAll('span');
          gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
          gsap.to(spans[1], { opacity: 1, duration: 0.2 });
          gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        });
      });
  
      // Smooth scroll for nav links
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(a.getAttribute('href'));
          if (target && lenis) {
            lenis.scrollTo(target, { offset: 0 });
          }
        });
      });
    }
  
    /* ---------- 4. Hero Section Animations ---------- */
    function initHero() {
      const tl = gsap.timeline({ delay: 0.2 });
  
      tl.to('.hero__tag', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          '.hero__title',
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .to(
          '.hero__location',
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .to(
          '.hero__subtitle',
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          '#scrollIndicator',
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.4'
        );
  
      // Set initial positions
      gsap.set(['.hero__tag', '.hero__title', '.hero__location', '.hero__subtitle'], {
        y: 40,
      });
  
      // Hero parallax zoom on scroll
      gsap.to('.hero__img', {
        scale: isMobile() ? 1.12 : 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: isMobile() ? 0.8 : 1.2,
        },
      });
  
      // Fade out hero content on scroll
      gsap.to('.hero__content', {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: '25% top',
          end: '80% top',
          scrub: 1,
        },
      });
  
      // Fade scroll indicator
      gsap.to('#scrollIndicator', {
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero',
          start: '10% top',
          end: '30% top',
          scrub: 1,
        },
      });
    }
  
    /* ---------- 5. Experience Section ---------- */
    function initExperience() {
      // Parallax background
      gsap.to('.experience__img', {
        yPercent: isMobile() ? -10 : -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.experience',
          start: 'top bottom',
          end: 'bottom top',
          scrub: isMobile() ? 0.5 : 1,
        },
      });
  
      // Content fade in
      const expTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.experience',
          start: isMobile() ? 'top 85%' : 'top 65%',
          end: 'center center',
          scrub: isMobile() ? 0.6 : 1,
        },
      });
  
      expTl
        .fromTo('.experience__tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.experience__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
        .fromTo('.experience__desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
        .to('.experience__divider', { opacity: 1, scaleX: 1, duration: 0.8 }, '-=0.4');
    }
  
    /* ---------- 6. Villas Section (Horizontal Scroll) ---------- */
    function initVillas() {
      // Header animation
      const villaHeaderTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.villas__header',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 0.8,
        },
      });
  
      villaHeaderTl
        .fromTo('.villas__tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.villas__title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
  
      // Horizontal scroll
      const track = document.getElementById('villasTrack');
      const cards = track.querySelectorAll('.villa-card');
  
      if (cards.length > 0 && !isMobile()) {
        const totalWidth = track.scrollWidth - window.innerWidth + 200;
  
        gsap.to(track, {
          x: () => -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: '.villas__scroll-wrap',
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
  
        // Card entrance animation
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById && gsap.getById('villasScroll'),
                start: 'left 85%',
                end: 'left 50%',
                scrub: 0.8,
              },
            }
          );
        });
      } else {
        // Mobile: simple scroll with card animations
        track.style.overflowX = 'auto';
        track.style.scrollSnapType = 'x mandatory';
        cards.forEach((card) => {
          card.style.scrollSnapAlign = 'center';
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
  
      // 3D tilt on hover (desktop)
      if (!isMobile()) {
        cards.forEach((card) => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
  
            gsap.to(card, {
              rotateX: rotateX,
              rotateY: rotateY,
              transformPerspective: 800,
              duration: 0.4,
              ease: 'power2.out',
            });
          });
  
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
          });
        });
      }
    }
  
    /* ---------- 7. Night Ambience Section ---------- */
    function initNight() {
      // Slow fade + blur transition
      gsap.fromTo(
        '.night__img',
        { filter: 'blur(8px)', scale: 1.1 },
        {
          filter: 'blur(0px)',
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.night',
            start: 'top bottom',
            end: isMobile() ? 'top 30%' : 'center center',
            scrub: isMobile() ? 0.6 : 1.2,
          },
        }
      );
  
      // Glowing lights fade in
      gsap.to('.night__glow', {
        opacity: 1,
        duration: 2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.night',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
  
      // Pulsating glow animation
      gsap.to('.night__glow--1', {
        scale: 1.3,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.night__glow--2', {
        scale: 1.2,
        opacity: 0.5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
      gsap.to('.night__glow--3', {
        scale: 1.4,
        opacity: 0.4,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
  
      // Content fade in
      const nightTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.night',
          start: isMobile() ? 'top 75%' : 'top 50%',
          end: 'center center',
          scrub: isMobile() ? 0.6 : 1,
        },
      });
  
      nightTl
        .fromTo('.night__tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.night__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.5')
        .fromTo('.night__desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
    }
  
    /* ---------- 8. Master Layout Section (3D Perspective Zoom) ---------- */
    function initMasterLayout() {
      const img = document.querySelector('.master-layout__img');
  
      // 3D perspective zoom on scroll (fake camera movement)
      gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: isMobile() ? 1.6 : 2.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.master-layout',
            start: 'top top',
            end: 'bottom top',
            scrub: isMobile() ? 0.8 : 1.5,
          },
        }
      );
  
      // Content
      const layoutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.master-layout__sticky',
          start: 'top 60%',
          end: 'top 20%',
          scrub: 0.8,
        },
      });
  
      layoutTl
        .fromTo('.master-layout__tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(
          '.master-layout__title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.5'
        );
  
      // Fade out text as user zooms in
      gsap.to('.master-layout__content', {
        opacity: 0,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: '.master-layout',
          start: '30% top',
          end: '70% top',
          scrub: 1,
        },
      });
    }
  
    /* ---------- 9. CTA Section ---------- */
    function initCTA() {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cta',
          start: 'top 75%',
          end: 'center center',
          scrub: 0.8,
        },
      });
  
      ctaTl
        .fromTo('.cta__tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.cta__title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .fromTo('.cta__desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .fromTo(
          '.cta__btn',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          '-=0.4'
        );
    }
  
    /* ---------- 10. Subtle Three.js Depth Particles ---------- */
    function initThreeJSParticles() {
      // Only load Three.js on capable devices
      if (isMobile() || isReducedMotion()) return;
  
      // Dynamically load Three.js
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
      script.onload = () => {
        createParticleField();
      };
      document.head.appendChild(script);
    }
  
    function createParticleField() {
      const canvas = document.createElement('canvas');
      canvas.id = 'particles-canvas';
      canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        opacity: 0.3;
      `;
      document.body.prepend(canvas);
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  
      // Create particles
      const geometry = new THREE.BufferGeometry();
      const count = 400;
      const positions = new Float32Array(count * 3);
  
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 30;
        positions[i + 1] = (Math.random() - 0.5) * 30;
        positions[i + 2] = (Math.random() - 0.5) * 20;
      }
  
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
      const material = new THREE.PointsMaterial({
        color: 0xc9a96e,
        size: 0.03,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
  
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      camera.position.z = 8;
  
      let scrollY = 0;
      lenis.on('scroll', (e) => {
        scrollY = e.animatedScroll;
      });
  
      function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
        camera.position.y = -scrollY * 0.0015;
        renderer.render(scene, camera);
      }
      animate();
  
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  
    /* ---------- Master Init ---------- */
    function initAll() {
      gsap.registerPlugin(ScrollTrigger);
      initLenis();
      initNav();
      initHero();
      initExperience();
      initVillas();
      initNight();
      initMasterLayout();
      initCTA();
      initThreeJSParticles();
    }
  })();
  