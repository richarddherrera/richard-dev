// Portfolio JavaScript - Richard Herrera Gomes
// Otimizado para performance e acessibilidade

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Theme Toggle com localStorage
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        html.classList.add('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            
            // Re-render icons after theme change
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 100);
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Smooth scroll para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80; // Altura do header fixo
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll effect na navegação
    const nav = document.querySelector('nav');
    if (nav) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
    
    // Performance: Debounce para eventos de scroll
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
    
    // Otimização de performance para scroll
    const optimizedScroll = debounce(() => {
        // Lógica de scroll aqui
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    // Lazy loading para imagens (se necessário no futuro)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Analytics ou tracking (se necessário)
    function trackEvent(eventName, properties = {}) {
        // Implementar analytics aqui se necessário
        console.log('Event tracked:', eventName, properties);
    }
    
    // Expor funções globalmente se necessário
    window.portfolio = {
        trackEvent,
        toggleTheme: () => themeToggle?.click()
    };
});

// Efeito de Digitação para "Back-End"
let typingText, text, index, isDeleting, typingSpeed, pauseTime;

function initTyping() {
    typingText = document.getElementById('typing-text');
    text = 'Back-End';
    index = 0;
    isDeleting = false;
    typingSpeed = 150;
    pauseTime = 2000;
}

function typeWriter() {
    if (!typingText) {
        console.log('Elemento typing-text não encontrado');
        return;
    }
    
    console.log('Escrevendo:', text.substring(0, index + 1), 'Index:', index, 'Deleting:', isDeleting);
    
    if (!isDeleting) {
        typingText.textContent = text.substring(0, index + 1);
        index++;
        
        if (index === text.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
        }
    } else {
        typingText.textContent = text.substring(0, index - 1);
        index--;
        
        if (index === 0) {
            isDeleting = false;
            setTimeout(typeWriter, 500);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : typingSpeed);
}

// Iniciar efeito quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    setTimeout(typeWriter, 1000);
});

// Debug: permitir iniciar manualmente
window.startTyping = () => {
    initTyping();
    typeWriter();
};

// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    offset: 100,
    mirror: true
});

// Atualizar ano dinâmico
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Geist:wght@300;400;500;600;700;800;900&display=swap'
    ];
    
    criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
    });
}

// Service Worker registration (para PWA no futuro)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
