// ============================================
// Language Management
// ============================================

// Translations object
const translations = {
    en: {
        // Placeholders
        trackingPlaceholder: "Ex: DOC-2024-12345",
        namePlaceholder: "Your name",
        emailPlaceholder: "Your email",
        messagePlaceholder: "Your message",
        additionalInfoPlaceholder: "Any additional information that could help us process your request faster...",
    },
    fr: {
        // Placeholders
        trackingPlaceholder: "Ex: DOC-2024-12345",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "Votre email",
        messagePlaceholder: "Votre message",
        additionalInfoPlaceholder: "Toute information supplémentaire qui pourrait nous aider à traiter votre demande plus rapidement...",
    },
    ar: {
        // Placeholders
        trackingPlaceholder: "مثال: DOC-2024-12345",
        namePlaceholder: "اسمك",
        emailPlaceholder: "بريدك الإلكتروني",
        messagePlaceholder: "رسالتك",
        additionalInfoPlaceholder: "أي معلومات إضافية قد تساعدنا في معالجة طلبك بشكل أسرع...",
    },
    ber: {
        // Placeholders
        trackingPlaceholder: "ⴰⵎⴷⵢⴰ: DOC-2024-12345",
        namePlaceholder: "ⵉⵙⵎ ⵏⵏⴽ",
        emailPlaceholder: "ⵉⵎⴰⵢⵍ ⵏⵏⴽ",
        messagePlaceholder: "ⵜⵓⵣⵉⵏⵜ ⵏⵏⴽ",
        additionalInfoPlaceholder: "ⴽⵓⵍⵛⵉ ⵉⵏⵖⵎⵉⵙⴰ ⵉⵙⴰⵔⴰⴳⵏ ⴰⴷ ⴰⵖ ⵉⵙⴰⵡⴰⵙⵏ ⵉ ⵓⵙⵡⵓⵔⵉ ⵏ ⵓⵙⵓⵜⵔ ⵏⵏⴽ ⵙ ⵓⵔⵣⵣⵓ...",
    }
};

// Current language
let currentLang = 'en';

// Switch Language Function
function switchLanguage(lang) {
    currentLang = lang;
    const body = document.body;
    
    // Remove all language classes
    body.classList.remove('lang-en', 'lang-fr', 'lang-ar', 'lang-ber');
    
    // Update body class and direction
    if (lang === 'ar') {
        body.classList.add('lang-ar');
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
    } else if (lang === 'ber') {
        body.classList.add('lang-ber');
        document.documentElement.setAttribute('lang', 'ber');
        document.documentElement.setAttribute('dir', 'ltr');
    } else {
        body.classList.add(`lang-${lang}`);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Update current language display
    const currentLangSpan = document.querySelector('.current-lang');
    if (currentLangSpan) {
        if (lang === 'ber') {
            currentLangSpan.textContent = 'ⵣ';
        } else {
            currentLangSpan.textContent = lang.toUpperCase();
        }
    }
    
    // Update all translatable elements
    updateTranslations(lang);
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Hide dropdown after selection
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    console.log(`Language switched to: ${lang}`);
}

// Update all text content based on language
function updateTranslations(lang) {
    // Handle elements with all 4 language attributes
    const elementsAll = document.querySelectorAll('[data-en][data-fr][data-ar][data-ber]');
    elementsAll.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else if (element.tagName === 'TITLE') {
                document.title = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
    
    // Handle elements with only 3 languages (legacy support)
    const elementsThree = document.querySelectorAll('[data-en][data-fr][data-ar]:not([data-ber])');
    elementsThree.forEach(element => {
        // For Tamazight, fall back to English if Tamazight not available
        const text = element.getAttribute(`data-${lang}`) || element.getAttribute('data-en');
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
    
    // Update placeholders
    updatePlaceholders(lang);
    
    console.log(`Translations updated for: ${lang}`);
}

// Update input placeholders
function updatePlaceholders(lang) {
    const trackingInput = document.getElementById('trackingNumber');
    if (trackingInput) {
        trackingInput.placeholder = translations[lang].trackingPlaceholder;
    }
    
    const additionalInfo = document.getElementById('additionalInfo');
    if (additionalInfo) {
        additionalInfo.placeholder = translations[lang].additionalInfoPlaceholder;
    }
    
    // Contact form placeholders
    const contactInputs = document.querySelectorAll('[data-placeholder-en][data-placeholder-fr][data-placeholder-ar], [data-placeholder-en][data-placeholder-fr][data-placeholder-ar][data-placeholder-ber]');
    contactInputs.forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
}

// ============================================
// Navigation Menu Toggle (Mobile)
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// Document Request Form
// ============================================
const documentForm = document.getElementById('documentForm');

if (documentForm) {
    documentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            documentType: document.getElementById('documentType').value,
            copies: document.getElementById('copies').value,
            fullName: document.getElementById('fullName').value,
            birthDate: document.getElementById('birthDate').value,
            birthPlace: document.getElementById('birthPlace').value,
            fatherName: document.getElementById('fatherName').value,
            motherName: document.getElementById('motherName').value,
            cinNumber: document.getElementById('cinNumber').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            additionalInfo: document.getElementById('additionalInfo').value,
            language: currentLang,
            submittedAt: new Date().toISOString()
        };
        
        // Generate reference number
        const referenceNumber = generateReferenceNumber();
        
        // Show success message
        showSuccessMessage(referenceNumber);
        
        // Reset form
        documentForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
    });
}

// Generate a reference number
function generateReferenceNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000) + 10000;
    return `DOC-${year}-${random}`;
}

