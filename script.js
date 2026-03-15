// Wait for DOM and GSAP to load
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    initNavbar();
    initHeroAnimations();
    initMagneticButtons();
    initFeatureCards();
    initPhilosophySplitText();
    initStickyProtocol();
    initTestModal();
});

// --- 0. TEST ELINA MODAL ---
function initTestModal() {
    const modal = document.getElementById("test-modal");
    const card = document.getElementById("test-modal-card");
    const openBtn = document.getElementById("test-elina-btn");
    const closeBtn = document.getElementById("test-modal-close");
    const backdrop = document.getElementById("test-modal-backdrop");

    function openModal() {
        modal.classList.remove("pointer-events-none");
        gsap.to(modal, { opacity: 1, duration: 0.25, ease: "power2.out" });
        gsap.to(card, { scale: 1, duration: 0.35, ease: "back.out(1.4)" });
    }

    function closeModal() {
        gsap.to(card, { scale: 0.95, duration: 0.2, ease: "power2.in" });
        gsap.to(modal, {
            opacity: 0, duration: 0.25, ease: "power2.in", delay: 0.05,
            onComplete: () => modal.classList.add("pointer-events-none")
        });
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

// --- 1. NAVBAR MORPHING ---
function initNavbar() {
    const navbar = document.getElementById("navbar");

    ScrollTrigger.create({
        start: "top -100px",
        end: 99999,
        toggleClass: { className: "nav-scrolled", targets: navbar },
        onEnter: () => gsap.to(navbar, { padding: "0.75rem 1.5rem", duration: 0.3 }),
        onLeaveBack: () => gsap.to(navbar, { padding: "1rem 1.5rem", duration: 0.3 })
    });
}

// --- 2. HERO ANIMATIONS ---
function initHeroAnimations() {
    // Staggered fade up for hero text elements
    gsap.to(".hero-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });
}

// --- 3. MAGNETIC BUTTONS ---
function initMagneticButtons() {
    const buttons = document.querySelectorAll(".btn-magnetic");

    buttons.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                scale: 1.03,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// --- 4. FEATURE CARDS MICRO-INTERACTIONS ---
function initFeatureCards() {
    // Card 1: Diagnostic Shuffler
    const shufflerData = [
        "Patient Intake Triage",
        "Rescheduling Protocol",
        "Insurance Verification"
    ];
    const container = document.getElementById("shuffler-container");

    // Create initial DOM elements
    let elements = shufflerData.map((text, i) => {
        const el = document.createElement("div");
        el.className = `shuffler-item shuffler-item-${i}`;
        el.innerText = `> ${text}`;
        container.appendChild(el);
        return el;
    });

    setInterval(() => {
        // Shift DOM elements internally to visually cycle them
        const lastEl = elements.pop();
        elements.unshift(lastEl);

        // Reapply classes based on new array order
        elements.forEach((el, i) => {
            el.className = `shuffler-item shuffler-item-${i}`;
        });
    }, 3000);

    // Card 2: Telemetry Typewriter
    const typewriterText = document.getElementById("typewriter-text");
    const phrases = [
        "Analyzing caller sentiment...",
        "Identifying scheduling intent...",
        "Cross-referencing provider availability...",
        "Booking confirmed."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterText.innerText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterText.innerText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    // Start typing
    setTimeout(type, 1000);

    // Card 3: Cursor Protocol Scheduler
    const cursor = document.getElementById("magic-cursor");
    const targetCell = document.getElementById("target-cell");

    function animateCursor() {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        // Start position
        tl.set(cursor, { top: "150%", left: "50%", scale: 1 });

        // Move to target cell (using relative approx pixel values for the demo)
        tl.to(cursor, {
            top: "50%",
            left: "40%",
            duration: 1.2,
            ease: "power2.inOut"
        });

        // Simulate Click
        tl.to(cursor, { scale: 0.8, duration: 0.1 });

        // Highlight Cell
        tl.call(() => {
            targetCell.style.backgroundColor = "rgba(201, 168, 76, 0.4)"; // champagne
            targetCell.style.borderColor = "rgba(201, 168, 76, 0.8)";
        });

        // Release Click
        tl.to(cursor, { scale: 1, duration: 0.1 });

        // Move to Save (imaginary position)
        tl.to(cursor, {
            top: "80%",
            left: "80%",
            duration: 1,
            ease: "power2.inOut",
            delay: 0.3
        });

        // Reset Cell for next loop
        tl.call(() => {
            targetCell.style.backgroundColor = "";
            targetCell.style.borderColor = "";
        }, null, "+=0.5");

        // Fade out/Move out
        tl.to(cursor, { opacity: 0, duration: 0.3 });
        tl.set(cursor, { top: "150%", left: "50%", opacity: 1 });
    }

    // Only start if element exists
    if (cursor) animateCursor();
}

// --- 5. PHILOSOPHY REVEAL ---
function initPhilosophySplitText() {
    gsap.utils.toArray(".philosophy-text").forEach(text => {
        gsap.fromTo(text,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    // markers: false
                }
            }
        );
    });
}

// --- 6. STICKY STACKING PROTOCOL ---
function initStickyProtocol() {
    const cards = gsap.utils.toArray(".protocol-card");

    cards.forEach((card, i) => {
        // Last card doesn't need to scale down when scrolled past
        if (i !== cards.length - 1) {
            gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                filter: "blur(10px)",
                scrollTrigger: {
                    trigger: cards[i + 1],
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            });
        }
    });

    // Animate grid dots in Card 2
    const gridContainer = document.querySelector(".grid-cols-10");
    if (gridContainer) {
        for (let i = 0; i < 80; i++) {
            const dot = document.createElement("div");
            dot.className = "w-1 h-1 bg-champagne rounded-full opacity-20 mx-auto";
            gridContainer.appendChild(dot);
        }

        // Optional: Randomly blink dots
        gsap.to(gridContainer.children, {
            opacity: 0.8,
            duration: 0.5,
            stagger: {
                each: 0.05,
                from: "random",
                repeat: -1,
                yoyo: true
            }
        });
    }
}
