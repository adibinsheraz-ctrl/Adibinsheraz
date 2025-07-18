$(document).ready(function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Admin data storage
    let adminData = {
        profile: {
            fullName: 'Adi Bin Sheraz',
            email: 'adi.binsheraz@gmail.com',
            phone: '+92 300 1234567',
            location: 'Lahore, Pakistan',
            bio: "I'm a passionate full-stack developer with expertise in creating modern, responsive, and user-centric web applications.",
            profileImage: '../profile-11.png'
        },
        services: [
            {
                id: 1,
                icon: 'fas fa-palette',
                title: 'Web Design',
                description: 'Creating stunning, modern, and responsive web designs that captivate users and drive engagement through thoughtful UX/UI principles.'
            },
            {
                id: 2,
                icon: 'fas fa-code',
                title: 'Web Development',
                description: 'Building robust, scalable web applications using cutting-edge technologies and frameworks for optimal performance and user experience.'
            },
            {
                id: 3,
                icon: 'fas fa-mobile-alt',
                title: 'App Development',
                description: 'Developing cross-platform mobile and web applications that deliver seamless experiences across all devices and platforms.'
            }
        ],
        skills: [
            { id: 1, name: 'Frontend Development', percentage: 95 },
            { id: 2, name: 'Backend Development', percentage: 88 },
            { id: 3, name: 'Database Design', percentage: 85 },
            { id: 4, name: 'UI/UX Design', percentage: 80 },
            { id: 5, name: 'DevOps & Cloud', percentage: 75 }
        ],
        projects: [
            {
                id: 1,
                title: 'E-commerce Platform',
                description: 'Full-stack e-commerce solution with React and Node.js',
                image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
                technologies: ['React', 'Node.js', 'MongoDB']
            },
            {
                id: 2,
                title: 'Task Management App',
                description: 'Collaborative task management with real-time updates',
                image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
                technologies: ['Vue.js', 'Express', 'Socket.io']
            }
        ],
        messages: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Project Collaboration Inquiry',
                message: "Hi Adi, I'm interested in collaborating on a web development project...",
                time: '2 hours ago',
                unread: true,
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
            },
            {
                id: 2,
                name: 'Sarah Wilson',
                email: 'sarah@example.com',
                subject: 'Website Design Quote',
                message: 'Hello, I need a quote for a complete website redesign...',
                time: '1 day ago',
                unread: false,
                avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
            }
        ],
        settings: {
            siteTitle: 'Adi Bin Sheraz - Full Stack Developer',
            siteDescription: 'Portfolio of Adi Bin Sheraz - Full Stack Developer specializing in modern web applications',
            primaryColor: '#8b5cf6',
            secondaryColor: '#f59e0b',
            darkMode: true,
            maintenanceMode: false
        }
    };

    // Login functionality
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();
        
        // Simple authentication (in real app, this would be server-side)
        if (username === 'admin' && password === 'admin123') {
            // Animate login success
            gsap.to('.login-screen', {
                duration: 1,
                opacity: 0,
                scale: 0.9,
                ease: "power2.inOut",
                onComplete: function() {
                    $('.login-screen').hide();
                    $('#adminDashboard').show();
                    
                    // Animate dashboard entrance
                    gsap.fromTo('#adminDashboard', 
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
                    );
                    
                    // Initialize dashboard
                    initializeDashboard();
                }
            });
        } else {
            showNotification('Invalid credentials. Use admin/admin123', 'error');
            
            // Shake animation for error
            gsap.to('.login-container', {
                duration: 0.1,
                x: -10,
                yoyo: true,
                repeat: 5,
                ease: "power2.inOut"
            });
        }
    });

    // Logout functionality
    $('#logoutBtn').click(function() {
        gsap.to('#adminDashboard', {
            duration: 0.8,
            opacity: 0,
            scale: 0.95,
            ease: "power2.inOut",
            onComplete: function() {
                $('#adminDashboard').hide();
                $('.login-screen').show();
                
                gsap.fromTo('.login-screen', 
                    { opacity: 0, scale: 1.05 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
                );
                
                // Reset form
                $('#loginForm')[0].reset();
            }
        });
    });

    // Initialize dashboard
    function initializeDashboard() {
        updateStats();
        renderServices();
        renderSkills();
        renderProjects();
        renderMessages();
        loadSettings();
        
        // Animate dashboard elements
        gsap.fromTo('.stat-card', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
    }

    // Navigation
    $('.nav-link').click(function(e) {
        e.preventDefault();
        
        const section = $(this).data('section');
        
        // Update active nav
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        // Update page title
        $('.page-title').text($(this).find('span').text());
        
        // Show section
        $('.content-section').removeClass('active');
        $(`#${section}-section`).addClass('active');
        
        // Animate section entrance
        gsap.fromTo(`#${section}-section`, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    });

    // Sidebar toggle
    $('#sidebarToggle').click(function() {
        $('.sidebar').toggleClass('active');
    });

    // Preview site button
    $('#previewBtn').click(function() {
        window.open('../index.html', '_blank');
    });

    // Quick actions
    $('.action-btn').click(function() {
        const action = $(this).data('action');
        
        switch(action) {
            case 'add-project':
                openProjectModal();
                break;
            case 'update-skills':
                $('.nav-link[data-section="skills"]').click();
                break;
            case 'view-messages':
                $('.nav-link[data-section="messages"]').click();
                break;
            case 'backup-data':
                backupData();
                break;
        }
    });

    // Update stats
    function updateStats() {
        // Animate counters
        animateCounter('.stat-card:nth-child(1) h3', 1234);
        animateCounter('.stat-card:nth-child(2) h3', adminData.messages.length);
        animateCounter('.stat-card:nth-child(3) h3', adminData.projects.length);
        animateCounter('.stat-card:nth-child(4) h3', adminData.skills.length);
        
        // Update message count badge
        const unreadCount = adminData.messages.filter(m => m.unread).length;
        $('#messageCount').text(unreadCount);
    }

    function animateCounter(selector, target) {
        gsap.fromTo(selector, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function() {
                    $(selector).text(Math.ceil(this.targets()[0].textContent));
                }
            }
        );
    }

    // Profile form
    $('#profileForm').submit(function(e) {
        e.preventDefault();
        
        // Update admin data
        adminData.profile.fullName = $('#fullName').val();
        adminData.profile.email = $('#email').val();
        adminData.profile.phone = $('#phone').val();
        adminData.profile.location = $('#location').val();
        adminData.profile.bio = $('#bio').val();
        
        // Update main website
        updateMainWebsite();
        
        showNotification('Profile updated successfully!', 'success');
        
        // Animate save button
        const $btn = $(this).find('.save-btn');
        const originalText = $btn.html();
        
        $btn.html('<i class="fas fa-check"></i> <span>Saved!</span>');
        gsap.to($btn, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        
        setTimeout(() => {
            $btn.html(originalText);
        }, 2000);
    });

    // Services management
    function renderServices() {
        const $grid = $('#servicesGrid');
        $grid.empty();
        
        adminData.services.forEach(service => {
            const $item = $(`
                <div class="service-item" data-id="${service.id}">
                    <div class="service-header">
                        <i class="${service.icon}"></i>
                        <div class="service-actions">
                            <button class="edit-btn" data-action="edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-btn" data-action="delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `);
            
            $grid.append($item);
        });
        
        // Animate services
        gsap.fromTo('.service-item', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
    }

    // Add service button
    $('#addServiceBtn').click(function() {
        openServiceModal();
    });

    // Service modal
    function openServiceModal(service = null) {
        const $modal = $('#serviceModal');
        const $title = $('#serviceModalTitle');
        const $form = $('#serviceForm');
        
        if (service) {
            $title.text('Edit Service');
            $('#serviceIcon').val(service.icon);
            $('#serviceTitle').val(service.title);
            $('#serviceDescription').val(service.description);
            $form.data('editing', service.id);
        } else {
            $title.text('Add Service');
            $form[0].reset();
            $form.removeData('editing');
        }
        
        $modal.addClass('active');
        
        // Animate modal
        gsap.fromTo('.modal-content', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
    }

    // Service form submission
    $('#serviceForm').submit(function(e) {
        e.preventDefault();
        
        const serviceData = {
            icon: $('#serviceIcon').val(),
            title: $('#serviceTitle').val(),
            description: $('#serviceDescription').val()
        };
        
        const editingId = $(this).data('editing');
        
        if (editingId) {
            // Update existing service
            const index = adminData.services.findIndex(s => s.id === editingId);
            adminData.services[index] = { ...adminData.services[index], ...serviceData };
        } else {
            // Add new service
            const newId = Math.max(...adminData.services.map(s => s.id)) + 1;
            adminData.services.push({ id: newId, ...serviceData });
        }
        
        renderServices();
        updateMainWebsite();
        closeModal('#serviceModal');
        showNotification('Service saved successfully!', 'success');
    });

    // Service actions
    $(document).on('click', '.service-item .edit-btn', function() {
        const serviceId = parseInt($(this).closest('.service-item').data('id'));
        const service = adminData.services.find(s => s.id === serviceId);
        openServiceModal(service);
    });

    $(document).on('click', '.service-item .delete-btn', function() {
        const serviceId = parseInt($(this).closest('.service-item').data('id'));
        
        if (confirm('Are you sure you want to delete this service?')) {
            adminData.services = adminData.services.filter(s => s.id !== serviceId);
            renderServices();
            updateMainWebsite();
            showNotification('Service deleted successfully!', 'success');
        }
    });

    // Skills management
    function renderSkills() {
        const $list = $('#skillsList');
        $list.empty();
        
        adminData.skills.forEach(skill => {
            const $item = $(`
                <div class="skill-item" data-id="${skill.id}">
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">${skill.percentage}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.percentage}%"></div>
                    </div>
                    <div class="skill-actions">
                        <button class="edit-btn" data-action="edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-action="delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `);
            
            $list.append($item);
        });
        
        // Animate skills
        gsap.fromTo('.skill-item', 
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
        
        // Animate skill bars
        gsap.fromTo('.skill-progress', 
            { width: 0 },
            { width: function(i, target) { return $(target).css('width'); }, duration: 1.5, delay: 0.5, ease: "power2.out" }
        );
    }

    // Add skill button
    $('#addSkillBtn').click(function() {
        openSkillModal();
    });

    // Skill modal
    function openSkillModal(skill = null) {
        const $modal = $('#skillModal');
        const $title = $('#skillModalTitle');
        const $form = $('#skillForm');
        
        if (skill) {
            $title.text('Edit Skill');
            $('#skillName').val(skill.name);
            $('#skillPercentage').val(skill.percentage);
            $('#skillPercentageValue').text(skill.percentage + '%');
            $form.data('editing', skill.id);
        } else {
            $title.text('Add Skill');
            $form[0].reset();
            $('#skillPercentageValue').text('50%');
            $form.removeData('editing');
        }
        
        $modal.addClass('active');
    }

    // Skill percentage slider
    $('#skillPercentage').on('input', function() {
        $('#skillPercentageValue').text($(this).val() + '%');
    });

    // Skill form submission
    $('#skillForm').submit(function(e) {
        e.preventDefault();
        
        const skillData = {
            name: $('#skillName').val(),
            percentage: parseInt($('#skillPercentage').val())
        };
        
        const editingId = $(this).data('editing');
        
        if (editingId) {
            // Update existing skill
            const index = adminData.skills.findIndex(s => s.id === editingId);
            adminData.skills[index] = { ...adminData.skills[index], ...skillData };
        } else {
            // Add new skill
            const newId = Math.max(...adminData.skills.map(s => s.id)) + 1;
            adminData.skills.push({ id: newId, ...skillData });
        }
        
        renderSkills();
        updateMainWebsite();
        closeModal('#skillModal');
        showNotification('Skill saved successfully!', 'success');
    });

    // Skill actions
    $(document).on('click', '.skill-item .edit-btn', function() {
        const skillId = parseInt($(this).closest('.skill-item').data('id'));
        const skill = adminData.skills.find(s => s.id === skillId);
        openSkillModal(skill);
    });

    $(document).on('click', '.skill-item .delete-btn', function() {
        const skillId = parseInt($(this).closest('.skill-item').data('id'));
        
        if (confirm('Are you sure you want to delete this skill?')) {
            adminData.skills = adminData.skills.filter(s => s.id !== skillId);
            renderSkills();
            updateMainWebsite();
            showNotification('Skill deleted successfully!', 'success');
        }
    });

    // Projects management
    function renderProjects() {
        const $grid = $('#projectsGrid');
        $grid.empty();
        
        adminData.projects.forEach(project => {
            const techTags = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            const $item = $(`
                <div class="project-item" data-id="${project.id}">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${techTags}
                        </div>
                        <div class="project-actions">
                            <button class="edit-btn" data-action="edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-btn" data-action="delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `);
            
            $grid.append($item);
        });
        
        // Animate projects
        gsap.fromTo('.project-item', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
        );
    }

    // Add project button
    $('#addProjectBtn').click(function() {
        openProjectModal();
    });

    // Project modal
    function openProjectModal(project = null) {
        const $modal = $('#projectModal');
        const $title = $('#projectModalTitle');
        const $form = $('#projectForm');
        
        if (project) {
            $title.text('Edit Project');
            $('#projectTitle').val(project.title);
            $('#projectDescription').val(project.description);
            $('#projectImage').val(project.image);
            $('#projectTech').val(project.technologies.join(', '));
            $form.data('editing', project.id);
        } else {
            $title.text('Add Project');
            $form[0].reset();
            $form.removeData('editing');
        }
        
        $modal.addClass('active');
    }

    // Project form submission
    $('#projectForm').submit(function(e) {
        e.preventDefault();
        
        const projectData = {
            title: $('#projectTitle').val(),
            description: $('#projectDescription').val(),
            image: $('#projectImage').val() || 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
            technologies: $('#projectTech').val().split(',').map(tech => tech.trim())
        };
        
        const editingId = $(this).data('editing');
        
        if (editingId) {
            // Update existing project
            const index = adminData.projects.findIndex(p => p.id === editingId);
            adminData.projects[index] = { ...adminData.projects[index], ...projectData };
        } else {
            // Add new project
            const newId = Math.max(...adminData.projects.map(p => p.id)) + 1;
            adminData.projects.push({ id: newId, ...projectData });
        }
        
        renderProjects();
        updateStats();
        closeModal('#projectModal');
        showNotification('Project saved successfully!', 'success');
    });

    // Project actions
    $(document).on('click', '.project-item .edit-btn', function() {
        const projectId = parseInt($(this).closest('.project-item').data('id'));
        const project = adminData.projects.find(p => p.id === projectId);
        openProjectModal(project);
    });

    $(document).on('click', '.project-item .delete-btn', function() {
        const projectId = parseInt($(this).closest('.project-item').data('id'));
        
        if (confirm('Are you sure you want to delete this project?')) {
            adminData.projects = adminData.projects.filter(p => p.id !== projectId);
            renderProjects();
            updateStats();
            showNotification('Project deleted successfully!', 'success');
        }
    });

    // Messages management
    function renderMessages() {
        const $list = $('#messagesList');
        $list.empty();
        
        adminData.messages.forEach(message => {
            const $item = $(`
                <div class="message-item ${message.unread ? 'unread' : ''}" data-id="${message.id}">
                    <div class="message-avatar">
                        <img src="${message.avatar}" alt="${message.name}">
                    </div>
                    <div class="message-content">
                        <div class="message-header">
                            <h4>${message.name}</h4>
                            <span class="message-time">${message.time}</span>
                        </div>
                        <p class="message-subject">${message.subject}</p>
                        <p class="message-preview">${message.message}</p>
                    </div>
                    <div class="message-actions">
                        <button class="reply-btn" data-action="reply">
                            <i class="fas fa-reply"></i>
                        </button>
                        <button class="delete-btn" data-action="delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `);
            
            $list.append($item);
        });
        
        // Animate messages
        gsap.fromTo('.message-item', 
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
    }

    // Message filters
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        $('.message-item').each(function() {
            const $item = $(this);
            const messageId = parseInt($item.data('id'));
            const message = adminData.messages.find(m => m.id === messageId);
            
            let show = true;
            
            if (filter === 'unread' && !message.unread) {
                show = false;
            } else if (filter === 'important' && !message.important) {
                show = false;
            }
            
            if (show) {
                $item.show();
                gsap.fromTo($item, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
            } else {
                gsap.to($item, { opacity: 0, x: -20, duration: 0.3, onComplete: () => $item.hide() });
            }
        });
    });

    // Message actions
    $(document).on('click', '.message-item .reply-btn', function() {
        const messageId = parseInt($(this).closest('.message-item').data('id'));
        const message = adminData.messages.find(m => m.id === messageId);
        
        // Mark as read
        message.unread = false;
        renderMessages();
        updateStats();
        
        // Open email client (in real app, this would open a compose modal)
        window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
        
        showNotification('Opening email client...', 'success');
    });

    $(document).on('click', '.message-item .delete-btn', function() {
        const messageId = parseInt($(this).closest('.message-item').data('id'));
        
        if (confirm('Are you sure you want to delete this message?')) {
            adminData.messages = adminData.messages.filter(m => m.id !== messageId);
            renderMessages();
            updateStats();
            showNotification('Message deleted successfully!', 'success');
        }
    });

    // Settings management
    function loadSettings() {
        $('#siteTitle').val(adminData.settings.siteTitle);
        $('#siteDescription').val(adminData.settings.siteDescription);
        $('#primaryColor').val(adminData.settings.primaryColor);
        $('#secondaryColor').val(adminData.settings.secondaryColor);
        $('#darkMode').prop('checked', adminData.settings.darkMode);
        $('#maintenanceMode').prop('checked', adminData.settings.maintenanceMode);
    }

    // Save settings
    $('.save-settings-btn').click(function() {
        adminData.settings.siteTitle = $('#siteTitle').val();
        adminData.settings.siteDescription = $('#siteDescription').val();
        adminData.settings.primaryColor = $('#primaryColor').val();
        adminData.settings.secondaryColor = $('#secondaryColor').val();
        adminData.settings.darkMode = $('#darkMode').prop('checked');
        adminData.settings.maintenanceMode = $('#maintenanceMode').prop('checked');
        
        // Apply color changes
        document.documentElement.style.setProperty('--primary-color', adminData.settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', adminData.settings.secondaryColor);
        
        updateMainWebsite();
        showNotification('Settings saved successfully!', 'success');
        
        // Animate save button
        const $btn = $(this);
        const originalText = $btn.html();
        
        $btn.html('<i class="fas fa-check"></i> <span>Saved!</span>');
        gsap.to($btn, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        
        setTimeout(() => {
            $btn.html(originalText);
        }, 2000);
    });

    // Reset settings
    $('.reset-settings-btn').click(function() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            adminData.settings = {
                siteTitle: 'Adi Bin Sheraz - Full Stack Developer',
                siteDescription: 'Portfolio of Adi Bin Sheraz - Full Stack Developer specializing in modern web applications',
                primaryColor: '#8b5cf6',
                secondaryColor: '#f59e0b',
                darkMode: true,
                maintenanceMode: false
            };
            
            loadSettings();
            showNotification('Settings reset to default!', 'success');
        }
    });

    // Change password
    $('.change-password-btn').click(function() {
        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill in all password fields', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }
        
        // In real app, this would make an API call
        $('#currentPassword, #newPassword, #confirmPassword').val('');
        showNotification('Password changed successfully!', 'success');
    });

    // Modal functionality
    $('.modal-close, .cancel-btn').click(function() {
        const $modal = $(this).closest('.modal');
        closeModal($modal);
    });

    function closeModal(modalSelector) {
        const $modal = $(modalSelector);
        
        gsap.to('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: function() {
                $modal.removeClass('active');
            }
        });
    }

    // Click outside modal to close
    $('.modal').click(function(e) {
        if (e.target === this) {
            closeModal(this);
        }
    });

    // Update main website
    function updateMainWebsite() {
        // In a real application, this would make API calls to update the main website
        // For demo purposes, we'll simulate the update
        
        try {
            // Update localStorage for demo
            localStorage.setItem('portfolioData', JSON.stringify(adminData));
            
            // If main website is open in another tab, it could listen for storage events
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'portfolioData',
                newValue: JSON.stringify(adminData)
            }));
            
        } catch (error) {
            console.log('Demo mode: Website updates simulated');
        }
    }

    // Backup data
    function backupData() {
        const dataStr = JSON.stringify(adminData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('Data backup downloaded!', 'success');
    }

    // Notification system
    function showNotification(message, type = 'success') {
        const $notification = $('#notification');
        const $icon = $('.notification-icon');
        const $message = $('.notification-message');
        
        // Set icon based on type
        if (type === 'success') {
            $icon.removeClass().addClass('notification-icon fas fa-check-circle');
            $notification.removeClass('error').addClass('success');
        } else if (type === 'error') {
            $icon.removeClass().addClass('notification-icon fas fa-exclamation-circle');
            $notification.removeClass('success').addClass('error');
        }
        
        $message.text(message);
        $notification.addClass('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            $notification.removeClass('show');
        }, 3000);
    }

    // File upload handling
    $('.upload-btn').click(function() {
        $('#profileImage').click();
    });

    $('#profileImage').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('.current-image').attr('src', e.target.result);
                adminData.profile.profileImage = e.target.result;
                showNotification('Profile image updated!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });

    // Responsive sidebar
    $(window).resize(function() {
        if ($(window).width() > 1024) {
            $('.sidebar').removeClass('active');
        }
    });

    // Close sidebar when clicking outside on mobile
    $(document).click(function(e) {
        if ($(window).width() <= 1024) {
            if (!$(e.target).closest('.sidebar, .sidebar-toggle').length) {
                $('.sidebar').removeClass('active');
            }
        }
    });

    // Initialize tooltips and other UI enhancements
    function initializeUIEnhancements() {
        // Add hover effects to cards
        $('.stat-card, .dashboard-card, .service-item, .skill-item, .project-item, .message-item').hover(
            function() {
                gsap.to($(this), { y: -5, duration: 0.3, ease: "power2.out" });
            },
            function() {
                gsap.to($(this), { y: 0, duration: 0.3, ease: "power2.out" });
            }
        );
        
        // Add click ripple effect to buttons
        $('.btn, .action-btn, .filter-btn, .nav-link').click(function(e) {
            const $this = $(this);
            const ripple = $('<span class="ripple"></span>');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.css({
                position: 'absolute',
                width: size,
                height: size,
                left: x,
                top: y,
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                transform: 'scale(0)',
                pointerEvents: 'none',
                zIndex: 1
            });
            
            $this.css('position', 'relative').append(ripple);
            
            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: function() {
                    ripple.remove();
                }
            });
        });
    }

    // Initialize everything
    initializeUIEnhancements();
    
    // Auto-save functionality
    setInterval(function() {
        updateMainWebsite();
    }, 30000); // Auto-save every 30 seconds

    // Keyboard shortcuts
    $(document).keydown(function(e) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.which === 83) {
            e.preventDefault();
            
            const activeSection = $('.content-section.active').attr('id');
            
            if (activeSection === 'profile-section') {
                $('#profileForm').submit();
            } else if (activeSection === 'settings-section') {
                $('.save-settings-btn').click();
            }
        }
        
        // Escape to close modals
        if (e.which === 27) {
            $('.modal.active').each(function() {
                closeModal(this);
            });
        }
    });

    // Add loading states to forms
    $('form').submit(function() {
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.html();
        
        $submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Saving...');
        
        setTimeout(() => {
            $submitBtn.prop('disabled', false).html(originalText);
        }, 1000);
    });

    // Initialize dashboard on page load if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        $('.login-screen').hide();
        $('#adminDashboard').show();
        initializeDashboard();
    }

    // Save login state
    $('#loginForm').submit(function() {
        localStorage.setItem('adminLoggedIn', 'true');
    });

    // Clear login state on logout
    $('#logoutBtn').click(function() {
        localStorage.removeItem('adminLoggedIn');
    });
});