document.addEventListener("DOMContentLoaded", function () {
  lenis();
  initMarquees();
  initServiceSection();
  initMarqueeScrollAnimation();
  initInfiniteSliders();
  initLogoScaleAnimation();
  initReviewSliderWithAnimation();
  initFAQAccordion();
  initHeroAndScrollAnimations();
  initRocketScrollAnimation();
  initAnimatedHeading();
  initTalkButtonFollow();
  initHeaderScrollAnimation();
  initStickyAboutAndService();
  initDevLogoSwiper();
  setupScrollCards();
});

// Global register
gsap.registerPlugin(ScrollTrigger);


function lenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: true,
  });

  function animate(time) {
    lenis.raf(time);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function initMarquees() {
  function createMarquee(selector, speed, reverse = false) {
    let wrapper = document.querySelector(selector);
    if (!wrapper) return;

    let textContent = wrapper.innerHTML;
    wrapper.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`;

    gsap.set(wrapper, { xPercent: reverse ? -100 : 0 });

    return gsap.to(wrapper, {
      xPercent: reverse ? 0 : -100,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }

  let marquee1 = createMarquee("#marqueeText1", 120);
  let marquee2 = createMarquee("#marqueeText2", 120, true);

  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (marquee1 && marquee2) {
      if (scrollTop > lastScrollTop) {
        marquee1.timeScale(0.8);
        marquee2.timeScale(0.8);
      } else {
        marquee1.timeScale(0.3);
        marquee2.timeScale(0.3);
      }
    }

    lastScrollTop = Math.max(0, scrollTop);
  });
}

function initServiceSection() {
  const mainItems = document.querySelectorAll(".service-list li");
  const allSections = document.querySelectorAll(".service-content");

  // Preload images from data-image attributes on buttons
  const preloadImages = () => {
    document.querySelectorAll(".sub-service-btn").forEach((btn) => {
      const imgSrc = btn.getAttribute("data-image");
      if (imgSrc) {
        const img = new Image();
        img.src = imgSrc;
      }
    });
  };

  preloadImages();

  // Handle main service list item clicks
  mainItems.forEach((item) => {
    item.addEventListener("click", function () {
      mainItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      allSections.forEach((section) => section.classList.remove("active"));

      const target = this.getAttribute("data-target");
      const targetSection = document.getElementById(target);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  // Handle sub-service buttons and image animation inside each service content section
  allSections.forEach((section) => {
    const buttons = section.querySelectorAll(".sub-service-btn");
    const image = section.querySelector(".service-image img");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const newImage = this.getAttribute("data-image");

        if (!image) return;

        // Animate out current image
        gsap.to(image, {
          x: 100,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            image.src = newImage;
            gsap.set(image, { x: 100 });
            gsap.to(image, {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      });
    });
  });
}

function initMarqueeScrollAnimation() {
  function createMarqueeAnimation(elements, baseSpeed, direction) {
    elements.forEach((marquee) => {
      let animation = gsap.to(marquee, {
        xPercent: direction === "left" ? -50 : 50,
        duration: baseSpeed,
        ease: "linear",
        repeat: -1,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: marquee,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => animation.play(),
        onLeaveBack: () => animation.pause(),
        scrub: 2,
      });
    });
  }

  let leftMarquees = document.querySelectorAll(".marquee-left");
  let rightMarquees = document.querySelectorAll(".marquee-right");

  createMarqueeAnimation(leftMarquees, 20, "left");
  createMarqueeAnimation(rightMarquees, 24, "right");
}

function initInfiniteSliders() {
  let normalSlider, reverseSlider;

  function createInfiniteSwiper(selector, reverse = false) {
    return new Swiper(selector, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      allowTouchMove: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      },
    });
  }

  function addHoverEvents() {
    document.querySelectorAll(".swiper-container").forEach((container) => {
      container.addEventListener("mouseenter", () => {
        if (normalSlider?.autoplay?.stop) normalSlider.autoplay.stop();
        if (reverseSlider?.autoplay?.stop) reverseSlider.autoplay.stop();
      });
      container.addEventListener("mouseleave", () => {
        if (normalSlider?.autoplay?.start) normalSlider.autoplay.start();
        if (reverseSlider?.autoplay?.start) reverseSlider.autoplay.start();
      });
    });
  }

  function initSliders() {
    if (normalSlider instanceof Swiper) {
      normalSlider.destroy(true, true);
    }
    if (reverseSlider instanceof Swiper) {
      reverseSlider.destroy(true, true);
    }

    normalSlider = createInfiniteSwiper(".normal-slider", false);
    reverseSlider = createInfiniteSwiper(".reverse-slider", true);

    addHoverEvents();
  }

  initSliders();

  document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
    tab.addEventListener("shown.bs.tab", () => {
      initSliders();
    });
  });
}

function initLogoScaleAnimation() {
  if (document.querySelector(".logo-section") && document.querySelector(".logo-img")) {
    gsap.to(".logo-img", {
      scale: 100,
      duration: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".logo-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });
  }
}

function initReviewSliderWithAnimation() {
  let reviewSwiper = new Swiper(".review-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  gsap.fromTo(
    ".review-swiper",
    { x: "100%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 5,
      scrollTrigger: {
        trigger: ".review-swiper",
        start: "top 50%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
      },
    }
  );
}

function initFAQAccordion() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((btn, index) => {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector(".icon");

    // Initial setup: open first FAQ
    if (index === 0) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = "1";
      icon.textContent = "-";
    } else {
      answer.style.maxHeight = "0px";
      answer.style.opacity = "0";
    }

    btn.addEventListener("click", function () {
      const isOpen = answer.style.maxHeight !== "0px";

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.style.maxHeight = "0px";
        ans.style.opacity = "0";
      });

      document.querySelectorAll(".faq-question .icon").forEach((ic) => {
        ic.textContent = "+";
      });

      // Open clicked answer if it was not already open
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
        icon.textContent = "-";
      }
    });
  });
}

function initHeroAndScrollAnimations() {
  // Hero section animation on page load
  window.addEventListener("load", () => {
    gsap.from(".hero-section .lft-col", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.from(".hero-section .rgt-col", {
      x: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  // Scroll-triggered animations for each section with class .animated-section
  gsap.utils.toArray(".animated-section").forEach((section) => {
    const leftCol = section.querySelector(".lft-col");
    const rightCol = section.querySelector(".rgt-col");

    if (leftCol) {
      gsap.fromTo(
        leftCol,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%", // Changed back to original value - 50% instead of 80%
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        }
      );
    }

    if (rightCol) {
      gsap.fromTo(
        rightCol,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%", // Changed back to original value - 50% instead of 80%
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        }
      );
    }
  });
}

function initRocketScrollAnimation() {

  const rocket = document.querySelector(".rocket");
  const clientSection = document.querySelector(".client-section");

  if (rocket && clientSection) {
    gsap.fromTo(
      rocket,
      { x: 0, y: 0 },
      {
        x: () => -(window.innerWidth - 50),
        y: () => -window.innerHeight + 50,
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: clientSection,
          start: "top 10%",
          end: "top -300%",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );
  }
}

function initAnimatedHeading() {
  const animatedText = document.querySelector(".animated-heading");
  const aboutSection = document.querySelector(".about-section");

  if (animatedText && aboutSection) {
    const chars = animatedText.textContent.split("");

    animatedText.innerHTML = chars
      .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    gsap.to(".animated-heading span", {
      color: "var(--primary-color)",
      stagger: {
        each: 0.05,
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 40%",
        end: "top 0%",
        scrub: true,
      },
    });
  }
}

function initTalkButtonFollow() {
  const talkBtn = document.querySelector(".talk-btn");
  const ctaSection = document.querySelector(".cta-section");

  const original = {
    x: 0,
    y: 0,
  };

  if (talkBtn && ctaSection) {
    ctaSection.addEventListener("mousemove", (e) => {
      const rect = ctaSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(talkBtn, {
        x: x - talkBtn.offsetWidth / 2,
        y: y - talkBtn.offsetHeight / 2,
        duration: 0.5,
        ease: "power3.out",
      });
    });

    ctaSection.addEventListener("mouseleave", () => {
      gsap.to(talkBtn, {
        x: original.x,
        y: original.y,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }
}

function initHeaderScrollAnimation() {
  const container = document.querySelector(".custom-header .container");
  const logo = document.querySelector(".navbar-brand img");

  if (!container || !logo) return;

  ScrollTrigger.create({
    trigger: document.body,
    start: "top+=10 top",
    onEnter: () => animateHeader(true),
    onLeaveBack: () => animateHeader(false),
  });

  function animateHeader(scrolled) {
    gsap.to(container, {
      duration: 0.5,
      ease: "power2.out",
      maxWidth: scrolled ? "1200px" : "1440px",
      borderRadius: scrolled ? "200px" : "0px",
      backgroundColor: scrolled ? "rgb(0 0 0 / 30%)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
      boxShadow: scrolled
        ? "0 8px 24px rgba(0, 0, 0, 0.15)"
        : "0 0 0 rgba(0, 0, 0, 0)",
      border: scrolled
        ? "2px solid rgba(255, 255, 255, 0.15)"
        : "2px solid transparent",
    });

    gsap.to(logo, {
      duration: 0.5,
      ease: "power2.out",
      scale: scrolled ? 0.85 : 1,
    });
  }
}

function initStickyAboutAndService() {
  const aboutSection = document.querySelector(".about-section");
  const serviceSection = document.querySelector(".service-section");

  if (aboutSection) {
    gsap.fromTo(
      aboutSection,
      {
        position: "relative",
        top: 0,
      },
      {
        position: "sticky",
        top: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );
  }

  if (aboutSection && serviceSection) {
    gsap.fromTo(
      serviceSection,
      {
        y: "100%",
      },
      {
        y: "0%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutSection,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );
  }
}

function initDevLogoSwiper() {
  new Swiper(".dev-logo-swiper", {
    slidesPerView: 7,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    spaceBetween: 30,
    grabCursor: true,
  });
}

function setupScrollCards() {

  const cards = gsap.utils.toArray(".panel__card");
  if (cards.length === 0) return;

  // Create spacer if missing
  let spacer = document.querySelector(".panel__spacer");
  if (!spacer) {
    spacer = document.createElement("div");
    spacer.classList.add("panel__spacer");
    document.querySelector(".panel").appendChild(spacer);
  }
  spacer.style.height = "900px";

  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".panel",
      start: "top top",
      end: "+=900",
      scrub: 1,
      pin: true,
      markers: false,
      anticipatePin: 1,
    },
  });

  cards.forEach((card, i) => {
    const label = `step-${i}`;

    // Animate current card from bottom to position
    tl.fromTo(
      card,
      { yPercent: 100, scale: 1 },
      { yPercent: 0, scale: 1, duration: 1 },
      label
    );

    // Animate previous cards scaling down and shifting up
    cards.forEach((prevCard, j) => {
      if (j < i) {
        const scale = 1 - (i - j) * 0.05;
        const yShift = -(i - j) * 50;

        tl.to(
          prevCard,
          { scale, y: yShift, duration: 1, transformOrigin: "top center" },
          label
        );
      }
    });
  });
}