// Show success message
function showSuccessMessage(referenceNumber) {
    const messages = {
        en: `
            <div class="success-message">
                <h3>✓ Request submitted successfully!</h3>
                <p><strong>Reference number:</strong> ${referenceNumber}</p>
                <p>We have received your request. You will receive a confirmation email within a few minutes.</p>
                <p>You can track your request status using your reference number in the "Track" section.</p>
            </div>
        `,
        fr: `
            <div class="success-message">
                <h3>✓ Demande soumise avec succès !</h3>
                <p><strong>Numéro de référence :</strong> ${referenceNumber}</p>
                <p>Nous avons bien reçu votre demande. Vous recevrez un email de confirmation dans quelques minutes.</p>
                <p>Vous pouvez suivre l'état de votre demande en utilisant votre numéro de référence dans la section "Suivi".</p>
            </div>
        `,
        ar: `
            <div class="success-message">
                <h3>✓ تم إرسال الطلب بنجاح!</h3>
                <p><strong>رقم المرجع:</strong> ${referenceNumber}</p>
                <p>لقد استلمنا طلبك. ستتلقى بريدًا إلكترونيًا للتأكيد في غضون دقائق.</p>
                <p>يمكنك تتبع حالة طلبك باستخدام رقم المرجع الخاص بك في قسم "التتبع".</p>
            </div>
        `,
        ber: `
            <div class="success-message">
                <h3>✓ ⵉⵜⵜⵓⵙⵎⵓⵜⵜⴰ ⵓⵙⵓⵜⵔ ⵙ ⵓⵎⵓⵔⵙ!</h3>
                <p><strong>ⴰⵎⴹⴰⵏ ⵏ ⵓⵙⵏⵎⴰⵍ:</strong> ${referenceNumber}</p>
                <p>ⵏⵙⵎⵓⵜⵜⴰ ⴰⵙⵓⵜⵔ ⵏⵏⴽ. ⴰⴷ ⵜⴰⵡⵉⴹ ⵉⵎⴰⵢⵍ ⵏ ⵓⵙⴳⴳⵓⴷⵓ ⴳ ⴽⵔⴰ ⵏ ⵜⵙⴷⴰⴷⵉⵏ.</p>
                <p>ⵜⵣⵎⵔⴷ ⴰⴷ ⵜⴹⴼⵕⴷ ⴰⴷⴷⴰⴷ ⵏ ⵓⵙⵓⵜⵔ ⵏⵏⴽ ⵙ ⵓⵙⵎⵔⵙ ⵏ ⵓⵎⴹⴰⵏ ⵏⵏⴽ ⴳ ⵜⴰⵙⵇⵇⵉⵎⵜ "ⴰⴹⴼⵓⵕ".</p>
            </div>
        `
    };
    
    const container = document.querySelector('.request-form .container');
    const existingMessage = container.querySelector('.success-message, .error-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = messages[currentLang];
    container.insertBefore(messageDiv.firstElementChild, container.firstElementChild);
    
    // Remove message after 10 seconds
    setTimeout(() => {
        const msg = container.querySelector('.success-message');
        if (msg) {
            msg.style.transition = 'opacity 0.5s';
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        }
    }, 10000);
}

// ============================================
// Track Order
// ============================================
function trackOrder() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const resultDiv = document.getElementById('trackingResult');
    
    if (!trackingNumber) {
        showTrackingError();
        return;
    }
    
    // Simulate tracking data (in real app, fetch from server)
    const trackingData = {
        referenceNumber: trackingNumber,
        status: 'in-progress',
        timeline: [
            {
                status: 'submitted',
                date: '2024-10-25',
                time: '10:30',
                completed: true,
                titleEn: 'Request Received',
                titleFr: 'Demande reçue',
                titleAr: 'تم استلام الطلب',
                titleBer: 'ⵉⵜⵜⵓⵙⵎⵓⵜⵜⴰ ⵓⵙⵓⵜⵔ',
                descEn: 'Your request has been registered in our system',
                descFr: 'Votre demande a été enregistrée dans notre système',
                descAr: 'تم تسجيل طلبك في نظامنا',
                descBer: 'ⵉⵜⵜⵓⵙⴽⵍⵙ ⵓⵙⵓⵜⵔ ⵏⵏⴽ ⴳ ⵓⵏⴳⵔⴰⵡ ⵏⵏⵖ'
            },
            {
                status: 'verified',
                date: '2024-10-26',
                time: '14:20',
                completed: true,
                titleEn: 'Documents Verified',
                titleFr: 'Documents vérifiés',
                titleAr: 'تم التحقق من المستندات',
                titleBer: 'ⵜⵜⵓⵙⴳⴳⵓⴷⴰⵏⵜ ⵜⴰⵙⵏⴰⵡⵉⵏ',
                descEn: 'All your documents have been verified and validated',
                descFr: 'Tous vos documents ont été vérifiés et validés',
                descAr: 'تم التحقق من جميع مستنداتك والموافقة عليها',
                descBer: 'ⵎⴰⵕⵕⴰ ⵜⴰⵙⵏⴰⵡⵉⵏ ⵏⵏⴽ ⵜⵜⵓⵙⴳⴳⵓⴷⴰⵏⵜ'
            },
            {
                status: 'processing',
                date: '2024-10-27',
                time: '09:15',
                completed: true,
                titleEn: 'Processing',
                titleFr: 'En cours de traitement',
                titleAr: 'قيد المعالجة',
                titleBer: 'ⴰⵔ ⵉⵜⵜⵡⴰⵙⵡⵓⵔⵉ',
                descEn: 'We are in contact with the relevant authorities',
                descFr: 'Nous sommes en contact avec les autorités compétentes',
                descAr: 'نحن على اتصال مع السلطات المختصة',
                descBer: 'ⵏⵍⵍⴰ ⴳ ⵓⵎⵢⴰⵡⴰⴹ ⴷ ⵜⵏⴱⴰⴹⵉⵏ'
            },
            {
                status: 'ready',
                date: '',
                time: '',
                completed: false,
                titleEn: 'Document Ready',
                titleFr: 'Document prêt',
                titleAr: 'الوثيقة جاهزة',
                titleBer: 'ⴰⵙⵏⵓⴱⴳ ⵉⵃⵎⴰ',
                descEn: 'Waiting for document reception',
                descFr: 'En attente de réception du document',
                descAr: 'في انتظار استلام الوثيقة',
                descBer: 'ⴰⵔ ⵏⵜⵜⵔⴰⵊⵓ ⴰⵙⵎⵓⵜⵜⵉ ⵏ ⵓⵙⵏⵓⴱⴳ'
            }
        ]
    };
    
    displayTrackingResult(trackingData);
}

