window.addEventListener('load', () => {
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
});

document.addEventListener("DOMContentLoaded", function () {
  function createMarquee(selector, speed, reverse = false) {
    let wrapper = document.querySelector(selector);
    let textContent = wrapper.innerHTML;

    wrapper.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`;

    gsap.set(wrapper, { xPercent: reverse ? -100 : 0 });

    let marquee = gsap.to(wrapper, {
      xPercent: reverse ? 0 : -100,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    return marquee;
  }

  let marquee1 = createMarquee("#marqueeText1", 120);
  let marquee2 = createMarquee("#marqueeText2", 120, true);

  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      marquee1.timeScale(0.8);
      marquee2.timeScale(0.8);
    } else {
      marquee1.timeScale(0.3);
      marquee2.timeScale(0.3);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mainItems = document.querySelectorAll(".service-list li");
  const allSections = document.querySelectorAll(".service-content");

  mainItems.forEach((item) => {
    item.addEventListener("click", function () {
      mainItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      allSections.forEach((section) => section.classList.remove("active"));

      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });

  document.querySelectorAll(".service-content").forEach((section) => {
    const buttons = section.querySelectorAll(".sub-service-btn");
    const image = section.querySelector(".service-image img");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const newImage = this.getAttribute("data-image");

        // Animate out the current image
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
});

gsap.registerPlugin(ScrollTrigger);

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

document.addEventListener("DOMContentLoaded", function () {
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

  initSliders();

  document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
    tab.addEventListener("shown.bs.tab", () => {
      initSliders(); 
    });
  });
});

gsap.registerPlugin(ScrollTrigger);

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

gsap.registerPlugin(ScrollTrigger);

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

document.addEventListener("DOMContentLoaded", function () {
  const faqButtons = document.querySelectorAll(".faq-question");

  // Make the first FAQ answer open by default
  const firstAnswer = faqButtons[0].nextElementSibling;
  const firstIcon = faqButtons[0].querySelector(".icon");
  firstAnswer.style.display = "block";
  firstIcon.textContent = "-";

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector(".icon");
      const isActive = answer.style.display === "block";

      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.style.display = "none";
      });

      document.querySelectorAll(".icon").forEach((ic) => {
        ic.textContent = "+";
      });

      answer.style.display = isActive ? "none" : "block";
      icon.textContent = isActive ? "+" : "-";
    });
  });
});


// window.addEventListener("load", () => {
//   const tl = gsap.timeline();

//   const content = document.querySelectorAll(".content h5, .content h1, .content h4");
  
//   tl.from(content, {
//     opacity: 0,
//     y: 20,
//     stagger: 0.5,  
//     duration: 0.5,    
//     ease: "power2.out"
//   })
//   .from(".astronut", {
//     x: 100,
//     opacity: 0,
//     duration: 1, 
//     ease: "power2.out"
//   }, "1.5");
// });


gsap.registerPlugin(ScrollTrigger);

// 🟢 Banner Animation on Page Load
window.addEventListener("load", () => {
  gsap.from(".hero-section .lft-col", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".hero-section .rgt-col", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: 0.2
  });
});

// 🔵 Scroll Animation for all sections
gsap.utils.toArray(".animated-section").forEach(section => {
  const leftCol = section.querySelector(".lft-col");
  const rightCol = section.querySelector(".rgt-col");

  if (leftCol) {
    gsap.fromTo(leftCol,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%", // Animate when section enters from bottom
          toggleActions: "play reverse play reverse",
          markers: false
        }
      }
    );
  }

  if (rightCol) {
    gsap.fromTo(rightCol,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          toggleActions: "play reverse play reverse",
          markers: false
        }
      }
    );
  }
});



window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo('.rocket', {
    x: 0,  
    y: 0, 
  }, {
    x: () => -(window.innerWidth - 50), 
    y: () => -(window.innerHeight) + 50, 
    duration: 3, 
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.client-section', 
      start: 'top 10%', 
      end: 'top -50%',  
      scrub: true,     
      toggleActions: 'play none none none', 
    },
  });
});


gsap.registerPlugin(ScrollTrigger);

const animatedText = document.querySelector(".animated-heading");

const chars = animatedText.textContent.split("");

animatedText.innerHTML = chars
  .map(char => `<span>${char === " " ? "&nbsp;" : char}</span>`)
  .join("");

gsap.to(".animated-heading span", {
  color: "var(--primary-color)",
  stagger: {
    each: 0.05
  },
  ease: "none",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 40%",
    end: "top 0%", 
    scrub: true,
  }
});


gsap.registerPlugin(ScrollTrigger);

gsap.to(".service-section", {
  y: -450, 
  ease: "none",
  scrollTrigger: {
    trigger: ".service-section",
    start: "top bottom",   
    end: "bottom top",   
    scrub: true,         
  }
});


const talkBtn = document.querySelector('.talk-btn');
const ctaSection = document.querySelector('.cta-section');

const original = {
  x: 0,
  y: 0,
};

ctaSection.addEventListener('mousemove', (e) => {
  const rect = ctaSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(talkBtn, {
    x: x - talkBtn.offsetWidth / 2,
    y: y - talkBtn.offsetHeight / 2,
    duration: 0.5,
    ease: "power3.out"
  });
});

ctaSection.addEventListener('mouseleave', () => {
  gsap.to(talkBtn, {
    x: original.x,
    y: original.y,
    duration: 0.6,
    ease: "power3.out"
  });
});


gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".custom-header .container");
const logo = document.querySelector(".navbar-brand img");

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
      : "2px solid transparent"
  });

  gsap.to(logo, {
    duration: 0.5,
    ease: "power2.out",
    scale: scrolled ? 0.85 : 1,
  });
}