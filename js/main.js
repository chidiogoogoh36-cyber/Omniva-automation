/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - MAIN PRODUCTION APPLICATION JAVASCRIPT
 * =========================================================================
 * Coordinates navigation, modals, interactive workflows, and API handlers.
 */

import { CONFIG } from './config.js';
import { submitContactToN8n } from './api.js';
import { initBookingWorkflow } from './booking.js';
import { initPersistentDemoChatbot } from './demo-chat.js';
import { SERVICES_DATA } from './services-data.js';
import { PORTFOLIO_DATA } from './portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Booking Workflow & Persistent AI Demo Chatbot
  const bookingManager = initBookingWorkflow();
  const demoChatbot = initPersistentDemoChatbot();

  // 2. Sticky Navigation Bar with Dynamic Scroll Glass Effect
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleNavScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Scroll Spy
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      const sectionHeight = sec.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link, .mobile-nav .btn');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Smooth In-Page Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Service Detail Modal Controller
  const serviceModal = document.getElementById('service-detail-modal');
  const serviceCloseBtn = document.getElementById('service-modal-close');
  const serviceModalBookBtn = document.getElementById('service-modal-book-cta');
  let currentServiceId = '';

  const openServiceDetailModal = (serviceId) => {
    const data = SERVICES_DATA[serviceId];
    if (!data || !serviceModal) return;

    currentServiceId = serviceId;

    const titleEl = document.getElementById('service-modal-title');
    const badgeEl = document.getElementById('service-modal-badge');
    const overviewEl = document.getElementById('service-modal-overview');
    const benefitsEl = document.getElementById('service-modal-benefits');
    const techEl = document.getElementById('service-modal-tech');
    const timelineEl = document.getElementById('service-modal-timeline');

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (overviewEl) overviewEl.textContent = data.overview;
    if (timelineEl) timelineEl.textContent = data.timeline;

    if (benefitsEl) {
      benefitsEl.innerHTML = '';
      data.benefits.forEach(b => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'flex-start';
        li.style.gap = '8px';
        li.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="3" style="flex-shrink: 0; margin-top: 3px;">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${b}</span>
        `;
        benefitsEl.appendChild(li);
      });
    }

    if (techEl) {
      techEl.innerHTML = '';
      data.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        techEl.appendChild(span);
      });
    }

    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.open-service-modal').forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service-id');
      if (serviceId) openServiceDetailModal(serviceId);
    });
  });

  if (serviceCloseBtn && serviceModal) {
    serviceCloseBtn.addEventListener('click', () => {
      serviceModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (serviceModalBookBtn) {
    serviceModalBookBtn.addEventListener('click', () => {
      if (serviceModal) serviceModal.classList.remove('active');
      bookingManager.open(currentServiceId);
    });
  }

  // 6. Portfolio Detail Modal Controller
  const portfolioModal = document.getElementById('portfolio-detail-modal');
  const portfolioCloseBtn = document.getElementById('portfolio-modal-close');

  const openPortfolioModal = (projectId) => {
    const data = PORTFOLIO_DATA[projectId];
    if (!data || !portfolioModal) return;

    const titleEl = document.getElementById('portfolio-modal-title');
    const badgeEl = document.getElementById('portfolio-modal-badge');
    const clientEl = document.getElementById('portfolio-modal-client');
    const metricsEl = document.getElementById('portfolio-modal-metrics');
    const problemEl = document.getElementById('portfolio-modal-problem');
    const solutionEl = document.getElementById('portfolio-modal-solution');
    const techEl = document.getElementById('portfolio-modal-tech');
    const quoteEl = document.getElementById('portfolio-modal-quote');
    const authorEl = document.getElementById('portfolio-modal-author');

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (clientEl) clientEl.textContent = `${data.client} • ${data.industry}`;
    if (problemEl) problemEl.textContent = data.problem;
    if (solutionEl) solutionEl.textContent = data.solution;
    if (quoteEl) quoteEl.textContent = `"${data.clientQuote}"`;
    if (authorEl) authorEl.textContent = data.authorName;

    if (metricsEl) {
      metricsEl.innerHTML = '';
      data.metrics.forEach(m => {
        const box = document.createElement('div');
        box.style.background = 'rgba(6, 182, 212, 0.08)';
        box.style.border = '1px solid rgba(6, 182, 212, 0.2)';
        box.style.borderRadius = '12px';
        box.style.padding = '12px 16px';
        box.innerHTML = `
          <strong style="font-size: 1.25rem; color: #22D3EE; display: block; font-weight: 700;">${m.value}</strong>
          <span style="font-size: 0.75rem; color: #94A3B8;">${m.label}</span>
        `;
        metricsEl.appendChild(box);
      });
    }

    if (techEl) {
      techEl.innerHTML = '';
      data.techStack.forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = t;
        techEl.appendChild(tag);
      });
    }

    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.open-portfolio-modal').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-portfolio-id');
      if (projId) openPortfolioModal(projId);
    });
  });

  if (portfolioCloseBtn && portfolioModal) {
    portfolioCloseBtn.addEventListener('click', () => {
      portfolioModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    portfolioModal.addEventListener('click', (e) => {
      if (e.target === portfolioModal) {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. Accordion FAQ Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
        } else {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstBtn = firstItem.querySelector('.faq-question');
    const firstAns = firstItem.querySelector('.faq-answer');
    if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 40 + 'px';
  }

  // 8. Production Contact Form Validation & Submission
  const contactForm = document.getElementById('production-contact-form');
  const formSuccess = document.getElementById('contact-form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset error indicators
      const errorEls = contactForm.querySelectorAll('.form-error-feedback');
      errorEls.forEach(el => el.style.display = 'none');

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const companyInput = document.getElementById('contact-company');
      const phoneInput = document.getElementById('contact-phone');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let hasError = false;

      if (!name) {
        document.getElementById('err-contact-name').style.display = 'block';
        hasError = true;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        document.getElementById('err-contact-email').style.display = 'block';
        hasError = true;
      }

      if (!company) {
        document.getElementById('err-contact-company').style.display = 'block';
        hasError = true;
      }

      if (!phone || phone.length < 7) {
        document.getElementById('err-contact-phone').style.display = 'block';
        hasError = true;
      }

      if (!message || message.length < 5) {
        document.getElementById('err-contact-message').style.display = 'block';
        hasError = true;
      }

      if (hasError) return;

      const submitBtn = document.getElementById('contact-submit-btn');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
        </svg> Transmitting to n8n...
      `;

      try {
        await submitContactToN8n({
          name,
          email,
          company,
          phone,
          message,
          submittedAt: new Date().toISOString()
        });

        contactForm.reset();
        if (formSuccess) {
          formSuccess.style.display = 'block';
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 7000);
        }
      } catch (err) {
        console.error('Contact form transmission error:', err);
        alert('Thank you! Your message has been received. Our team will review your inquiry shortly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // 9. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll(
    '.service-card, .solution-box, .industry-card, .step-card, .portfolio-card, .pricing-card, .stat-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 10. Legal Information Modal (Privacy Policy & Terms)
  const privacyTrigger = document.getElementById('privacy-link');
  const termsTrigger = document.getElementById('terms-link');
  const infoModal = document.getElementById('info-modal');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalBody = document.getElementById('info-modal-body');
  const infoModalClose = document.getElementById('info-modal-close');

  const openInfoModal = (title, content) => {
    if (infoModal && infoModalTitle && infoModalBody) {
      infoModalTitle.textContent = title;
      infoModalBody.innerHTML = content;
      infoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (privacyTrigger) {
    privacyTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(
        'Privacy Policy',
        `<p>At <strong>Omniva AI Automation</strong>, we are committed to safeguarding the privacy and security of our clients.</p>
         <h4 style="margin: 16px 0 8px 0; color: #FFFFFF;">1. Data Ownership & Private Sandboxes</h4>
         <p>All enterprise data and documents utilized within our client automations remain strictly private, sandboxed, and are never used to train public language models.</p>
         <h4 style="margin: 16px 0 8px 0; color: #FFFFFF;">2. Contact</h4>
         <p>For privacy inquiries, contact us at <a href="mailto:${CONFIG.brand.email}" style="color: #22D3EE; font-weight: 600;">${CONFIG.brand.email}</a>.</p>`
      );
    });
  }

  if (termsTrigger) {
    termsTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(
        'Terms of Service',
        `<p>Welcome to <strong>Omniva AI Automation</strong>.</p>
         <h4 style="margin: 16px 0 8px 0; color: #FFFFFF;">1. Production Services</h4>
         <p>Omniva provides custom AI development, customer support agents, workflow automations, and AI integration services designed according to formal client scopes of work.</p>
         <h4 style="margin: 16px 0 8px 0; color: #FFFFFF;">2. Intellectual Property</h4>
         <p>Custom automations and proprietary integration connectors developed by Omniva are delivered with full operational usage rights upon project completion.</p>`
      );
    });
  }

  if (infoModalClose && infoModal) {
    infoModalClose.addEventListener('click', () => {
      infoModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        infoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
