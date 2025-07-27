// Modal functionality
const modal = document.getElementById('popupModal');
const modalTitle = document.getElementById('modalTitle');
const popupText = document.getElementById('popupText');
const buttons = document.querySelectorAll('.card__button');
const closeBtn = document.querySelector('.close-button');

// Only initialize modal functionality if elements exist
if (modal && modalTitle && popupText && closeBtn) {
    // Open Modal
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const title = btn.getAttribute('data-title');
            const content = btn.getAttribute('data-content');
            modalTitle.textContent = title;
            popupText.innerHTML = content;

            modal.style.display = 'flex'; // Show modal centered
            document.body.classList.add('modal-open'); // Disable scroll
        });
    });

    // Close Modal via X button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    // Close Modal by clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
}

// Typed.js initialization
document.addEventListener('DOMContentLoaded', function () {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        var typed = new Typed('.typed-text', {
            strings: ['Expert Care', 'Professional Service', 'Luxury Treatment', 'Perfect Style'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Initialize counter animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    // Intersection Observer for counter animation
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(heroStats);
    }
});

// Smooth scroll function
function smoothScroll() {
    const nextSection = document.querySelector('.about-preview');
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Remove all code related to booking modal, booking form, and booking modal event listeners

// Initialize all Swiper sliders
document.addEventListener('DOMContentLoaded', function() {
    // Services slider
    const servicesSwiper = document.querySelector('.services-swiper');
    if (servicesSwiper) {
        new Swiper('.services-swiper', {
            slidesPerView: 1,
            spaceBetween: 14,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 14,
                }
            }
        });
    }

    // Testimonials slider
    const testimonialSwiper = document.querySelector('.testimonial-swiper');
    if (testimonialSwiper) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 14,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 14,
                }
            }
        });
    }

    // Blog slider
    const blogSwiper = document.querySelector('.blog-swiper');
    if (blogSwiper) {
        new Swiper('.blog-swiper', {
            slidesPerView: 1,
            spaceBetween: 14,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 14,
                }
            }
        });
    }
});

// Featured Services Animation
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                const card = entry.target;
                card.style.animationDelay = `${index * 0.2}s`;
                card.style.opacity = '0';
                card.style.animation = 'cardReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                
                // Observe once
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Observe all service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Enhanced hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(46, 0, 62, 0.3), 0 0 30px rgba(142, 45, 226, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Smooth parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const cards = document.querySelectorAll('.service-card');
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const centerPosition = window.innerHeight / 2;
                    const cardCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(centerPosition - cardCenter);
                    const parallaxValue = Math.min(distance / 10, 20);
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        card.style.transform = `translateY(${parallaxValue}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing! You will receive our updates soon.');
        this.reset();
    });
}

// Fixed Countdown Timer Function
function initFixedCountdown() {
    const countdownElements = document.querySelectorAll('[data-countdown]');
    
    countdownElements.forEach(element => {
        // Fixed countdown time: 16 days, 10 hours, 12 minutes, 2 seconds
        const fixedDays = 18;
        const fixedHours = 10;
        const fixedMinutes = 12;
        const fixedSeconds = 2;
        
        // Calculate total milliseconds for the fixed time
        const totalFixedTime = (fixedDays * 24 * 60 * 60 * 1000) + 
                              (fixedHours * 60 * 60 * 1000) + 
                              (fixedMinutes * 60 * 1000) + 
                              (fixedSeconds * 1000);
        
        // Clear localStorage to force new countdown start
        localStorage.removeItem('countdownEndTime');
        
        // Create new end time
        let endTime = Date.now() + totalFixedTime;
        localStorage.setItem('countdownEndTime', endTime);
        
        function updateCountdown() {
            const now = Date.now();
            const distance = endTime - now;
            
            if (distance < 0) {
                // Countdown has ended - reset to fixed time
                endTime = Date.now() + totalFixedTime;
                localStorage.setItem('countdownEndTime', endTime);
                
                // Update display with fixed time
                element.innerHTML = `
                    <span class="time-block" data-label="d"><span class="days">${fixedDays.toString().padStart(2, '0')}</span></span>
                    <span class="time-block" data-label="h"><span class="hours">${fixedHours.toString().padStart(2, '0')}</span></span>
                    <span class="time-block" data-label="m"><span class="minutes">${fixedMinutes.toString().padStart(2, '0')}</span></span>
                    <span class="time-block" data-label="s"><span class="seconds">${fixedSeconds.toString().padStart(2, '0')}</span></span>
                `;
                return;
            }
            
            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update the display with proper labels
            element.innerHTML = `
                <span class="time-block" data-label="d"><span class="days">${days.toString().padStart(2, '0')}</span></span>
                <span class="time-block" data-label="h"><span class="hours">${hours.toString().padStart(2, '0')}</span></span>
                <span class="time-block" data-label="m"><span class="minutes">${minutes.toString().padStart(2, '0')}</span></span>
                <span class="time-block" data-label="s"><span class="seconds">${seconds.toString().padStart(2, '0')}</span></span>
            `;
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

// Initialize fixed countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFixedCountdown();
});

// Also initialize if the script runs after DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFixedCountdown);
} else {
    initFixedCountdown();
}

// Section Headers Animation with Intersection Observer
function initSectionHeadersAnimation() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                

            } else {
                entry.target.classList.remove('in-view', 'animate-in');
            }
        });
    }, observerOptions);
    
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });
}

// Initialize section headers animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSectionHeadersAnimation();
});

// Also initialize if the script runs after DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionHeadersAnimation);
} else {
    initSectionHeadersAnimation();
}

// Initialize AOS
AOS.init({
  once: true,
  duration: 1000,
  offset: 100
});
