/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - INTERACTIVE BOOKING WORKFLOW CONTROLLER
 * =========================================================================
 * Manages the consultation booking modal, step validation, and n8n submission.
 */

import { submitBookingToN8n } from './api.js';
import { CONFIG } from './config.js';

class BookingWorkflowManager {
  constructor() {
    this.modal = document.getElementById('booking-modal');
    this.form = document.getElementById('booking-form');
    this.closeBtn = document.getElementById('booking-close-btn');
    this.steps = document.querySelectorAll('.booking-step');
    this.progressIndicators = document.querySelectorAll('.booking-step-dot');
    this.currentStep = 1;
    this.totalSteps = 3;

    // Booking Data State
    this.formData = {
      service: '',
      preferredDate: '',
      preferredTime: '',
      fullName: '',
      email: '',
      company: '',
      phone: '',
      notes: ''
    };

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Attach trigger to all "Book Free Consultation" buttons
    this.attachTriggerButtons();

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) this.close();
    });

    // Step Navigation Buttons
    this.initStepNavigation();

    // Service Option Selection
    this.initServiceSelectors();

    // Time Slot Selection
    this.initTimeSlotSelectors();

    // Form Submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleBookingSubmit(e));
    }

    // Set default date to tomorrow in date input
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
      this.formData.preferredDate = dateInput.value;
    }
  }

  attachTriggerButtons() {
    const triggerButtons = document.querySelectorAll(
      '.btn-book-consultation, .open-booking-modal, [data-open-booking]'
    );

    triggerButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preselectedService = btn.getAttribute('data-service') || '';
        this.open(preselectedService);
      });
    });
  }

  open(preselectedService = '') {
    if (!this.modal) return;
    this.resetForm();

    if (preselectedService) {
      this.selectServiceById(preselectedService);
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.goToStep(1);
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('active');
  }

  initServiceSelectors() {
    const serviceOptions = document.querySelectorAll('.booking-service-card');
    serviceOptions.forEach(option => {
      option.addEventListener('click', () => {
        serviceOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        this.formData.service = option.getAttribute('data-value') || '';
        this.clearErrors();
      });
    });
  }

  selectServiceById(serviceId) {
    const targetOption = document.querySelector(`.booking-service-card[data-value="${serviceId}"]`);
    if (targetOption) {
      const all = document.querySelectorAll('.booking-service-card');
      all.forEach(o => o.classList.remove('selected'));
      targetOption.classList.add('selected');
      this.formData.service = serviceId;
    }
  }

  initTimeSlotSelectors() {
    const timePills = document.querySelectorAll('.time-slot-pill');
    timePills.forEach(pill => {
      pill.addEventListener('click', () => {
        timePills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.formData.preferredTime = pill.getAttribute('data-time') || pill.textContent.trim();
        this.clearErrors();
      });
    });

    // Default select first slot
    if (timePills.length > 0) {
      timePills[0].classList.add('selected');
      this.formData.preferredTime = timePills[0].getAttribute('data-time') || timePills[0].textContent.trim();
    }
  }

  initStepNavigation() {
    const nextButtons = document.querySelectorAll('.btn-booking-next');
    const prevButtons = document.querySelectorAll('.btn-booking-prev');

    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.validateCurrentStep()) {
          this.goToStep(this.currentStep + 1);
        }
      });
    });

    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.goToStep(this.currentStep - 1);
      });
    });
  }

  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps + 1) return;
    this.currentStep = stepNumber;

    this.steps.forEach(step => {
      const stepIdx = parseInt(step.getAttribute('data-step'), 10);
      if (stepIdx === this.currentStep) {
        step.style.display = 'block';
      } else {
        step.style.display = 'none';
      }
    });

    // Update Dots
    this.progressIndicators.forEach(dot => {
      const dotIdx = parseInt(dot.getAttribute('data-step'), 10);
      if (dotIdx === this.currentStep) {
        dot.classList.add('active');
        dot.classList.remove('completed');
      } else if (dotIdx < this.currentStep) {
        dot.classList.add('completed');
        dot.classList.remove('active');
      } else {
        dot.classList.remove('active', 'completed');
      }
    });

    // Scroll modal body to top on step change
    const modalBody = this.modal.querySelector('.booking-modal-body');
    if (modalBody) modalBody.scrollTop = 0;
  }

  validateCurrentStep() {
    this.clearErrors();

    if (this.currentStep === 1) {
      if (!this.formData.service) {
        this.showError('step-1-error', 'Please select a solution or automation focus.');
        return false;
      }
      return true;
    }

    if (this.currentStep === 2) {
      const dateInput = document.getElementById('booking-date');
      if (dateInput && !dateInput.value) {
        this.showError('step-2-error', 'Please pick a preferred date.');
        return false;
      }
      if (dateInput) this.formData.preferredDate = dateInput.value;

      if (!this.formData.preferredTime) {
        this.showError('step-2-error', 'Please choose a preferred consultation time slot.');
        return false;
      }
      return true;
    }

    return true;
  }

  showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  clearErrors() {
    const errors = document.querySelectorAll('.booking-step-error');
    errors.forEach(e => {
      e.textContent = '';
      e.style.display = 'none';
    });
  }

  async handleBookingSubmit(e) {
    e.preventDefault();
    this.clearErrors();

    // Read contact details
    const nameInput = document.getElementById('booking-name');
    const emailInput = document.getElementById('booking-email');
    const companyInput = document.getElementById('booking-company');
    const phoneInput = document.getElementById('booking-phone');
    const notesInput = document.getElementById('booking-notes');

    const fullName = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    // Validate Required Contact Fields
    if (!fullName) {
      this.showError('step-3-error', 'Please enter your full name.');
      if (nameInput) nameInput.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      this.showError('step-3-error', 'Please enter a valid work email address.');
      if (emailInput) emailInput.focus();
      return;
    }

    if (!company) {
      this.showError('step-3-error', 'Please enter your company or business name.');
      if (companyInput) companyInput.focus();
      return;
    }

    if (!phone || phone.length < 7) {
      this.showError('step-3-error', 'Please enter a valid contact phone number.');
      if (phoneInput) phoneInput.focus();
      return;
    }

    // Build payload
    this.formData.fullName = fullName;
    this.formData.email = email;
    this.formData.company = company;
    this.formData.phone = phone;
    this.formData.notes = notes;
    this.formData.submittedAt = new Date().toISOString();

    // UI Loading State
    const submitBtn = document.getElementById('booking-submit-btn');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Confirm Booking';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
        </svg> Confirming Appointment...
      `;
    }

    try {
      // Call n8n webhook API connector
      const response = await submitBookingToN8n(this.formData);

      // Render Confirmation Step (Step 4)
      this.renderConfirmationView(response);
      this.goToStep(4);
    } catch (error) {
      console.error('Booking submission error:', error);
      this.showError('step-3-error', 'Unable to reach the scheduling server. Please contact us directly on WhatsApp.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  renderConfirmationView(response) {
    const summaryService = document.getElementById('confirm-service');
    const summaryDateTime = document.getElementById('confirm-datetime');
    const summaryContact = document.getElementById('confirm-contact');
    const refCode = document.getElementById('confirm-ref-code');

    if (summaryService) summaryService.textContent = this.formData.service.toUpperCase();
    if (summaryDateTime) summaryDateTime.textContent = `${this.formData.preferredDate} at ${this.formData.preferredTime}`;
    if (summaryContact) summaryContact.textContent = `${this.formData.fullName} (${this.formData.email})`;
    if (refCode) {
      refCode.textContent = response.bookingId || ('OMNIVA-' + Math.random().toString(36).substring(2, 7).toUpperCase());
    }
  }

  resetForm() {
    if (this.form) this.form.reset();
    this.clearErrors();
    this.formData = {
      service: '',
      preferredDate: '',
      preferredTime: '',
      fullName: '',
      email: '',
      company: '',
      phone: '',
      notes: ''
    };

    const serviceOptions = document.querySelectorAll('.booking-service-card');
    serviceOptions.forEach(o => o.classList.remove('selected'));
  }
}

export function initBookingWorkflow() {
  return new BookingWorkflowManager();
}

if (typeof window !== 'undefined') {
  window.BookingWorkflowManager = BookingWorkflowManager;
  window.initBookingWorkflow = initBookingWorkflow;
}
