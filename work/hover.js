// work-page script code
// text hover effect code

import { awards } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({
        autoRaf: true,
    });

    const awardsListContainer = document.querySelector(".awards-list");
    const awardPreview = document.querySelector(".award-preview");
    const awardsList = document.querySelector(".awards-list");

    const POSITIONS = {
        BOTTOM: 0,
        MIDDLE: -80,
        TOP: -160,
    };

    let lastMousePosition = { x: 0, y: 0};
    let activeAward = null;
    let ticking = false;
    let mouseTimeout = null;
    let isMouseMoving = false;

    awards.forEach((award) => {
        const awardElement = document.createElement("div");
        awardElement.className = "award";

        awardElement.innerHTML = `
        <div class="award-wrapper">
            <div class="award-name">
                <h1>${award.name}</h1>
                <h1>${award.type}</h1>
            </div>

            <div class="award-project">
                <h1>${award.project}</h1> 
                <h1>${award.url ? `<a href="${award.url}">${award.label}</a>` : award.label}</h1>
            </div>

            <div class="award-name">
                <h1>${award.name}</h1> 
                <h1>${award.type}</h1>
            </div>

        </div>
        `;

        awardsListContainer.appendChild(awardElement);
    });

    const awardsElements = document.querySelectorAll(".award");

    const animatePreview = () => {
        const awardsListRect = awardsList.getBoundingClientRect();
        if(
            lastMousePosition.x < awardsListRect.left ||
            lastMousePosition.x > awardsListRect.right ||
            lastMousePosition.y < awardsListRect.top ||
            lastMousePosition.y> awardsListRect.bottom
        ){
            const previewImages = awardPreview.querySelectorAll("img");
            previewImages.forEach((img) => {
                gsap.to(img, {
                    scale: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => img.remove(),
                });
            });
        }
    };

    const updateAwards = () => {
        animatePreview();

        if(activeAward){
            const rect = activeAward.getBoundingClientRect();
            const isStillOver = 
                lastMousePosition.x >= rect.left &&
                lastMousePosition.x <= rect.right &&
                lastMousePosition.y >= rect.top &&
                lastMousePosition.y <= rect.bottom;

            if(!isStillOver){
                const wrapper = activeAward.querySelector(".award-wrapper");
                const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
                    duration: 0.4,
                    ease: "power.out",
                });
                activeAward = null;
            }
        }

        awardsElements.forEach((award, index) => {
            if (award === activeAward) return;

            const rect = award.getBoundingClientRect();
            const isMouseOver =
                lastMousePosition.x >= rect.left &&
                lastMousePosition.x <= rect.right &&
                lastMousePosition.y >= rect.top &&
                lastMousePosition.y <= rect.bottom;

            if(isMouseOver) {
                const wrapper = award.querySelector(".award-wrapper");
                const enterFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: "power2.out",
                });
                activeAward = award;
            }
            
        });

        ticking = false;
    };

    document.addEventListener("mousemove", (e) => {
        lastMousePosition.x = e.clientX;
        lastMousePosition.y = e.clientY;

        isMouseMoving = true;
        if (mouseTimeout) {
            clearTimeout(mouseTimeout);
        }
    
        const awardsListRect = awardsList.getBoundingClientRect();
        const isInsideAwardsList = 
            lastMousePosition.x >= awardsListRect.left &&
            lastMousePosition.x <= awardsListRect.right &&
            lastMousePosition.y >= awardsListRect.top &&
            lastMousePosition.y <= awardsListRect.bottom;

        if (isInsideAwardsList){
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
                const images = awardPreview.querySelectorAll("img");
                if(images.length > 1){
                    const lastImage = images[images.length - 1];
                    images.forEach((img) => {
                        if (img !== lastImage) {
                            gsap.to(img, {
                                scale: 0,
                                duration: 0.4,
                                ease: "power2.out",
                                onComplete: () => img.remove(),
                            });
                        }
                    });
                }
            }, 2000);
        }

        animatePreview();
    });

    
    document.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                requestAnimationFrame(() =>{
                    updateAwards();
                });
                ticking = true;
            }
        },
        { passive: true }

    );

    awardsElements.forEach((award, index) => {
        const wrapper = award.querySelector(".award-wrapper");
        let currentPosition = POSITIONS.TOP;

        award.addEventListener("mouseenter", (e) => {
            activeAward = award;
            const rect = award.getBoundingClientRect();
            const enterFromTop = e.clientY < rect.top + rect.height / 2;

            if(enterFromTop || currentPosition === POSITIONS.BOTTOM) {
                currentPosition = POSITIONS.MIDDLE;
                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: "power2.out",
                });
            }

            const img = document.createElement("img");
            img.src = ``;
            img.style.position = "absolute";
            img.style.top = 0;
            img.style.left = 0;
            img.style.scale = 0;
            img.style.zindex = Date.now();

            awardPreview.appendChild(img);

            gsap.to(img, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
            });
        });

        award.addEventListener("mouseleave", (e) => {
            activeAward = null;
            const rect = award.getBoundingClientRect();
            const leavingFromTop = e.clientY < rect.top + rect.height / 2;

            currentPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
            gsap.to(wrapper, {
                y:currentPosition,
                duration: 0.4,
                ease: "Power2.out",
            });
        });
    });
});

// JavaScript
document.getElementById('close-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Trigger animation
    this.classList.add('clicked');
    
    // Navigate back after animation completes
    setTimeout(() => {
        window.history.back();
    }, 300); // Match transition duration (0.3s)
});