// Display tracking result
function displayTrackingResult(data) {
    const resultDiv = document.getElementById('trackingResult');
    const lang = currentLang;
    
    let timelineHTML = '<div class="status-timeline">';
    
    data.timeline.forEach(item => {
        const completedClass = item.completed ? 'completed' : '';
        let title, desc;
        
        if (lang === 'en') {
            title = item.titleEn;
            desc = item.descEn;
        } else if (lang === 'fr') {
            title = item.titleFr;
            desc = item.descFr;
        } else if (lang === 'ar') {
            title = item.titleAr;
            desc = item.descAr;
        } else if (lang === 'ber') {
            title = item.titleBer || item.titleEn;
            desc = item.descBer || item.descEn;
        }
        
        const dateTime = item.completed ? `${item.date} ${item.time}` : '';
        
        timelineHTML += `
            <div class="status-item ${completedClass}">
                <h4>${title}</h4>
                <p>${desc}</p>
                ${dateTime ? `<small style="color: #999; margin-top: 5px; display: block;">${dateTime}</small>` : ''}
            </div>
        `;
    });
    
    timelineHTML += '</div>';
    
    let headerText;
    if (lang === 'en') {
        headerText = `<h3>Tracking request: ${data.referenceNumber}</h3>`;
    } else if (lang === 'fr') {
        headerText = `<h3>Suivi de la demande : ${data.referenceNumber}</h3>`;
    } else if (lang === 'ar') {
        headerText = `<h3>تتبع الطلب: ${data.referenceNumber}</h3>`;
    } else if (lang === 'ber') {
        headerText = `<h3>ⴰⴹⴼⵓⵕ ⵏ ⵓⵙⵓⵜⵔ: ${data.referenceNumber}</h3>`;
    }
    
    resultDiv.innerHTML = headerText + timelineHTML;
    resultDiv.classList.add('active');
}

