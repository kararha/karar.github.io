/**
 * Animation.js - Handles interactive animations and effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when page is loaded
    initAnimations();
    
    // Add scroll event listener for scroll-triggered animations
    document.addEventListener('scroll', handleScrollAnimations);
    
    // Initialize ghost game enhancements if on ghost.html
    if (document.querySelector('#ghost')) {
        enhanceGhostGame();
    }
    
    // Initialize quiz enhancements if on quiz page
    if (document.querySelector('.quiz-container')) {
        enhanceQuiz();
    }
    
    // Initialize love calculator enhancements
    if (document.getElementById('wrapper')) {
        enhanceLoveCalculator();
    }
    
    // Add floating effect to buttons with .butt class
    animateButtons();
});

/**
 * Initialize all animations
 */
function initAnimations() {
    // Add hover animations to navigation elements
    addHoverAnimations();
    
    // Initialize particle effects if the container exists
    if (document.getElementById('particles-js')) {
        initParticles();
    }
    
    // Initialize toast notifications system
    initToastSystem();
    
    // Add glass morphism hover effects
    addGlassMorphismEffects();
}

/**
 * Add hover animations to elements
 */
function addHoverAnimations() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.butt, button:not(.butt)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            button.classList.add('hover-active');
        });
        
        button.addEventListener('mouseleave', (e) => {
            button.classList.remove('hover-active');
        });
        
        // Add ripple effect on click
        button.addEventListener('click', createRippleEffect);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('#menu ul li, .glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

/**
 * Create ripple effect on element click
 * @param {Event} e - The click event
 */
function createRippleEffect(e) {
    const button = e.currentTarget;
    
    // Create a span element for the ripple
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    // Get button position
    const rect = button.getBoundingClientRect();
    
    // Calculate ripple position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set ripple position and add to button
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Handle scroll animations
 */
function handleScrollAnimations() {
    // Animate elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            // Add animation class based on data attribute or default
            const animationClass = element.dataset.animation || 'fade-in';
            element.classList.add(animationClass, 'animated');
            
            // Apply delay if specified
            if (element.dataset.delay) {
                element.style.animationDelay = element.dataset.delay;
            }
        }
    });
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const scrollTop = window.pageYOffset;
        const parallaxSpeed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} el - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
}

/**
 * Initialize particles background
 */
function initParticles() {
    // Check if particlesJS is available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#dda15e" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#dda15e",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Initialize toast notification system
 */
function initToastSystem() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.querySelector('.toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    
    // Add icon based on type
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-times-circle';
    if (type === 'warning') iconClass = 'fa-exclamation-triangle';
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Add progress animation
    const progress = toast.querySelector('.toast-progress');
    progress.style.animation = `toastProgress ${duration/1000}s linear forwards`;
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide after duration
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);
    
    // Close button functionality
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(timeout);
        removeToast(toast);
    });
}

/**
 * Remove a toast with animation
 * @param {HTMLElement} toast - Toast element to remove
 */
function removeToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    toast.addEventListener('transitionend', () => {
        toast.remove();
    });
}

/**
 * Add glassmorphism hover effects
 */
function addGlassMorphismEffects() {
    const glassElements = document.querySelectorAll('.glass-card, .glass-button, .glass-content');
    
    glassElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate position for shine effect
            const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
            
            element.style.background = `linear-gradient(to right, rgba(40, 54, 24, 0.5), rgba(40, 54, 24, 0.6)), ${shine}`;
            
            // Update border color slightly
            element.style.borderColor = 'rgba(221, 161, 94, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.background = '';
            element.style.borderColor = '';
        });
    });
}

/**
 * Enhance ghost game with extra animations and effects
 */
function enhanceGhostGame() {
    // Add floating animation to ghost
    const ghost = document.getElementById('ghost');
    if (ghost) {
        // Additional ghost effects
        ghost.addEventListener('mouseover', () => {
            // Add glow effect
            ghost.style.filter = 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.9))';
            
            // Play sound if available
            if (typeof scoreIt === 'function') {
                // Function is defined in the original game script
            }
        });
        
        ghost.addEventListener('mouseout', () => {
            ghost.style.filter = 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.7))';
        });
    }
    
    // Enhance nickname screen
    const nicknameScreen = document.getElementById('nicknamescreen');
    if (nicknameScreen) {
        const inputField = nicknameScreen.querySelector('input');
        const playButton = nicknameScreen.querySelector('button');
        
        // Add animated focus effects to input
        if (inputField) {
            inputField.addEventListener('focus', () => {
                inputField.style.boxShadow = '0 0 15px rgba(221, 161, 94, 0.5)';
            });
            
            inputField.addEventListener('blur', () => {
                inputField.style.boxShadow = '';
            });
        }
        
        // Add pulse animation to play button
        if (playButton) {
            playButton.classList.add('button-pulse');
        }
    }
    
    // Improve scoreboard appearance
    const scoreboard = document.getElementById('scoreboard');
    if (scoreboard) {
        // The animation is now handled by the CSS classes
        // Additional JS functionality can be added here
    }
}

