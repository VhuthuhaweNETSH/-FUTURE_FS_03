// Service Data
const services = [
    {
        id: 1,
        name: "Industrial Electrical",
        description: "Factory wiring, machinery installation, industrial maintenance, and commercial electrical systems.",
        icon: "🏭",
        badge: "24/7 Support"
    },
    {
        id: 2,
        name: "Domestic Electrical",
        description: "Home wiring, lighting installation, circuit repairs, and complete house electrification.",
        icon: "🏠",
        badge: "Same Day"
    },
    {
        id: 3,
        name: "AC Installation & Repair",
        description: "Air conditioner installation, servicing, repairs, and maintenance for all brands.",
        icon: "❄️",
        badge: "Expert Team"
    },
    {
        id: 4,
        name: "Fridge Repair",
        description: "Professional refrigerator repair, gas recharge, compressor replacement, and maintenance.",
        icon: "🧊",
        badge: "Quick Fix"
    },
    {
        id: 5,
        name: "Prepaid Meter Installation",
        description: "Tenant prepaid meter installation, replacement, and troubleshooting services.",
        icon: "📊",
        badge: "Fast Service"
    },
    {
        id: 6,
        name: "Welding Services",
        description: "Metal fabrication, gate welding, structural repairs, and custom metal work.",
        icon: "🔨",
        badge: "On-Site"
    }
];

// Projects Data 
const projects = [];

// Service Areas - ALL of South Africa
const serviceAreas = [
    "🌍 Gauteng", "🌍 Western Cape", "🌍 KwaZulu-Natal", "🌍 Eastern Cape",
    "🌍 Free State", "🌍 Limpopo", "🌍 Mpumalanga", "🌍 North West",
    "🌍 Northern Cape", "🌍 Everywhere in South Africa"
];

// Load everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    loadProjects();
    loadServiceAreas();
    setupContactForm();
    setupSmoothScrolling();
    setupMobileMenu();
    setupEmergencyCall();
    setupWhatsAppLink();
});

// Load services into grid
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <span class="service-badge">${service.badge}</span>
        `;
        
        serviceCard.onclick = () => serviceClick(service.name);
        servicesGrid.appendChild(serviceCard);
    });
}

// Service click handler - scrolls to contact form and pre-selects service
function serviceClick(serviceName) {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    const serviceSelect = document.getElementById('contactService');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
}

// Load projects into grid - EMPTY (shows message)
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#666; padding:2rem;">No projects added yet. Check back soon!</p>';
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="project-image">${project.icon}</div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>📍 ${project.location}</p>
            </div>
        `;
        projectsGrid.appendChild(projectItem);
    });
}

// Load service areas
function loadServiceAreas() {
    const areasGrid = document.getElementById('areasGrid');
    if (!areasGrid) return;
    
    areasGrid.innerHTML = '';
    
    serviceAreas.forEach(area => {
        const areaTag = document.createElement('div');
        areaTag.className = 'area-tag';
        areaTag.textContent = `${area}`;
        areasGrid.appendChild(areaTag);
    });
}

// Setup contact form submission
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const service = document.getElementById('contactService').value;
        const message = document.getElementById('contactMessage').value;
        
        // Validation
        if (!name || !email || !phone || !message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Create quote request object
        const quoteRequest = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message,
            date: new Date().toISOString(),
            quoteId: 'QT-' + Math.floor(Math.random() * 10000)
        };
        
        console.log('Quote Request:', quoteRequest);
        
        // Store in localStorage (simulates database)
        let quotes = JSON.parse(localStorage.getItem('vhalaphalaQuotes') || '[]');
        quotes.push(quoteRequest);
        localStorage.setItem('vhalaphalaQuotes', JSON.stringify(quotes));
        
        // Show success message
        showMessage(`✅ Thanks ${name}! We'll contact you within 1 hour with your free estimate. Reference: ${quoteRequest.quoteId}`, 'success');
        
        // Clear form
        form.reset();
    });
}

// Show alert message
function showMessage(msg, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.textContent = msg;
    messageDiv.className = type === 'success' ? 'alert-success' : 'alert-error';
    
    // Clear message after 6 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 6000);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('.nav-links a, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = '#0d2b4e';
                navLinks.style.padding = '1rem';
                navLinks.style.zIndex = '99';
            }
        });
    }
}

// Emergency call button
function setupEmergencyCall() {
    const emergencyBtn = document.querySelector('.btn-outline');
    if (emergencyBtn && emergencyBtn.textContent.includes('Emergency')) {
        emergencyBtn.addEventListener('click', () => {
            console.log('Emergency call clicked');
        });
    }
}

// WhatsApp link - ONLY ONE
function setupWhatsAppLink() {
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            console.log('WhatsApp link clicked');
        });
    }
}

// Update copyright year automatically
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const year = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', year);
}

// Display quote count in console (for debugging)
function displayQuoteCount() {
    const quotes = JSON.parse(localStorage.getItem('vhalaphalaQuotes') || '[]');
    console.log(`📋 Total quote requests received: ${quotes.length}`);
}

// Call this to see quotes in console
displayQuoteCount();

// Console log to confirm loading
console.log('✅ VHALAPHALA ENGINEERING website loaded successfully!');
console.log('⚡ Services available:', services.length);
console.log('📋 Service areas:', serviceAreas.length);
console.log('📁 Projects available:', projects.length);