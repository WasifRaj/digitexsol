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
            repeat: -1
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
    const subButtons = document.querySelectorAll(".sub-service-btn");

    // Main Categories Click Event
    mainItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove active class
            mainItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");

            // Hide all sections
            allSections.forEach(section => section.classList.remove("active"));

            // Show the selected section
            const target = this.getAttribute("data-target");
            document.getElementById(target).classList.add("active");
        });
    });

    // Sub-category Buttons (Image Change)
    document.querySelectorAll(".service-content").forEach(section => {
        const buttons = section.querySelectorAll(".sub-service-btn");
        const image = section.querySelector(".service-image img");

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                // Remove active class
                buttons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                // Change Image
                const newImage = this.getAttribute("data-image");
                image.src = newImage;
            });
        });
    });
});

gsap.registerPlugin(ScrollTrigger);

function createMarqueeAnimation(id, baseSpeed, direction) {
    let marquee = document.getElementById(id);

    let animation = gsap.to(marquee, {
        xPercent: direction === "left" ? -50 : 50, 
        duration: baseSpeed,
        ease: "linear",
        repeat: -1,
        paused: true
    });

    ScrollTrigger.create({
        trigger: marquee,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => animation.play(),
        onLeaveBack: () => animation.pause(),
        scrub: 2 
    });
}

createMarqueeAnimation("marquee1", 20, "left");
createMarqueeAnimation("marquee2", 24, "right");
createMarqueeAnimation("marquee3", 28, "left");
createMarqueeAnimation("marquee4", 32, "right");
createMarqueeAnimation("marquee5", 36, "left");


// <-- Swiper JS -->
document.addEventListener("DOMContentLoaded", function () {
    let normalSlider, reverseSlider;

    function createInfiniteSwiper(selector, reverse = false) {
        return new Swiper(selector, {
            slidesPerView: 2, // ✅ Agar slides kam hain to isko 1 kar do
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
        // ✅ Pehle check karlo agar Swiper initialize ho chuka hai
        if (normalSlider instanceof Swiper) {
            normalSlider.destroy(true, true);
        }
        if (reverseSlider instanceof Swiper) {
            reverseSlider.destroy(true, true);
        }

        // ✅ Swipers Initialize
        normalSlider = createInfiniteSwiper(".normal-slider", false);
        reverseSlider = createInfiniteSwiper(".reverse-slider", true);

        // ✅ Hover Events
        addHoverEvents();
    }

    function addHoverEvents() {
        document.querySelectorAll(".swiper-container").forEach(container => {
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

    // ✅ Initial Load (Jab Page First Time Load Ho)
    initSliders();

    // ✅ Tab Change pe Slider Restart Karein
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener("shown.bs.tab", () => {
            initSliders(); // ✅ Jab tab change ho, slider dobara initialize hoga
        });
    });
});



gsap.registerPlugin(ScrollTrigger);

gsap.to(".logo-img", {
    scale: 100, // Halka halka bada hoga
    duration: 5,
    ease: "none", // Smooth effect ke liye
    scrollTrigger: {
        trigger: ".logo-section",
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrolling effect
        pin: true, // Section ko fix karne ke liye
    }
});



gsap.registerPlugin(ScrollTrigger);

// Swiper Initialization
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
        }
    }
);

