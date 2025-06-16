// DOM elementlarini olish
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Nav linklar bosilganda mobile menuni yopish
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effekti
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTopBtn.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTopBtn.classList.remove('show');
    }
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skill bar animatsiyasi
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

// Skills seksiyasini kuzatish
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Scroll animatsiyalari uchun Intersection Observer
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Animatsiya qo'shish
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animatsiyasi uchun elementlarni tanlash
    const fadeElements = document.querySelectorAll('.project-card, .certificate-card, .blog-card, .about-text, .contact-info, .contact-form');
    
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        fadeObserver.observe(el);
    });

    // Skill itemlar uchun slide animatsiya
    const skillItems = document.querySelectorAll('.skill-item, .tech-item');
    skillItems.forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.transitionDelay = `${index * 0.1}s`;
        fadeObserver.observe(el);
    });

    // Stats uchun animatsiya
    const stats = document.querySelectorAll('.stat');
    stats.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.2}s`;
        fadeObserver.observe(el);
    });
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form ma'lumotlarini olish
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Bu yerda form ma'lumotlarini serverga yuborish kodi bo'lishi kerak
    // Hozircha faqat console.log va alert
    console.log('Form submitted:', { name, email, subject, message });
    
    // Success message
    showNotification('Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beraman.', 'success');
    
    // Formni tozalash
    contactForm.reset();
});

// Notification function
function showNotification(message, type = 'info') {
    // Notification elementini yaratish
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Notification stillarini qo'shish
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Notification-content stillarini qo'shish
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;
    
    // Close button stillarini qo'shish
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Sahifaga qo'shish
    document.body.appendChild(notification);
    
    // Animatsiya
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button event
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Blog card hover effects
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingCSS = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    body:not(.loaded)::after {
        content: 'Yuklanmoqda...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10001;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Add loading CSS to head
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);

// Console message
console.log(`
🚀 Jaloliddin Abduganiyev Portfolio
📧 jaloliddin.dev@gmail.com
🔗 GitHub: github.com/jaloliddin
💬 Telegram: @jaloliddin_dev

Portfolio muvaffaqiyatli yuklandi!
`);





















const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")
const body = document.body

// Get saved theme from localStorage or default to light
const savedTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", savedTheme)
updateThemeIcon(savedTheme)

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)

  // Add smooth transition effect
  body.style.transition = "background-color 0.3s ease, color 0.3s ease"
  setTimeout(() => {
    body.style.transition = ""
  }, 300)

  setTimeout(updateCSSVariables, 50)
})

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
    themeIcon.style.color = "#fbbf24"
  } else {
    themeIcon.className = "fas fa-moon"
    themeIcon.style.color = ""
  }
}

// System theme detection
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }
  return "light"
}

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const systemTheme = e.matches ? "dark" : "light"
      body.setAttribute("data-theme", systemTheme)
      updateThemeIcon(systemTheme)
    }
  })
}

// Add CSS variables for RGB values (needed for navbar transparency)
function updateCSSVariables() {
  const root = document.documentElement
  const theme = body.getAttribute("data-theme")

  if (theme === "dark") {
    root.style.setProperty("--bg-primary-rgb", "17, 24, 39")
  } else {
    root.style.setProperty("--bg-primary-rgb", "255, 255, 255")
  }
}

// Call on page load
document.addEventListener("DOMContentLoaded", updateCSSVariables)

// Update notification function to be theme-aware
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const theme = body.getAttribute("data-theme")
  const bgColor =
    type === "success" ? (theme === "dark" ? "#34d399" : "#10b981") : theme === "dark" ? "#60a5fa" : "#3b82f6"

  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px ${theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"};
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  })

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}