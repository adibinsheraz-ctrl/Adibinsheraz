$(document).ready(function(){
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Scroll Progress Bar
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('.scroll-progress').css('width', scrollPercent + '%');
    }
    
    $(window).scroll(updateScrollProgress);
    
    // Navbar scroll effects
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Smooth scroll for scroll-up button
    $('.scroll-up-btn').click(function(){
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Smooth scroll for navigation links
    $('.navbar .menu li a').click(function(e){
        e.preventDefault();
        const target = $(this).attr('href');
        if(target.startsWith('#')) {
            const targetSection = $(target);
            if(targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 80
                }, 800);
            }
        }
        
        // Close mobile menu if open
        $('.navbar .menu').removeClass('active');
        $('.menu-btn').removeClass('active');
    });

    // Mobile menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $(this).toggleClass("active");
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass('active');
            $('.menu-btn').removeClass('active');
        }
    });

    // Typing animation
    const typed = new Typed(".typing", {
        strings: [
            "Full Stack Developer", 
            "UI/UX Designer", 
            "Problem Solver", 
            "Tech Enthusiast",
            "Creative Thinker"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    const typed2 = new Typed(".typing-2", {
        strings: [
            "Full Stack Developer", 
            "UI/UX Designer", 
            "Problem Solver", 
            "Tech Enthusiast"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Animate skill bars when they come into view
    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const $this = $(this);
            const width = $this.data('width');
            const elementTop = $this.offset().top;
            const elementBottom = elementTop + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                if (!$this.hasClass('animated')) {
                    $this.addClass('animated');
                    $this.animate({
                        width: width
                    }, 1500);
                }
            }
        });
    }

    $(window).scroll(animateSkillBars);
    animateSkillBars(); // Check on load

    // GSAP Animations
    
    // Hero section animations
    gsap.timeline()
        .from(".text-1", {duration: 1, y: 50, opacity: 0, ease: "power3.out"})
        .from(".text-2", {duration: 1, y: 50, opacity: 0, ease: "power3.out"}, "-=0.7")
        .from(".text-3", {duration: 1, y: 50, opacity: 0, ease: "power3.out"}, "-=0.7")
        .from(".hero-buttons", {duration: 1, y: 50, opacity: 0, ease: "power3.out"}, "-=0.5")
        .from(".code-window", {duration: 1.2, x: 100, opacity: 0, ease: "power3.out"}, "-=0.8");

    // Floating shapes animation
    gsap.to(".shape", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(4, 8)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 2,
            from: "random"
        }
    });

    // Scroll-triggered animations
    gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.fromTo(card, 
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                delay: i * 0.1
            }
        );
    });

    // Stats counter animation
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text().replace(/[^\d]/g, ''));
            const suffix = $this.text().replace(/[\d]/g, '');
            
            const elementTop = $this.offset().top;
            const elementBottom = elementTop + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                if (!$this.hasClass('animated')) {
                    $this.addClass('animated');
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum) + suffix);
                        },
                        complete: function() {
                            $this.text(countTo + suffix);
                        }
                    });
                }
            }
        });
    }

    $(window).scroll(animateCounters);

    // Parallax effect for hero background
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.5;
        $('.hero-bg').css('transform', 'translateY(' + parallax + 'px)');
    });

    // Form enhancements
    $('.contact-form input, .contact-form textarea').on('focus blur', function(e) {
        const $this = $(this);
        const $label = $this.next('label');
        
        if (e.type === 'focus' || $this.val().length > 0) {
            $label.addClass('active');
        } else {
            $label.removeClass('active');
        }
    });

    // Form submission
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        // Add loading state
        const $button = $(this).find('button[type="submit"]');
        const originalText = $button.html();
        $button.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        $button.prop('disabled', true);
        
        // Simulate form submission
        setTimeout(function() {
            $button.html('<i class="fas fa-check"></i> Message Sent!');
            setTimeout(function() {
                $button.html(originalText);
                $button.prop('disabled', false);
            }, 2000);
        }, 2000);
    });

    // Add hover effects to service cards
    $('.services .card').hover(
        function() {
            gsap.to($(this), {duration: 0.3, y: -10, ease: "power2.out"});
        },
        function() {
            gsap.to($(this), {duration: 0.3, y: 0, ease: "power2.out"});
        }
    );

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Add smooth reveal animation for sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.fromTo(section.querySelector('.title'), 
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Code window typing effect
    function typeCode() {
        const codeLines = $('.code-line');
        let delay = 0;
        
        codeLines.each(function(index) {
            const $line = $(this);
            const text = $line.find('.code-text').text();
            
            setTimeout(() => {
                $line.find('.code-text').empty();
                let i = 0;
                const typeInterval = setInterval(() => {
                    $line.find('.code-text').text(text.substring(0, i));
                    i++;
                    if (i > text.length) {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }, delay);
            
            delay += 800;
        });
    }

    // Start code typing animation when hero section is visible
    setTimeout(typeCode, 2000);

    // Add particle effect to hero section
    function createParticle() {
        const particle = $('<div class="particle"></div>');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        particle.css({
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: '100%',
            pointerEvents: 'none',
            zIndex: 1
        });
        
        $('.hero-bg').append(particle);
        
        gsap.to(particle, {
            y: -$(window).height() - 100,
            opacity: 0,
            duration: duration,
            delay: delay,
            ease: "none",
            onComplete: function() {
                particle.remove();
            }
        });
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Add magnetic effect to buttons
    $('.btn-primary, .btn-secondary').mousemove(function(e) {
        const $this = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to($this, {
            duration: 0.3,
            x: x * 0.1,
            y: y * 0.1,
            ease: "power2.out"
        });
    });

    $('.btn-primary, .btn-secondary').mouseleave(function() {
        gsap.to($(this), {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: "power2.out"
        });
    });

    // Add loading animation
    $(window).on('load', function() {
        $('.loading').fadeOut();
        $('body').removeClass('loading');
    });
});