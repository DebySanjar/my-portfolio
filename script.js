// ===== Preload Images =====
const imagesToPreload = ['portfolio.png', 'project1.jpg', 'project2.jpg', 'project3.jpg', 'project4.jpg', 'qr-code.png'];
let imagesLoaded = 0;

function preloadImages() {
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = () => {
            imagesLoaded++;
        };
        img.onerror = () => {
            imagesLoaded++;
        };
        img.src = src;
    });
}

preloadImages();

// ===== Splash Screen Animation =====
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const scannerStatus = document.getElementById('scannerStatus');
    
    // Eye scanner status updates
    setTimeout(() => {
        if (scannerStatus) scannerStatus.textContent = 'SCANNING...';
    }, 300);
    
    setTimeout(() => {
        if (scannerStatus) scannerStatus.textContent = 'ANALYZING...';
    }, 800);
    
    setTimeout(() => {
        if (scannerStatus) scannerStatus.textContent = 'ACCESS GRANTED';
        if (scannerStatus) scannerStatus.style.color = 'var(--bright-green)';
    }, 1500);
    
    // Total animation duration: 6.5 seconds
    // 0-2s - eye scanner
    // 0.5s - elevator starts coming down
    // 2s - elevator opens
    // 2s - content shows and loading bar fills
    // 1s - elevator closes
    // 1s - elevator goes down
    
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        mainContent.classList.add('show');
        
        // Remove splash screen from DOM after animation
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }, 6500);
});

// ===== Matrix Rain Effect =====
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas ? matrixCanvas.getContext('2d') : null;
let matrixAnimationStarted = false;

// Set canvas size
function resizeMatrixCanvas() {
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
}

if (matrixCanvas) {
    resizeMatrixCanvas();
    window.addEventListener('resize', resizeMatrixCanvas);

    // Matrix characters
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 10;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    // Draw matrix
    function drawMatrix() {
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        matrixCtx.fillStyle = '#00FF00';
        matrixCtx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Start matrix animation after splash screen
    setTimeout(() => {
        if (!matrixAnimationStarted) {
            matrixAnimationStarted = true;
            setInterval(drawMatrix, 50);
        }
    }, 6500);
}

// ===== Wave Animation in Footer =====
const waveCanvas = document.getElementById('wave-canvas');
const waveCtx = waveCanvas ? waveCanvas.getContext('2d') : null;

function resizeWaveCanvas() {
    if (waveCanvas) {
        waveCanvas.width = window.innerWidth;
        waveCanvas.height = 200;
    }
}

if (waveCanvas) {
    resizeWaveCanvas();
    window.addEventListener('resize', resizeWaveCanvas);

    let waveOffset = 0;

    function drawWave() {
        waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        
        // Draw multiple waves
        drawSingleWave(waveOffset, 50, 0.02, 30, 'rgba(144, 238, 144, 0.3)');
        drawSingleWave(waveOffset + 50, 70, 0.025, 25, 'rgba(135, 206, 235, 0.3)');
        drawSingleWave(waveOffset + 100, 90, 0.03, 20, 'rgba(0, 255, 0, 0.2)');
        
        waveOffset += 2;
        requestAnimationFrame(drawWave);
    }

    function drawSingleWave(offset, amplitude, frequency, yOffset, color) {
        waveCtx.beginPath();
        waveCtx.moveTo(0, waveCanvas.height);
        
        for (let x = 0; x < waveCanvas.width; x++) {
            const y = Math.sin((x + offset) * frequency) * amplitude + yOffset;
            waveCtx.lineTo(x, y);
        }
        
        waveCtx.lineTo(waveCanvas.width, waveCanvas.height);
        waveCtx.closePath();
        waveCtx.fillStyle = color;
        waveCtx.fill();
    }

    drawWave();
}

// ===== Hamburger Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    statsObserver.observe(heroSection);
}

// ===== Skill Progress Bar Animation =====
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.skill-card, .project-island, .about-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Hero Image =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Cursor Trail Effect =====
const cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    drawCursorTrail();
});

