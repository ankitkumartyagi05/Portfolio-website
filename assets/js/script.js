/**
 * Production Core JS Engine
 * Handles 3D Graphics, Layout Automation, Performance Calculations & UI Telemetry
 */

document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initNavbar();
    initTypewriter();
    initThreeEngine();
    initScrollAnimations();
    initCardMechanics();
});

/* Preloader Metrics Execution */
function initPreloader() {
    const loader = document.getElementById("loader");
    const progressFill = document.querySelector(".progress-fill");
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => loader.style.display = "none"
            });
        }
        progressFill.style.width = `${progress}%`;
    }, 45);
}

/* Sticky Navbar Tracking Matrix */
function initNavbar() {
    const navbar = document.querySelector(".navbar");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinksList = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link, .stat-link, .hero-buttons .btn");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Section Active Tracking Loop
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navLinksList.classList.toggle("active");
    });

    // Universal Smooth Scrolling Matrix Setup
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    mobileMenu.classList.remove("active");
                    navLinksList.classList.remove("active");
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* Typing Simulation Matrix */
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        let typeSpeed = 80;

        if (this.isDeleting) { typeSpeed /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

function initTypewriter() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}

/* Unified Three.js Engine */
function initThreeEngine() {
    const canvas = document.getElementById("webgl-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 30;

    // Interactive Device Vectors Tracking
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.015;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    });

    // Object A: Optimized Global Particle Universe
    const particleCount = window.innerWidth < 768 ? 400 : 900;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randomColors = new Float32Array(particleCount * 3);

    const primaryColor = new THREE.Color("#00F5FF");
    const secondaryColor = new THREE.Color("#7C3AED");

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 70;
        positions[i + 1] = (Math.random() - 0.5) * 70;
        positions[i + 2] = (Math.random() - 0.5) * 70;

        const mixedColor = primaryColor.clone().lerp(secondaryColor, Math.random());
        randomColors[i] = mixedColor.r;
        randomColors[i + 1] = mixedColor.g;
        randomColors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(randomColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.28,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });

    const starUniverse = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starUniverse);

    // Object B: Skill Core Constellation (Neural Network Geometry Simulation)
    const neuralGroup = new THREE.Group();
    const nodeCount = 35;
    const nodeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00FFB3 });
    
    const nodePositions = [];
    for(let i=0; i<nodeCount; i++) {
        const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const radius = 8 + Math.random() * 2; 
        
        mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
        mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
        mesh.position.z = radius * Math.cos(phi);
        
        neuralGroup.add(mesh);
        nodePositions.push(mesh.position);
    }

    // Connect Node Vector Matrix with Wireframes
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.25 });
    const linePositions = [];
    
    for(let i=0; i<nodePositions.length; i++) {
        for(let j=i+1; j<nodePositions.length; j++) {
            if(nodePositions[i].distanceTo(nodePositions[j]) < 5.5) {
                linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
                linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
            }
        }
    }
    
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralGroup.add(networkLines);
    
    // Position Constellation Object to the Side in Desktop Configurations
    if (window.innerWidth > 968) {
        neuralGroup.position.x = 10;
    }
    scene.add(neuralGroup);

    // Ambient Lighting Configurations
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Dynamic Render Engine Loop
    const clock = new THREE.Clock();

    function renderLoop() {
        const elapsedTime = clock.getElapsedTime();

        // Standard Rotations
        starUniverse.rotation.y = elapsedTime * 0.02;
        starUniverse.rotation.x = elapsedTime * 0.005;

        neuralGroup.rotation.y = elapsedTime * 0.06;
        neuralGroup.rotation.z = elapsedTime * 0.01;

        // Smooth Mouse-Reactive Interpolation Architecture
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        starUniverse.position.x = targetX * 0.5;
        starUniverse.position.y = -targetY * 0.5;

        neuralGroup.position.y = -targetY * 0.3;

        // Scroll Adaptive Z-Depth Matrix
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if(!isNaN(scrollPercent)) {
            camera.position.z = 30 - (scrollPercent * 12);
            starUniverse.position.z = scrollPercent * 15;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // Resize Engine Handler
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (window.innerWidth < 968) {
            neuralGroup.position.x = 0;
        } else {
            neuralGroup.position.x = 10;
        }
    });
}

/* Scroll Trigger Automation Engine */
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Transitions
    gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.8, delay: 1.2 });
    gsap.from(".hero-title", { opacity: 0, y: 40, duration: 1, delay: 1.4 });
    gsap.from(".typewriter-container", { opacity: 0, duration: 0.8, delay: 1.6 });
    gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, delay: 1.8 });
    gsap.from(".hero-buttons", { opacity: 0, y: 20, duration: 0.8, delay: 2 });

    // Section Scroll Reveal Framework Configuration
    const revealElements = document.querySelectorAll(".animate-on-scroll");
    revealElements.forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none"
            }
        });
    });

    // Statistic Counter Engine Setup
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"), 10);
        gsap.to(stat, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: stat,
                start: "top 90%"
            }
        });
    });
}

/* 3D Gyroscopic Card Transformations */
function initCardMechanics() {
    const dynamicCards = document.querySelectorAll(".project-card, .cert-card, .about-main, .stat-link .glass-card");

    dynamicCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / (rect.height / 12);
            const rotateY = (x - centerX) / (rect.width / 12);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}