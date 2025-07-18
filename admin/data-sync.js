// Data synchronization between admin panel and main website
class DataSync {
    constructor() {
        this.storageKey = 'portfolioData';
        this.init();
    }

    init() {
        // Listen for storage changes from admin panel
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey && e.newValue) {
                this.updateWebsite(JSON.parse(e.newValue));
            }
        });

        // Load initial data
        this.loadData();
    }

    loadData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                this.updateWebsite(JSON.parse(data));
            }
        } catch (error) {
            console.log('No admin data found, using defaults');
        }
    }

    updateWebsite(data) {
        // Update profile information
        if (data.profile) {
            this.updateProfile(data.profile);
        }

        // Update services
        if (data.services) {
            this.updateServices(data.services);
        }

        // Update skills
        if (data.skills) {
            this.updateSkills(data.skills);
        }

        // Update settings
        if (data.settings) {
            this.updateSettings(data.settings);
        }
    }

    updateProfile(profile) {
        // Update name in hero section
        $('.text-2 .gradient-text').text(profile.fullName);
        
        // Update about section
        $('.about .right p').first().text(profile.bio);
        
        // Update contact info
        $('.contact .info .sub-title').each(function(index) {
            switch(index) {
                case 0: // Name
                    $(this).text(profile.fullName);
                    break;
                case 1: // Location
                    $(this).text(profile.location);
                    break;
                case 2: // Email
                    $(this).text(profile.email);
                    break;
            }
        });

        // Update profile image
        if (profile.profileImage) {
            $('.about .left img').attr('src', profile.profileImage);
        }
    }

    updateServices(services) {
        const $servicesContainer = $('.services .serv-content');
        $servicesContainer.empty();

        services.forEach((service, index) => {
            const $serviceCard = $(`
                <div class="card" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                    <div class="box">
                        <div class="icon">
                            <i class="${service.icon}"></i>
                        </div>
                        <div class="text">${service.title}</div>
                        <p>${service.description}</p>
                        <div class="card-footer">
                            <a href="#" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `);
            
            $servicesContainer.append($serviceCard);
        });

        // Re-initialize animations for new elements
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.services .card', 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
            );
        }
    }

    updateSkills(skills) {
        const $skillsContainer = $('.skills .right');
        $skillsContainer.empty();

        skills.forEach((skill, index) => {
            const $skillItem = $(`
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">${skill.percentage}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="${skill.percentage}%"></div>
                    </div>
                </div>
            `);
            
            $skillsContainer.append($skillItem);
        });

        // Re-animate skill bars
        setTimeout(() => {
            $('.skill-progress').each(function() {
                const width = $(this).data('width');
                $(this).css('width', width);
            });
        }, 100);
    }

    updateSettings(settings) {
        // Update document title
        document.title = settings.siteTitle;

        // Update meta description
        $('meta[name="description"]').attr('content', settings.siteDescription);

        // Update CSS custom properties for colors
        if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        }
        
        if (settings.secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
        }

        // Handle maintenance mode
        if (settings.maintenanceMode) {
            this.showMaintenanceMode();
        } else {
            this.hideMaintenanceMode();
        }
    }

    showMaintenanceMode() {
        if (!$('#maintenanceOverlay').length) {
            const $overlay = $(`
                <div id="maintenanceOverlay" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    color: #f8fafc;
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                ">
                    <div>
                        <i class="fas fa-tools" style="font-size: 4rem; color: #8b5cf6; margin-bottom: 2rem;"></i>
                        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Under Maintenance</h1>
                        <p style="font-size: 1.2rem; color: #cbd5e1;">We're currently updating the site. Please check back soon!</p>
                    </div>
                </div>
            `);
            
            $('body').append($overlay);
        }
    }

    hideMaintenanceMode() {
        $('#maintenanceOverlay').remove();
    }

    // Method to handle contact form submissions from main website
    handleContactForm(formData) {
        try {
            const existingData = JSON.parse(localStorage.getItem(this.storageKey)) || {};
            
            if (!existingData.messages) {
                existingData.messages = [];
            }

            const newMessage = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'Contact Form Submission',
                message: formData.message,
                time: 'Just now',
                unread: true,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=8b5cf6&color=fff`
            };

            existingData.messages.unshift(newMessage);
            localStorage.setItem(this.storageKey, JSON.stringify(existingData));

            // Dispatch event to notify admin panel
            window.dispatchEvent(new StorageEvent('storage', {
                key: this.storageKey,
                newValue: JSON.stringify(existingData)
            }));

            return true;
        } catch (error) {
            console.error('Error saving contact form data:', error);
            return false;
        }
    }
}

// Initialize data sync when DOM is ready
if (typeof $ !== 'undefined') {
    $(document).ready(function() {
        window.portfolioDataSync = new DataSync();
    });
} else {
    document.addEventListener('DOMContentLoaded', function() {
        window.portfolioDataSync = new DataSync();
    });
}