// Show tracking error
function showTrackingError() {
    const resultDiv = document.getElementById('trackingResult');
    const messages = {
        en: '<div class="error-message">Please enter a valid reference number.</div>',
        fr: '<div class="error-message">Veuillez entrer un numéro de référence valide.</div>',
        ar: '<div class="error-message">الرجاء إدخال رقم مرجع صالح.</div>',
        ber: '<div class="error-message">ⵎⴽ ⵜⵓⵜⵜⵔⴷ ⵙⵙⴽⵛⵎ ⴰⵎⴹⴰⵏ ⵏ ⵓⵙⵏⵎⴰⵍ ⵉⵎⴳⵉⵏ.</div>'
    };
    
    resultDiv.innerHTML = messages[currentLang];
    resultDiv.classList.add('active');
    
    setTimeout(() => {
        resultDiv.classList.remove('active');
    }, 3000);
}

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const messages = {
            en: 'Thank you for your message! We will respond as soon as possible.',
            fr: 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.',
            ar: 'شكرا لرسالتك! سنرد عليك في أقرب وقت ممكن.',
            ber: 'ⵜⴰⵏⵎⵎⵉⵔⵜ ⵖⴼ ⵜⵓⵣⵉⵏⵜ ⵏⵏⴽ! ⴰⴷ ⵏⵔⴰⵔ ⵙ ⵓⵔⵣⵣⵓ.'
        };
        
        alert(messages[currentLang]);
        contactForm.reset();
    });
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Effects
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Form Validation Enhancement
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation
if (documentForm) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '';
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLang);
    
    // Language button click handler (for mobile)
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('show');
            }
        });
    }
    
    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .step').forEach(el => {
        observer.observe(el);
    });
    
    console.log('Website initialized successfully');
});

// ============================================
// Service Links
// ============================================
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the document type from the card
        const card = link.closest('.service-card');
        const heading = card.querySelector('h3').textContent;
        
        // Map heading to document type value
        const typeMap = {
            'Birth Certificate': 'birth',
            'Acte de Naissance': 'birth',
            'شهادة الميلاد': 'birth',
            'ⴰⵙⵏⵓⴱⴳ ⵏ ⵜⵍⴰⵍⵉⵜ': 'birth',
            'Marriage Certificate': 'marriage',
            'Acte de Mariage': 'marriage',
            'عقد الزواج': 'marriage',
            'ⴰⵙⵏⵓⴱⴳ ⵏ ⵜⵉⵙⵙⵉ': 'marriage',
            'Death Certificate': 'death',
            'Acte de Décès': 'death',
            'شهادة الوفاة': 'death',
            'ⴰⵙⵏⵓⴱⴳ ⵏ ⵜⴰⵎⵜⵜⴰⵏⵜ': 'death',
            'Family Record Book': 'family',
            'Livret de Famille': 'family',
            'دفتر العائلة': 'family',
            'ⴰⴷⵍⵉⵙ ⵏ ⵜⴰⵡⴰⵛⵓⵍⵜ': 'family'
        };
        
        const documentType = typeMap[heading];
        
        // Navigate to form
        document.querySelector('#request').scrollIntoView({ behavior: 'smooth' });
        
        // Set the document type after a short delay
        setTimeout(() => {
            const select = document.getElementById('documentType');
            if (select && documentType) {
                select.value = documentType;
                select.focus();
            }
        }, 800);
    });
});

// ============================================
// Dynamic Year in Footer
// ============================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', new Date().getFullYear());
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🇲🇦 Morocco Docs', 'color: #c1272d; font-size: 24px; font-weight: bold;');
console.log('%cProfessional service for your Moroccan civil documents', 'color: #006233; font-size: 14px;');
console.log('%cService professionnel pour vos documents civils marocains', 'color: #006233; font-size: 14px;');
console.log('%cخدمة احترافية لوثائقك المدنية المغربية', 'color: #006233; font-size: 14px; direction: rtl;');