/**
 * Enhance quiz with extra animations
 */
function enhanceQuiz() {
    // Add animations to quiz elements
    const questionContainer = document.getElementById('container');
    const nextButton = document.getElementById('next-button');
    const startButton = document.getElementById('start-button');
    
    // Add hover effects to options when they appear
    if (questionContainer) {
        // We'll use a MutationObserver to detect when new options are added
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // Find newly added option divs
                    const options = questionContainer.querySelectorAll('.option-div');
                    
                    // Add entrance animations with delays
                    options.forEach((option, index) => {
                        option.style.opacity = '0';
                        option.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            option.style.transition = 'all 0.5s ease';
                            option.style.opacity = '1';
                            option.style.transform = 'translateY(0)';
                        }, 100 * index);
                    });
                }
            });
        });
        
        // Start observing the container
        observer.observe(questionContainer, { childList: true });
    }
    
    // Add pulse animation to start button
    if (startButton) {
        startButton.classList.add('button-pulse');
    }
    
    // Add animation to next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            // Add transition effects when moving to next question
            if (questionContainer) {
                questionContainer.style.opacity = '0';
                questionContainer.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    questionContainer.style.transition = 'all 0.5s ease';
                    questionContainer.style.opacity = '1';
                    questionContainer.style.transform = 'translateX(0)';
                }, 300);
            }
        });
    }
}

/**
 * Enhance love calculator with extra animations
 */
function enhanceLoveCalculator() {
    const form = document.querySelector('form');
    const loveButton = document.querySelector('.love-button');
    
    if (form && loveButton) {
        // Add heartbeat animation to button
        loveButton.classList.add('heartbeat');
        
        // Add floating animation to fire icon
        const btnIcon = loveButton.querySelector('.btnIcon');
        if (btnIcon) {
            btnIcon.style.animation = 'float 3s ease-in-out infinite';
        }
        
        // Add glow effect to inputs on focus
        const inputs = form.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 15px rgba(221, 161, 94, 0.5)';
            });
            
            input.addEventListener('blur', () => {
                input.style.boxShadow = '';
            });
        });
    }
    
    // Enhance result display animations
    const resultNumber = document.getElementById('resultNumber');
    const explanation = document.getElementById('explanation');
    
    if (resultNumber && explanation) {
        // These animations will now be triggered by the existing love calculator logic
        // We're just adding extra styling and effects
    }
}

/**
 * Animate buttons with floating effect
 */
function animateButtons() {
    const buttons = document.querySelectorAll('.butt');
    
    buttons.forEach((button, index) => {
        // Add subtle floating animation with different delays
        button.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite`;
        button.style.animationDelay = `${(index % 5) * 0.2}s`;
    });
}

/**
 * Show a modal popup
 * @param {string} title - Modal title
 * @param {string} content - Modal HTML content
 * @param {function} onConfirm - Function to call on confirm
 */
function showModal(title, content, onConfirm = null) {
    // Create modal container if it doesn't exist
    let modalOverlay = document.querySelector('.glass-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.classList.add('glass-modal-overlay');
        document.body.appendChild(modalOverlay);
    }
    
    // Create modal content
    const modalHTML = `
        <div class="glass-modal animate-in">
            <div class="glass-modal-header">
                <div class="glass-modal-title">${title}</div>
                <button class="glass-modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="glass-modal-body glass-modal-scrollbar">
                ${content}
            </div>
            ${onConfirm ? `
                <div class="glass-modal-footer">
                    <button class="glass-modal-btn glass-modal-btn-alt" data-modal-close>Cancel</button>
                    <button class="glass-modal-btn glass-modal-confirm">Confirm</button>
                </div>
            ` : ''}
        </div>
    `;
    
    // Add modal to overlay
    modalOverlay.innerHTML = modalHTML;
    
    // Show modal
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
    
    // Add event listeners
    const closeButtons = modalOverlay.querySelectorAll('.glass-modal-close, [data-modal-close]');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(modalOverlay);
        });
    });
    
    // Add confirm button functionality
    if (onConfirm) {
        const confirmButton = modalOverlay.querySelector('.glass-modal-confirm');
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                onConfirm();
                closeModal(modalOverlay);
            });
        }
    }
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modalOverlay);
        }
    });
}

/**
 * Close a modal
 * @param {HTMLElement} modalOverlay - Modal overlay element
 */
function closeModal(modalOverlay) {
    const modal = modalOverlay.querySelector('.glass-modal');
    
    if (modal) {
        modal.classList.remove('animate-in');
        modal.classList.add('animate-out');
        
        setTimeout(() => {
            modalOverlay.classList.remove('active');
        }, 300);
    }
}

// Export functions for global use
window.showToast = showToast;
window.showModal = showModal;