function drawCursorTrail() {
    const existingTrails = document.querySelectorAll('.cursor-trail');
    existingTrails.forEach(trail => trail.remove());
    
    cursorTrail.forEach((pos, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${10 - index}px;
            height: ${10 - index}px;
            border-radius: 50%;
            background: rgba(144, 238, 144, ${1 - index / trailLength});
            pointer-events: none;
            z-index: 9999;
            left: ${pos.x}px;
            top: ${pos.y}px;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 100);
    });
}

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

// ===== Project Island Interaction =====
const projectIslands = document.querySelectorAll('.project-island');

projectIslands.forEach(island => {
    // Add subtle tilt effect to islands
    island.addEventListener('mousemove', (e) => {
        const rect = island.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        const islandSurface = island.querySelector('.island-surface');
        if (islandSurface) {
            islandSurface.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    island.addEventListener('mouseleave', () => {
        const islandSurface = island.querySelector('.island-surface');
        if (islandSurface) {
            islandSurface.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

// ===== Skill Card Tilt Effect =====
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== Cursor Click Effect - DISABLED =====
// Cursor click animation removed as requested

// ===== Image Error Handling =====
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        // Create placeholder gradient
        this.style.background = 'linear-gradient(135deg, #90EE90, #87CEEB)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.alt = 'Image';
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Dynamic Background Color on Scroll =====
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollTop / maxScroll;
    
    // Subtle background color shift
    const hue = 120 + (scrollPercentage * 60); // From green to cyan
    document.body.style.backgroundColor = `hsl(${hue}, 100%, 3%)`;
    
    lastScrollTop = scrollTop;
});

// ===== Contact Button Ripple Effect =====
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Console Welcome Message =====
console.log('%c Welcome to My Portfolio! ', 'background: #90EE90; color: #000; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Mobile Developer | Android & Flutter Specialist ', 'background: #87CEEB; color: #000; font-size: 14px; padding: 5px;');

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Scroll-dependent operations
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== Interactive Terminal =====
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');

// Terminal commands database
const terminalCommands = {
    'yordam': {
        response: `
<div class="command-list">
    <span class="command-name">ism</span>
    <span class="command-desc">- Ismni ko'rsatadi</span>
    <span class="command-name">familya</span>
    <span class="command-desc">- Familyani ko'rsatadi</span>
    <span class="command-name">tugilgan_sana</span>
    <span class="command-desc">- Tug'ilgan sanani ko'rsatadi</span>
    <span class="command-name">konikmalar</span>
    <span class="command-desc">- Texnologik ko'nikmalarni ko'rsatadi</span>
    <span class="command-name">yashash_manzil</span>
    <span class="command-desc">- Yashash manzilini ko'rsatadi</span>
    <span class="command-name">tajriba</span>
    <span class="command-desc">- Ish tajribasini ko'rsatadi</span>
    <span class="command-name">ijtimoiy_tarmoq</span>
    <span class="command-desc">- Ijtimoiy tarmoq havolalarini ko'rsatadi</span>
    <span class="command-name">tozalash</span>
    <span class="command-desc">- Terminalni tozalaydi</span>
</div>
        `
    },
    'ism': {
        response: '<strong>Ism:</strong> Sanjarbek'
    },
    'familya': {
        response: '<strong>Familya:</strong> Abduganiyev'
    },
    'tugilgan_sana': {
        response: '<strong>Tug\'ilgan sana:</strong> 2005.01.22'
    },
    'konikmalar': {
        response: `
<strong>Texnologik Ko'nikmalar:</strong><br>
• Android Development (Kotlin, Java)<br>
• Flutter Development (Dart)<br>
• UI/UX Design (Figma, Adobe XD)<br>
• Backend Integration (REST API, Firebase)<br>
• Database (SQLite, Room, Hive)<br>
• Version Control (Git, GitHub)<br>
• State Management (Provider, Bloc, Riverpod)
        `
    },
    'yashash_manzil': {
        response: '<strong>Yashash manzil:</strong> O\'zbekiston, Toshkent'
    },
    'tajriba': {
        response: `
<strong>Ish Tajribasi:</strong><br>
• Android Development - 2 yil<br>
• Flutter Development - 1 yil<br>
• UI/UX Design - 1 yil
        `
    },
    'ijtimoiy_tarmoq': {
        response: `
<strong>Ijtimoiy Tarmoqlar:</strong><br>
• Telegram: <a href="https://t.me/Sanjarbek_Abduganiyev" target="_blank" class="social-link">@Sanjarbek_Abduganiyev</a><br>
• Instagram: <a href="https://instagram.com/yourusername" target="_blank" class="social-link">@yourusername</a><br>
• GitHub: <a href="https://github.com/yourusername" target="_blank" class="social-link">github.com/yourusername</a><br>
• LinkedIn: <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">linkedin.com/in/yourusername</a>
        `
    },
    'tozalash': {
        action: 'clear'
    },
    'clear': {
        action: 'clear'
    }
};

// Handle terminal input
if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            
            if (command) {
                // Display command
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `
                    <div class="terminal-command">
                        <span class="terminal-prompt-text">visitor@portfolio:~$</span>
                        <span>${this.value}</span>
                    </div>
                `;
                terminalOutput.appendChild(commandLine);
                
                // Process command
                if (terminalCommands[command]) {
                    if (terminalCommands[command].action === 'clear') {
                        terminalOutput.innerHTML = '';
                    } else {
                        const responseLine = document.createElement('div');
                        responseLine.className = 'terminal-line';
                        responseLine.innerHTML = `
                            <div class="terminal-response">
                                ${terminalCommands[command].response}
                            </div>
                        `;
                        terminalOutput.appendChild(responseLine);
                    }
                } else {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'terminal-line';
                    errorLine.innerHTML = `
                        <div class="terminal-error">
                            Buyruq topilmadi: "${this.value}"<br>
                            "yordam" buyrug'ini kiriting
                        </div>
                    `;
                    terminalOutput.appendChild(errorLine);
                }
                
                // Clear input
                this.value = '';
                
                // Scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }
    });
    
    // Auto focus on terminal click
    terminalBody.addEventListener('click', function() {
        terminalInput.focus();
    });
    
    // Typing effect for welcome message
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
        const originalText = welcomeText.innerHTML;
        welcomeText.innerHTML = '';
        let i = 0;
        
        function typeWelcome() {
            if (i < originalText.length) {
                welcomeText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWelcome, 30);
            }
        }
        
        setTimeout(typeWelcome, 500);
    }
}

// Terminal blinking cursor effect
setInterval(() => {
    if (terminalInput && document.activeElement === terminalInput) {
        terminalInput.style.caretColor = terminalInput.style.caretColor === 'transparent' ? '#00FF00' : 'transparent';
    }
}, 500);

// ===== Robot Assistant Logic =====
const robotAssistant = document.getElementById('robotAssistant');
const robotChat = document.getElementById('robotChat');
const robotCloseBtn = document.getElementById('robotCloseBtn');
const robotChatText = document.getElementById('robotChatText');
const robotChatButtons = document.getElementById('robotChatButtons');
const robotHome = document.getElementById('robotHome');

// Robot messages
const robotMessages = [
    "Salom! Men sizning yordamchingizman 🤖",
    "Portfolioni ko'rib chiqyapsizmi? Yordam kerakmi?",
    "Skills bo'limini ko'rib chiqing! 💻",
    "Loyihalarimni ko'rishni xohlaysizmi?",
    "CV yuklab olishingiz mumkin! 📄",
    "Savollaringiz bormi? Men yordamga tayyorman!",
    "Abduganiyev yaxshi dasturchi! 👨‍💻",
    "Nomerini beraymi? 📱",
    "Abduganiyevga yo'naltiraymi? 📧",
    "Abduganiyev bilan bog'lanishni xohlaysizmi? 💬",
    "Professional dasturchi kerakmi? Abduganiyev yordam beradi! 🚀",
    "Abduganiyevning loyihalarini ko'ring! 🎯",
    "Kontakt ma'lumotlari kerakmi? 📞"
];

let currentMessageIndex = 0;
let robotPosition = { x: 100, y: 100 };
let targetPosition = { x: 100, y: 100 };
let homePosition = { x: 0, y: 0 };
let cursorPosition = { x: 0, y: 0 };
let isRobotMoving = false;
let chatVisible = false;
let isRobotAtHome = false;
let isSleeping = false;
let greetingShown = false;
let followCursor = true;

// Initialize robot position
function initRobot() {
    // Get home position
    if (robotHome) {
        const homeRect = robotHome.getBoundingClientRect();
        homePosition.x = homeRect.left + homeRect.width / 2 - 40;
        homePosition.y = homeRect.top - 50;
    }
    
    // Start robot at home
    robotPosition.x = homePosition.x;
    robotPosition.y = homePosition.y;
    isRobotAtHome = true;
    updateRobotPosition();
    
    // Show greeting message first
    setTimeout(() => {
        if (!greetingShown) {
            greetingShown = true;
            showRobotMessage("Salom! Men Abduganiyevning portfolio yordamchisiman. Sizga nima yordam bera olaman? 🤖", [
                { text: 'Skills', action: 'skills' },
                { text: 'Projects', action: 'projects' },
                { text: 'About Me', action: 'about' },
                { text: 'Download CV', action: 'cv' }
            ]);
            
            // After greeting, start moving
            setTimeout(() => {
                hideRobotChat();
                leaveHome();
                setTimeout(() => {
                    startRobotMovement();
                }, 2000);
            }, 8000);
        }
    }, 2000);
}

// Update robot position
function updateRobotPosition() {
    if (robotAssistant) {
        robotAssistant.style.left = robotPosition.x + 'px';
        robotAssistant.style.top = robotPosition.y + 'px';
    }
}

// Move robot smoothly (slower speed)
function moveRobot() {
    const dx = targetPosition.x - robotPosition.x;
    const dy = targetPosition.y - robotPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 2) {
        robotPosition.x += dx * 0.02; // Slower movement
        robotPosition.y += dy * 0.02;
        updateRobotPosition();
        requestAnimationFrame(moveRobot);
    } else {
        isRobotMoving = false;
        
        // Check if robot reached home
        const distanceToHome = Math.sqrt(
            Math.pow(robotPosition.x - homePosition.x, 2) + 
            Math.pow(robotPosition.y - homePosition.y, 2)
        );
        
        if (distanceToHome < 50) {
            enterHome();
        }
    }
}

// Robot enters home
function enterHome() {
    isRobotAtHome = true;
    if (robotAssistant) {
        robotAssistant.style.opacity = '0';
        setTimeout(() => {
            robotAssistant.style.display = 'none';
        }, 300);
    }
    
    // Start sleeping after 2 seconds
    setTimeout(() => {
        startSleeping();
    }, 2000);
}

// Robot leaves home
function leaveHome() {
    isRobotAtHome = false;
    isSleeping = false;
    followCursor = true; // Start following cursor
    
    if (robotHome) {
        robotHome.classList.remove('sleeping');
    }
    
    if (robotAssistant) {
        robotAssistant.style.display = 'block';
        setTimeout(() => {
            robotAssistant.style.opacity = '1';
        }, 100);
    }
}

// Start sleeping mode
function startSleeping() {
    if (isRobotAtHome) {
        isSleeping = true;
        if (robotHome) {
            robotHome.classList.add('sleeping');
        }
    }
}

// Stop sleeping mode
function stopSleeping() {
    isSleeping = false;
    if (robotHome) {
        robotHome.classList.remove('sleeping');
    }
}

// Get random position on screen
function getRandomPosition() {
    const margin = 100;
    return {
        x: margin + Math.random() * (window.innerWidth - margin * 2),
        y: margin + Math.random() * (window.innerHeight - margin * 2)
    };
}

// Start automatic robot movement
function startRobotMovement() {
    // Follow cursor with offset
    setInterval(() => {
        if (!chatVisible && !isRobotAtHome && followCursor) {
            // Calculate offset position (150-250px away from cursor)
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 100; // 150-250px away
            
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            targetPosition = {
                x: Math.max(50, Math.min(window.innerWidth - 100, cursorPosition.x + offsetX)),
                y: Math.max(50, Math.min(window.innerHeight - 100, cursorPosition.y + offsetY))
            };
            
            isRobotMoving = true;
            moveRobot();
        }
    }, 2000); // Update target every 2 seconds
    
    // Occasionally go home
    setInterval(() => {
        if (!chatVisible && !isRobotAtHome && Math.random() > 0.85) {
            followCursor = false;
            targetPosition = { x: homePosition.x, y: homePosition.y };
            isRobotMoving = true;
            moveRobot();
            
            // Resume following cursor after coming back
            setTimeout(() => {
                followCursor = true;
            }, 30000);
        }
    }, 60000); // Check every minute
    
    // Show random messages more frequently
    setInterval(() => {
        if (!chatVisible && !isRobotAtHome && Math.random() > 0.6) {
            showRobotMessage(robotMessages[Math.floor(Math.random() * robotMessages.length)]);
        }
    }, 15000); // Every 15 seconds, 40% chance
}

// Show robot chat
function showRobotMessage(message, buttons = null) {
    if (!robotChat) return;
    
    robotChatText.textContent = message;
    
    if (buttons) {
        robotChatButtons.innerHTML = '';
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'robot-chat-btn';
            button.textContent = btn.text;
            button.setAttribute('data-action', btn.action);
            robotChatButtons.appendChild(button);
        });
    }
    
    // Position chat near robot
    const robotRect = robotAssistant.getBoundingClientRect();
    const chatWidth = 250;
    
    if (robotRect.left > window.innerWidth / 2) {
        robotChat.style.left = (robotRect.left - chatWidth - 20) + 'px';
        robotChat.classList.add('right');
        robotChat.classList.remove('left');
    } else {
        robotChat.style.left = (robotRect.right + 20) + 'px';
        robotChat.classList.add('left');
        robotChat.classList.remove('right');
    }
    
    robotChat.style.top = robotRect.top + 'px';
    robotChat.classList.add('show');
    chatVisible = true;
    
    // Auto hide after 8 seconds if no buttons
    if (!buttons) {
        setTimeout(() => {
            hideRobotChat();
        }, 8000);
    }
}

