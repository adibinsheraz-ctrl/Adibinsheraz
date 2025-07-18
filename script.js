$(document).ready(function(){
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Add loading screen
    $('body').addClass('loading');
    
    // Scroll Progress Bar
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('.scroll-progress').css('width', scrollPercent + '%');
    }
    
    $(window).scroll(updateScrollProgress);
    
    // Enhanced Navbar scroll effects
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

    // Smooth scroll for scroll-up button with animation
    $('.scroll-up-btn').click(function(){
        gsap.to(window, {duration: 1, scrollTo: 0, ease: "power2.inOut"});
    });

    // Enhanced smooth scroll for navigation links
    $('.navbar .menu li a').click(function(e){
        e.preventDefault();
        const target = $(this).attr('href');
        if(target.startsWith('#')) {
            const targetSection = $(target);
            if(targetSection.length) {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: targetSection.offset().top - 80,
                    ease: "power2.inOut"
                });
            }
        }
        
        // Close mobile menu if open
        $('.navbar .menu').removeClass('active');
        $('.menu-btn').removeClass('active');
    });

    // Enhanced mobile menu toggle with animations
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $(this).toggleClass("active");
        
        if($(this).hasClass('active')) {
            // Animate menu items
            gsap.fromTo('.navbar .menu li', 
                {x: -50, opacity: 0}, 
                {x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2}
            );
        }
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass('active');
            $('.menu-btn').removeClass('active');
        }
    });

    // Enhanced typing animation with more dynamic effects
    const typed = new Typed(".typing", {
        strings: [
            "Full Stack Developer", 
            "UI/UX Designer", 
            "Problem Solver", 
            "Tech Enthusiast",
            "Creative Thinker",
            "Code Artist",
            "Digital Innovator"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500
    });

    const typed2 = new Typed(".typing-2", {
        strings: [
            "Full Stack Developer", 
            "UI/UX Designer", 
            "Problem Solver", 
            "Tech Enthusiast",
            "Creative Thinker"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });

    // Enhanced skill bars animation with stagger effect
    function animateSkillBars() {
        $('.skill-progress').each(function(index) {
            const $this = $(this);
            const width = $this.data('width');
            const elementTop = $this.offset().top;
            const elementBottom = elementTop + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                if (!$this.hasClass('animated')) {
                    $this.addClass('animated');
                    
                    // GSAP animation for smoother effect
                    gsap.to($this[0], {
                        width: width,
                        duration: 2,
                        delay: index * 0.2,
                        ease: "power2.out"
                    });
                }
            }
        });
    }

    $(window).scroll(animateSkillBars);
    animateSkillBars();

    // Advanced GSAP Animations
    
    // Hero section enhanced animations
    const heroTl = gsap.timeline();
    heroTl
        .from(".text-1", {duration: 1.2, y: 80, opacity: 0, ease: "power3.out"})
        .from(".text-2", {duration: 1.2, y: 80, opacity: 0, ease: "power3.out"}, "-=0.8")
        .from(".text-3", {duration: 1.2, y: 80, opacity: 0, ease: "power3.out"}, "-=0.8")
        .from(".hero-buttons", {duration: 1, y: 50, opacity: 0, ease: "power3.out"}, "-=0.6")
        .from(".code-window", {duration: 1.5, x: 150, opacity: 0, rotationY: 15, ease: "power3.out"}, "-=1");

    // Enhanced floating shapes animation
    gsap.to(".shape", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        rotation: "random(-360, 360)",
        scale: "random(0.8, 1.2)",
        duration: "random(6, 12)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 3,
            from: "random"
        }
    });

    // Advanced scroll-triggered animations
    gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.fromTo(card, 
            {
                y: 120,
                opacity: 0,
                rotationX: 15,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                delay: i * 0.15
            }
        );
    });

    // Enhanced stats counter animation
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
                    
                    // GSAP counter animation
                    gsap.fromTo($this[0], 
                        { textContent: 0 },
                        {
                            textContent: countTo,
                            duration: 2.5,
                            ease: "power2.out",
                            snap: { textContent: 1 },
                            onUpdate: function() {
                                $this.text(Math.ceil(this.targets()[0].textContent) + suffix);
                            }
                        }
                    );
                }
            }
        });
    }

    $(window).scroll(animateCounters);

    // Enhanced parallax effect
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax1 = scrolled * 0.3;
        const parallax2 = scrolled * 0.5;
        const parallax3 = scrolled * 0.7;
        
        $('.hero-bg').css('transform', `translateY(${parallax1}px)`);
        $('.floating-shapes').css('transform', `translateY(${parallax2}px) rotate(${scrolled * 0.01}deg)`);
        $('.shape').css('transform', `translateY(${parallax3}px)`);
    });

    // Enhanced form interactions
    $('.contact-form input, .contact-form textarea').on('focus blur', function(e) {
        const $this = $(this);
        const $label = $this.next('label');
        
        if (e.type === 'focus') {
            $label.addClass('active');
            gsap.to($this[0], {duration: 0.3, scale: 1.02, ease: "power2.out"});
        } else if ($this.val().length === 0) {
            $label.removeClass('active');
            gsap.to($this[0], {duration: 0.3, scale: 1, ease: "power2.out"});
        }
    });

    // Enhanced form submission with loading states
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: $(this).find('input[placeholder="Your Name"]').val(),
            email: $(this).find('input[placeholder="Your Email"]').val(),
            subject: $(this).find('input[placeholder="Subject"]').val(),
            message: $(this).find('textarea').val()
        };
        
        // Save to admin panel if data sync is available
        if (window.portfolioDataSync) {
            window.portfolioDataSync.handleContactForm(formData);
        }
        
        const $button = $(this).find('button[type="submit"]');
        const originalText = $button.html();
        
        // Loading animation
        gsap.to($button[0], {duration: 0.3, scale: 0.95, ease: "power2.out"});
        $button.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        $button.prop('disabled', true);
        
        // Simulate form submission with enhanced feedback
        setTimeout(function() {
            $button.html('<i class="fas fa-check"></i> Message Sent!');
            gsap.to($button[0], {duration: 0.3, scale: 1.05, ease: "back.out(1.7)"});
            
            // Success particle effect
            createSuccessParticles($button);
            
            setTimeout(function() {
                $button.html(originalText);
                $button.prop('disabled', false);
                gsap.to($button[0], {duration: 0.3, scale: 1, ease: "power2.out"});
                
                // Reset form
                $('.contact-form')[0].reset();
            }, 3000);
        }, 2500);
    });

    // Success particles function
    function createSuccessParticles($element) {
        for(let i = 0; i < 15; i++) {
            const particle = $('<div class="success-particle"></div>');
            particle.css({
                position: 'absolute',
                width: '6px',
                height: '6px',
                background: '#10b981',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 1000
            });
            
            $element.parent().append(particle);
            
            gsap.fromTo(particle[0], 
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                },
                {
                    x: `random(-100, 100)`,
                    y: `random(-100, -50)`,
                    opacity: 0,
                    scale: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    onComplete: function() {
                        particle.remove();
                    }
                }
            );
        }
    }

    // Enhanced hover effects for service cards
    $('.services .card').hover(
        function() {
            gsap.to($(this), {
                duration: 0.4, 
                y: -15, 
                rotationX: 5,
                scale: 1.02,
                ease: "power2.out"
            });
            
            gsap.to($(this).find('.icon'), {
                duration: 0.4,
                rotation: 10,
                scale: 1.1,
                ease: "back.out(1.7)"
            });
        },
        function() {
            gsap.to($(this), {
                duration: 0.4, 
                y: 0, 
                rotationX: 0,
                scale: 1,
                ease: "power2.out"
            });
            
            gsap.to($(this).find('.icon'), {
                duration: 0.4,
                rotation: 0,
                scale: 1,
                ease: "power2.out"
            });
        }
    );

    // Advanced Intersection Observer for complex animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('title')) {
                    gsap.fromTo(entry.target,
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                    );
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-aos], .title, .stat-item, .tech-item').forEach(el => {
        observer.observe(el);
    });

    // Enhanced section reveal animations
    gsap.utils.toArray('section').forEach((section, index) => {
        const title = section.querySelector('.title');
        if (title) {
            gsap.fromTo(title, 
                {
                    y: 80,
                    opacity: 0,
                    rotationX: 15
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Advanced particle system
    function createAdvancedParticle() {
        const particle = $('<div class="particle"></div>');
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 2;
        const colors = ['rgba(139, 92, 246, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(16, 185, 129, 0.6)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.css({
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            background: color,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            boxShadow: `0 0 ${size * 2}px ${color}`
        });
        
        $('.hero-bg').append(particle);
        
        gsap.to(particle, {
            y: -$(window).height() - 100,
            x: `random(-50, 50)`,
            opacity: 0,
            rotation: 360,
            scale: 0,
            duration: duration,
            delay: delay,
            ease: "none",
            onComplete: function() {
                particle.remove();
            }
        });
    }

    // Create particles more frequently
    setInterval(createAdvancedParticle, 200);

    // Enhanced magnetic effect for buttons
    $('.btn-primary, .btn-secondary').mousemove(function(e) {
        const $this = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to($this, {
            duration: 0.4,
            x: x * 0.15,
            y: y * 0.15,
            rotationX: y * 0.05,
            rotationY: x * 0.05,
            ease: "power2.out"
        });
    });

    $('.btn-primary, .btn-secondary').mouseleave(function() {
        gsap.to($(this), {
            duration: 0.6,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            ease: "elastic.out(1, 0.3)"
        });
    });

    // Text reveal animation for paragraphs
    gsap.utils.toArray('p').forEach(p => {
        gsap.fromTo(p,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: p,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Enhanced loading animation
    $(window).on('load', function() {
        gsap.to('.loading', {
            duration: 1,
            opacity: 0,
            scale: 1.1,
            ease: "power2.inOut",
            onComplete: function() {
                $('.loading').remove();
                $('body').removeClass('loading');
                
                // Trigger entrance animations
                gsap.fromTo('body', 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );
            }
        });
    });

    // Mouse cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trailElements = [];
    
    $(document).mousemove(function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function createTrailElement() {
        const trail = $('<div class="cursor-trail"></div>');
        trail.css({
            position: 'fixed',
            width: '4px',
            height: '4px',
            background: 'rgba(139, 92, 246, 0.6)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            left: mouseX + 'px',
            top: mouseY + 'px'
        });
        
        $('body').append(trail);
        trailElements.push(trail);
        
        gsap.to(trail, {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            ease: "power2.out",
            onComplete: function() {
                trail.remove();
                trailElements = trailElements.filter(el => el !== trail);
            }
        });
        
        if (trailElements.length > 10) {
            const oldTrail = trailElements.shift();
            oldTrail.remove();
        }
    }

    // Create trail elements periodically
    setInterval(createTrailElement, 50);

    // Add glitch effect to logo occasionally
    setInterval(function() {
        if (Math.random() < 0.1) { // 10% chance
            $('.navbar .logo a').addClass('glitch');
            setTimeout(function() {
                $('.navbar .logo a').removeClass('glitch');
            }, 200);
        }
    }, 5000);

    // Add neon glow effect to gradient text
    $('.gradient-text').addClass('neon-glow');

    // Enhanced scroll-based animations
    ScrollTrigger.create({
        trigger: ".about",
        start: "top 80%",
        onEnter: () => {
            $('.about .left').addClass('animate');
            $('.about .right').addClass('animate');
        }
    });

    ScrollTrigger.create({
        trigger: ".skills",
        start: "top 80%",
        onEnter: () => {
            $('.skills .left').addClass('animate');
            $('.skills .right').addClass('animate');
        }
    });

    ScrollTrigger.create({
        trigger: ".contact",
        start: "top 80%",
        onEnter: () => {
            $('.contact .left').addClass('animate');
            $('.contact .right').addClass('animate');
        }
    });

    // Background music visualization (visual only)
    function createMusicVisualization() {
        const bars = [];
        const container = $('<div class="music-visualizer"></div>');
        container.css({
            position: 'fixed',
            bottom: '20px',
            right: '80px',
            display: 'flex',
            gap: '2px',
            zIndex: 1000,
            opacity: 0.3
        });

        for (let i = 0; i < 5; i++) {
            const bar = $('<div></div>');
            bar.css({
                width: '3px',
                height: '10px',
                background: 'var(--primary-color)',
                borderRadius: '2px'
            });
            container.append(bar);
            bars.push(bar);
        }

        $('body').append(container);

        // Animate bars
        bars.forEach((bar, index) => {
            gsap.to(bar, {
                height: 'random(5, 25)',
                duration: 'random(0.5, 1.5)',
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.1
            });
        });
    }

    createMusicVisualization();

    // Add breathing animation to the hero section
    gsap.to('.hero-bg', {
        scale: 1.02,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    // Initialize all animations
    setTimeout(function() {
        // Trigger any remaining animations
        $('.title').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                $(this).addClass('animate');
            }
        });
    }, 1000);
});