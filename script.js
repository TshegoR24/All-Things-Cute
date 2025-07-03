// All Things Cute - Enhanced E-commerce JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = [];
    let cartCount = 0;
    
    // DOM Elements
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotalAmount = document.querySelector('.cart-total__amount');
    const cartGrandTotalAmount = document.querySelector('.cart-grand-total__amount');
    const cartCheckout = document.querySelector('.cart-checkout');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    const mobileCartCount = document.querySelector('.mobile-cart-count');
    
    // Mobile menu elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    // Quick view modal elements
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModal = document.getElementById('closeModal');
    const quickViewButtons = document.querySelectorAll('.product-card__action[aria-label="Quick View"]');
    
    // Product data
    const products = [
        {
            id: 1,
            name: 'Dreamy Floral Pajama Set',
            price: 450,
            image: 'fas fa-bed',
            tag: 'bestseller'
        },
        {
            id: 2,
            name: 'Silky Satin Nightgown',
            price: 380,
            image: 'fas fa-moon',
            tag: 'new'
        },
        {
            id: 3,
            name: 'Soft Cotton Pajama Set',
            price: 420,
            image: 'fas fa-star',
            tag: 'cozy'
        },
        {
            id: 4,
            name: 'Lace Trim Robe',
            price: 520,
            image: 'fas fa-blanket',
            tag: ''
        },
        {
            id: 5,
            name: 'Pastel Striped Pajamas',
            price: 480,
            image: 'fas fa-bed',
            tag: 'bestseller'
        },
        {
            id: 6,
            name: 'Velvet Sleep Set',
            price: 580,
            image: 'fas fa-star',
            tag: 'new'
        }
    ];

    // Cart Functions
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.nav__actions button span, .mobile-cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
            element.style.animation = 'cartBounce 0.5s ease';
        });
    }

    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItems.style.display = 'none';
            cartEmpty.style.display = 'block';
            cartCheckout.disabled = true;
        } else {
            cartItems.style.display = 'block';
            cartEmpty.style.display = 'none';
            cartCheckout.disabled = false;
            
            // Calculate totals
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const shipping = subtotal >= 500 ? 0 : 50;
            const total = subtotal + shipping;
            
            cartTotalAmount.textContent = `R${subtotal}`;
            cartGrandTotalAmount.textContent = `R${total}`;
            
            // Update shipping display
            const shippingElement = document.querySelector('.cart-shipping__amount');
            shippingElement.textContent = shipping === 0 ? 'Free' : `R${shipping}`;
        }
    }

    function addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        cartCount += quantity;
        updateCartCount();
        updateCartDisplay();
        showNotification('Added to cart! 💕', 'success');
    }

    // Cart Event Listeners
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('cart-sidebar--open');
            cartOverlay.classList.add('cart-overlay--active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('cart-sidebar--open');
            cartOverlay.classList.add('cart-overlay--active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }

    function closeCartSidebar() {
        cartSidebar.classList.remove('cart-sidebar--open');
        cartOverlay.classList.remove('cart-overlay--active');
        document.body.style.overflow = '';
    }

    // Mobile Menu Functions
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('mobile-menu--open');
            mobileMenuOverlay.classList.add('mobile-menu-overlay--active');
            mobileMenuToggle.classList.add('nav__mobile-toggle--active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('mobile-menu--open');
        mobileMenuOverlay.classList.remove('mobile-menu-overlay--active');
        mobileMenuToggle.classList.remove('nav__mobile-toggle--active');
        document.body.style.overflow = '';
    }

    // Quick View Modal Functions
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-card__title').textContent;
            const productPrice = productCard.querySelector('.product-card__price').textContent;
            
            // Update modal content
            document.querySelector('.product-quick-view__title').textContent = productTitle;
            document.querySelector('.product-quick-view__price').textContent = productPrice;
            
            // Show modal
            quickViewModal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeQuickViewModal);
    }
    
    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                closeQuickViewModal();
            }
        });
    }

    function closeQuickViewModal() {
        quickViewModal.classList.remove('modal--active');
        document.body.style.overflow = '';
    }

    // Product Options
    const sizeChoices = document.querySelectorAll('.product-option__choice');
    sizeChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            const parent = choice.closest('.product-option__choices');
            parent.querySelectorAll('.product-option__choice').forEach(c => c.classList.remove('active'));
            choice.classList.add('active');
        });
    });

    // Quantity Selector
    const decreaseQty = document.getElementById('decreaseQty');
    const increaseQty = document.getElementById('increaseQty');
    const quantityInput = document.querySelector('.quantity-selector__input');

    if (decreaseQty && quantityInput) {
        decreaseQty.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    if (increaseQty && quantityInput) {
        increaseQty.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    // Add to Cart from Quick View
    const quickViewAddToCart = document.querySelector('.product-quick-view__actions .btn--primary');
    if (quickViewAddToCart) {
        quickViewAddToCart.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(1, quantity); // Add first product for demo
            closeQuickViewModal();
        });
    }

    // Product Card Add to Cart
    const addToCartButtons = document.querySelectorAll('.product-card .btn--small');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add to cart animation
            const productCard = button.closest('.product-card');
            if (productCard) {
                productCard.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    productCard.style.transform = '';
                }, 150);
            }

            // Add to cart
            addToCart(index + 1, 1);
        });
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.product-card__action[aria-label="Add to Wishlist"]');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Removed from wishlist', 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Added to wishlist! 💖', 'success');
            }
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.footer__newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thanks for subscribing! 💌', 'success');
                this.reset();
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .category-card, .instagram__item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification__close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 3000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
    }

    function hideNotification(notification) {
        notification.classList.remove('notification--show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cartBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f4a1c0;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(244, 161, 192, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification--show {
            transform: translateX(0);
        }
        
        .notification__close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification--success {
            background: #4CAF50;
        }
        
        .notification--info {
            background: #2196F3;
        }
    `;
    document.head.appendChild(style);

    // Add decorative sparkles
    function addSparkles() {
        const sparkles = ['✨', '💖', '⭐', '🌸', '💫'];
        const hero = document.querySelector('.hero');
        
        if (hero) {
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: 1.5rem;
                    opacity: 0.6;
                    animation: sparkleFloat 3s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                `;
                hero.appendChild(sparkle);
            }
        }
    }

    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Initialize everything
    updateCartDisplay();
    addSparkles();
});
