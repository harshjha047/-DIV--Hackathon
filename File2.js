// Initialize Locomotive Scroll and ScrollTrigger
function initializeScroll() {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Define loading animation
function animateLoading() {
    const tl = gsap.timeline();
    tl.from("#page1", { opacity: 0, duration: 0.2, delay: 0.2 })
      .from("#page1", { transform: "scaleX(0.7) scaleY(0.2) translateY(80%)", borderRadius: "150px", duration: 2, ease: "expo.out" })
      .from("nav", { opacity: 0, delay: -0.2 })
      .from("#page1 h1, #page1 p, #page1 div", { opacity: 0, duration: 0.5, stagger: 0.2 });
}

// Handle navigation animation
function animateNavigation() {
    const nav = document.querySelector("nav");
    const navPart2 = document.querySelector(".nav-part2 h5");

    nav.addEventListener("mouseenter", () => {
        gsap.timeline()
            .to("#nav-bottom", { height: "17vh", duration: 0.5 })
            .to(navPart2, { display: "block", duration: 0.1 })
            .to(navPart2.querySelectorAll("span"), { y: 0, stagger: 0.5 });
    });

    nav.addEventListener("mouseleave", () => {
        gsap.timeline()
            .to(navPart2.querySelectorAll("span"), { y: 25, stagger: 0.2 })
            .to(navPart2, { display: "none", duration: 0.1 })
            .to("#nav-bottom", { height: 0, duration: 0.2 });
    });
}

// Handle animations for elements on page 2
function animatePage2() {
    const rightElems = document.querySelectorAll(".right-elem");

    rightElems.forEach(elem => {
        elem.addEventListener("mouseenter", () => animateElem(elem.childNodes[3], true));
        elem.addEventListener("mouseleave", () => animateElem(elem.childNodes[3], false));
        elem.addEventListener("mousemove", event => animateElem(elem.childNodes[3], true, event));
    });
}

// Helper function for element animation
function animateElem(elem, show, event) {
    const opacity = show ? 1 : 0;
    const scale = show ? 1 : 0;

    gsap.to(elem, {
        opacity: opacity,
        scale: scale,
        x: event ? event.x - elem.parentElement.getBoundingClientRect().x - 45 : 0,
        y: event ? event.y - elem.parentElement.getBoundingClientRect().y - 100 : 0
    });
}

// Handle animations for elements on page 3
function animatePage3() {
    const page3Center = document.querySelector(".page3-center");
    const video = document.querySelector("#page3 video");
    const sections = document.querySelectorAll(".sec-right");

    page3Center.addEventListener("click", () => toggleVideo(video, true));
    video.addEventListener("click", () => toggleVideo(video, false));

    sections.forEach(elem => {
        elem.addEventListener("mouseenter", () => toggleVideo(elem.childNodes[3], true));
        elem.addEventListener("mouseleave", () => toggleVideo(elem.childNodes[3], false));
    });
}

// Helper function to toggle video playback and appearance
function toggleVideo(elem, play) {
    if (play) {
        elem.play();
        gsap.to(elem, { transform: "scaleX(1) scaleY(1)", opacity: 1, borderRadius: 0 });
    } else {
        elem.pause();
        gsap.to(elem, { transform: "scaleX(0.7) scaleY(0)", opacity: 0, borderRadius: "30px" });
    }
}

// Call animation functions
function runAnimations() {
    initializeScroll();
    animateLoading();
    animateNavigation();
    animatePage2();
    animatePage3();
}

// Run animations when the DOM is loaded
document.addEventListener("DOMContentLoaded", runAnimations);