function hideRobotChat() {
    if (robotChat) {
        robotChat.classList.remove('show');
        chatVisible = false;
    }
}

// Robot click handler
if (robotAssistant) {
    robotAssistant.addEventListener('click', () => {
        if (chatVisible) {
            hideRobotChat();
        } else {
            showRobotMessage('Qanday yordam bera olaman?', [
                { text: 'Skills', action: 'skills' },
                { text: 'Projects', action: 'projects' },
                { text: 'About Me', action: 'about' },
                { text: 'Download CV', action: 'cv' }
            ]);
        }
    });
}

// Close button handler
if (robotCloseBtn) {
    robotCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideRobotChat();
    });
}

// Chat button handlers
if (robotChatButtons) {
    robotChatButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('robot-chat-btn')) {
            const action = e.target.getAttribute('data-action');
            
            switch(action) {
                case 'skills':
                    document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
                    showRobotMessage('Skills bo\'limiga o\'tyapmiz! 💻');
                    break;
                case 'projects':
                    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                    showRobotMessage('Loyihalarimni ko\'ring! 🚀');
                    break;
                case 'about':
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                    showRobotMessage('Men haqimda ma\'lumot! 👨‍💻');
                    break;
                case 'contact':
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    showRobotMessage('Bog\'lanish uchun ma\'lumotlar! 📧');
                    break;
                case 'cv':
                    window.location.href = 'resumeMe.pdf';
                    showRobotMessage('CV yuklab olinmoqda... 📄');
                    break;
            }
            
            setTimeout(hideRobotChat, 3000);
        }
    });
}

// Robot home click handler
if (robotHome) {
    robotHome.addEventListener('click', () => {
        if (isRobotAtHome && isSleeping) {
            // Wake up robot
            stopSleeping();
            showRobotMessage("Uyg'ondim! Nima yordam kerak? 😊", [
                { text: 'Skills', action: 'skills' },
                { text: 'Projects', action: 'projects' },
                { text: 'About Me', action: 'about' },
                { text: 'Download CV', action: 'cv' }
            ]);
            
            setTimeout(() => {
                hideRobotChat();
                leaveHome();
                followCursor = true; // Start following cursor
            }, 5000);
        } else if (!isRobotAtHome) {
            // Call robot home
            followCursor = false; // Stop following cursor
            targetPosition = { x: homePosition.x, y: homePosition.y };
            isRobotMoving = true;
            moveRobot();
            showRobotMessage("Uyga qaytayapman... 🏠");
            setTimeout(hideRobotChat, 3000);
        }
    });
}

// Track cursor position
document.addEventListener('mousemove', (e) => {
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
});

// Initialize robot after page load
window.addEventListener('load', () => {
    setTimeout(initRobot, 7000);
});
