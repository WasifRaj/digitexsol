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

    let marquee1 = createMarquee("#marqueeText1", 80);  
    let marquee2 = createMarquee("#marqueeText2", 80, true); 
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            marquee1.timeScale(1.2);
            marquee2.timeScale(1.2);
        } else {
            marquee1.timeScale(0.4);
            marquee2.timeScale(0.4);
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
