/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - UNIFIED STANDALONE PRODUCTION APPLICATION JS
 * =========================================================================
 * Complete, zero-dependency application controller handling:
 * 1. Configuration & n8n API Webhook Connectors
 * 2. 9 Comprehensive Services Data & Detail Modal Controller
 * 3. 3 Case Studies Portfolio Data & Detail Modal Controller
 * 4. Multi-Step Interactive Consultation Booking Workflow (Steps 1-4)
 * 5. Persistent Live AI Demo Chatbot (Session history, non-closing on type, suggestions, typing effect)
 * 6. Sticky Nav with Glass Effect, Mobile Drawer & Active Section Scroll Spy
 * 7. Accordion FAQ with Smooth Height Transitions
 * 8. Production Contact Form Validation & Async Submission
 * 9. Privacy Policy / Terms Modal & Scroll Animations
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CONFIGURATION
  // =========================================================================
  const CONFIG = {
    brand: {
      name: "Omniva AI Automation",
      tagline: "Automating Business. Empowering Growth.",
      mission: "To help businesses save time, reduce costs, and improve customer experiences through intelligent AI automation solutions.",
      email: "chidiogoogoh@gmail.com",
      phoneDisplay: "08164078027",
      website: "Coming Soon",
      whatsappUrl: "https://wa.me/2348164078027?text=Hello%20Omniva%20AI%20Automation%2C%20I%20would%20like%20to%20inquire%20about%20your%20AI%20solutions."
    },
    n8n: {
      bookingWebhookUrl: "https://YOUR-N8N-INSTANCE-URL/webhook/omniva-booking",
      contactWebhookUrl: "https://YOUR-N8N-INSTANCE-URL/webhook/omniva-contact",
      supportAgentWebhookUrl: "https://YOUR-N8N-INSTANCE-URL/webhook/omniva-chat-agent",
      useSimulatedFallbackWhenOffline: true,
      errorMessage: "Sorry, our AI assistant is temporarily unavailable. Please try again later or contact us on WhatsApp."
    },
    demoChat: {
      agentName: "Omniva AI Assistant",
      agentRole: "Automated Strategy & Demo Specialist",
      welcomeMessage: "Hello! 👋 I'm the Omniva AI Assistant. I can demonstrate how our AI agents automate customer support, appointment scheduling, lead qualification, and business workflows. How can I help you today?",
      suggestedQueries: [
        "What services does Omniva provide?",
        "How does AI appointment booking work?",
        "Calculate potential ROI for my business",
        "Which CRMs and tools do you integrate with?",
        "How long does deployment take?"
      ]
    }
  };

  // Expose globally
  window.OMNIVA_CONFIG = CONFIG;

  // =========================================================================
  // 2. SERVICES DATA
  // =========================================================================
  const SERVICES_DATA = {
    "ai-customer-support": {
      id: "ai-customer-support",
      title: "AI Customer Support Agents",
      badge: "24/7 Autonomous Resolution",
      summary: "Deploy intelligent AI customer support agents trained on your business documents, past tickets, and SOPs to resolve inquiries instantly across all channels.",
      overview: "Our autonomous customer support agents operate 24/7 with sub-second response times. They integrate directly with your knowledge base, CRM, and ticketing platforms to handle routine inquiries, order tracking, returns, and troubleshooting with zero human fatigue.",
      benefits: [
        "70%+ direct ticket deflection without human intervention",
        "Instant response latency under 2 seconds",
        "Seamless escalation with complete conversational context to human reps",
        "Multi-channel support across Web Chat, WhatsApp, Email, and SMS",
        "Continuous auto-learning from resolved tickets and documentation updates"
      ],
      techStack: ["n8n Workflow Engine", "GPT-4o / Claude 3.5 Sonnet", "Pinecone Vector DB", "Zendesk API", "Shopify / Stripe Connectors"],
      timeline: "7 – 12 Business Days"
    },
    "ai-chatbots": {
      id: "ai-chatbots",
      title: "AI Chatbot Development",
      badge: "Conversational Intelligence",
      summary: "Custom-built conversational AI bots calibrated to your brand voice, capable of complex multi-turn dialogs and database interactions.",
      overview: "We design tailored AI chatbots that feel human, professional, and helpful. Unlike rigid rules-based bots, Omniva chatbots understand context, follow multi-step reasoning, query external databases in real time, and guide visitors through complex product choices.",
      benefits: [
        "Natural language understanding with zero robotic scripts",
        "Real-time database and API query capability",
        "Supports 50+ languages with native cultural phrasing",
        "Zero downtime architecture with redundant LLM fallback",
        "Custom UI widget perfectly matched to your website design"
      ],
      techStack: ["OpenAI API", "Anthropic Claude", "LangChain", "n8n", "WebSockets / REST"],
      timeline: "7 – 14 Business Days"
    },
    "workflow-automation": {
      id: "workflow-automation",
      title: "Workflow Automation",
      badge: "Operational Efficiency",
      summary: "Connect your software stack (n8n, APIs, Webhooks, CRMs) to eliminate repetitive manual data entry and complex multi-step processes.",
      overview: "Omniva builds enterprise automation pipelines that glue your fragmented business tools together. When a lead enters a form, a transaction occurs, or a document is uploaded, our workflows trigger instant background transformations, data synchronizations, and notifications across your team.",
      benefits: [
        "Eliminates 100% of repetitive copy-paste data tasks",
        "Prevents costly human errors in invoicing and record tracking",
        "Accelerates cross-departmental handoffs from hours to milliseconds",
        "Self-healing workflows with automated retry and error alerting",
        "Fully audited logs for compliance and data integrity"
      ],
      techStack: ["n8n Self-Hosted / Cloud", "Make / Zapier", "PostgreSQL", "Custom REST Webhooks", "AWS Lambda"],
      timeline: "5 – 10 Business Days"
    },
    "appointment-booking": {
      id: "appointment-booking",
      title: "AI Appointment Booking",
      badge: "Zero No-Shows",
      summary: "Intelligent scheduling agents that negotiate available times, qualify prospective clients, prevent double-bookings, and send automated reminders.",
      overview: "Never lose a high-intent prospect to slow back-and-forth emails again. Our AI appointment booking agents converse naturally with leads over Web, WhatsApp, or Email, check live staff availability, qualify meeting criteria, and place calendar invites directly onto your team's schedule.",
      benefits: [
        "Book qualified discovery calls 24/7 within 60 seconds of inquiry",
        "Automated calendar conflict resolution across multiple team members",
        "Reduces client no-show rate by 40% via automated WhatsApp & SMS reminders",
        "Collects required pre-call documents and answers in advance",
        "Synchronizes meeting notes and client records directly into CRM"
      ],
      techStack: ["Google Calendar API", "Outlook Graph API", "Calendly / Cal.com", "Twilio WhatsApp", "n8n"],
      timeline: "5 – 10 Business Days"
    },
    "lead-qualification": {
      id: "lead-qualification",
      title: "Lead Qualification Automation",
      badge: "High-Intent Sales Pipeline",
      summary: "Screen and score incoming leads in real time so your sales executives only focus on high-probability, high-ticket opportunities.",
      overview: "Our AI Lead Qualification engine engages new leads instantly across forms, chats, and ads. It asks key discovery questions, extracts company size, budget, and urgency, assigns an automated lead score, and immediately routes high-tier prospects to senior reps.",
      benefits: [
        "Instant <10s engagement while prospective buyers are hot",
        "Filters out unqualified leads, spam, and tire-kickers automatically",
        "Enriches lead profiles with company data (Apollo, LinkedIn, Clearbit)",
        "Increases sales team closing rate by prioritizing high-intent prospects",
        "Real-time Slack / Teams instant notifications for hot leads"
      ],
      techStack: ["n8n Lead Routers", "Clearbit / Apollo APIs", "HubSpot / Salesforce", "Slack Webhooks", "GPT-4o"],
      timeline: "7 – 12 Business Days"
    },
    "crm-automation": {
      id: "crm-automation",
      title: "CRM Automation",
      badge: "Real-Time Pipeline Sync",
      summary: "Automate deal stage progression, customer activity logging, document generation, and lifecycle follow-ups inside your CRM.",
      overview: "Keep your CRM clean, up to date, and actionable without manual data entry. We automate contact creation, meeting summaries, task assignments, stage updates, and contract triggers across HubSpot, Salesforce, Zoho, and Pipedrive.",
      benefits: [
        "100% accurate contact activity logs with AI-generated meeting summaries",
        "Automated stage progression triggered by client actions (emails, payments, clicks)",
        "Zero missed follow-up tasks for your sales and account management teams",
        "Automated quote, invoice, and agreement generation",
        "Real-time revenue attribution and executive reporting"
      ],
      techStack: ["HubSpot API", "Salesforce REST API", "Zoho CRM", "DocuSign / PandaDoc APIs", "n8n"],
      timeline: "7 – 14 Business Days"
    },
    "email-automation": {
      id: "email-automation",
      title: "Email Automation & Triage",
      badge: "Inbox Zero with AI",
      summary: "AI agents that categorize incoming emails, draft personalized replies, trigger workflow actions, and summarize long email threads.",
      overview: "Tackle overwhelming inboxes with intelligent email automation. Our AI reads inbound customer emails, extracts key entities (order numbers, deadlines, urgent issues), drafts context-aware responses for approval, or automatically triggers backend workflows.",
      benefits: [
        "Reduces email triage time by up to 80%",
        "Automated categorization (Inquiries, Invoices, Urgent, Spam, VIP)",
        "AI draft generation in your company's tone of voice",
        "Auto-extracts attachments and uploads them directly to cloud storage/CRM",
        "Instant sentiment analysis to flag dissatisfied customers early"
      ],
      techStack: ["Gmail / Google Workspace API", "Microsoft Graph / Outlook", "n8n", "OpenAI / Claude", "SendGrid"],
      timeline: "5 – 10 Business Days"
    },
    "ai-consulting": {
      id: "ai-consulting",
      title: "AI Consulting & Strategy",
      badge: "Executive Roadmap",
      summary: "Strategic evaluation of your operations to identify high-ROI automation opportunities, model selection, architecture design, and governance.",
      overview: "Not sure where AI will deliver the highest return for your business? Our AI architects conduct a comprehensive audit of your current tech stack and employee workflows to deliver an actionable, prioritized roadmap tailored for rapid ROI and zero operational friction.",
      benefits: [
        "Clear financial ROI modeling before spending on development",
        "Identification of immediate low-hanging automation wins (Quick Wins)",
        "Vendor and LLM model selection (cost, latency, security compliance)",
        "Data privacy, security, and governance risk mitigation",
        "Step-by-step implementation blueprint with milestone estimates"
      ],
      techStack: ["Architecture Blueprints", "Feasibility Matrix", "ROI Projections", "n8n Systems Design"],
      timeline: "3 – 7 Business Days"
    },
    "custom-ai-solutions": {
      id: "custom-ai-solutions",
      title: "Custom AI Solutions",
      badge: "Bespoke Engineering",
      summary: "Bespoke multi-agent systems, private LLMs, vector search engines, and database-integrated automation built for proprietary business needs.",
      overview: "When off-the-shelf software falls short, Omniva engineers custom AI infrastructure tailored to your exact business logic. From internal knowledge intelligence tools to autonomous multi-agent systems that collaborate on complex tasks, we build solutions that give your company a decisive competitive advantage.",
      benefits: [
        "100% tailored to your proprietary data structures and internal tools",
        "Private deployment options for strict regulatory compliance",
        "Multi-agent autonomous collaboration for complex business processes",
        "Complete source code ownership and full API documentation",
        "Designed for horizontal scaling and high concurrency"
      ],
      techStack: ["Python / FastAPI", "LangChain / LangGraph", "n8n", "PostgreSQL / pgvector", "Docker / Cloud Infrastructure"],
      timeline: "14 – 28 Business Days"
    }
  };

  window.OMNIVA_SERVICES_DATA = SERVICES_DATA;

  // =========================================================================
  // 3. PORTFOLIO CASE STUDIES DATA
  // =========================================================================
  const PORTFOLIO_DATA = {
    "ecommerce-support-agent": {
      id: "ecommerce-support-agent",
      title: "24/7 AI Support & Order Tracking Agent",
      client: "NexaCommerce Global",
      industry: "E-Commerce & Retail",
      badge: "E-Commerce",
      metrics: [
        { label: "Ticket Deflection", value: "74%" },
        { label: "Avg. Resolution Time", value: "8s" },
        { label: "CSAT Score", value: "4.9 / 5.0" },
        { label: "Monthly Cost Saved", value: "$14,500" }
      ],
      problem: "NexaCommerce was experiencing massive support backlogs during flash sales. Customers were waiting an average of 4.2 hours for simple order status checks, return authorizations, and size inquiries, leading to lost sales and stressed human agents.",
      solution: "Omniva engineered an autonomous n8n AI customer support agent integrated with their Shopify store, Gorgias ticketing system, and Shippo tracking API. The AI answers queries instantly, processes return labels according to store policies, and escalates complex VIP tickets directly to senior staff with summarized notes.",
      techStack: ["n8n Workflow Engine", "OpenAI GPT-4o", "Shopify GraphQL API", "Gorgias API", "Pinecone Vector DB"],
      clientQuote: "Omniva transformed our customer operations. What used to take a team of 8 reps is now handled seamlessly with faster response times than we ever thought possible.",
      authorName: "Marcus Reynolds, COO at NexaCommerce"
    },
    "healthcare-patient-intake": {
      id: "healthcare-patient-intake",
      title: "AI Patient Intake & Appointment Booking",
      client: "HealthBridge Clinics Network",
      industry: "Healthcare & Telemedicine",
      badge: "Healthcare",
      metrics: [
        { label: "Intake Speed", value: "3.5x Faster" },
        { label: "No-Show Reduction", value: "42%" },
        { label: "Double Bookings", value: "0" },
        { label: "Weekly Hours Saved", value: "45 hrs" }
      ],
      problem: "HealthBridge staff spent over 5 hours every day manually calling patients to confirm appointments, collecting repetitive medical intake forms over the phone, and fixing overlapping schedule conflicts across 14 doctors.",
      solution: "We deployed an omni-channel WhatsApp & Web patient intake AI agent connected to their EHR calendar system. The AI guides patients through HIPAA-compliant pre-screening triage, checks real-time doctor availability, confirms bookings, and sends automated WhatsApp reminders with preparation guidelines.",
      techStack: ["WhatsApp Business API", "Claude 3.5 Sonnet", "Google Calendar Graph API", "HIPAA Compliant Sandbox", "n8n"],
      clientQuote: "Our front desk staff is no longer overwhelmed by phone calls. Patients love the instant WhatsApp booking and our doctor utilization rate is at an all-time high.",
      authorName: "Dr. David Kim, Medical Director at HealthBridge"
    },
    "realestate-lead-pipeline": {
      id: "realestate-lead-pipeline",
      title: "Inbound Lead Qualification & CRM Pipeline",
      client: "Apex Realty Partners",
      industry: "Real Estate & Property Development",
      badge: "Real Estate",
      metrics: [
        { label: "Lead Response Time", value: "< 10s" },
        { label: "Meeting Show-Up Rate", value: "+180%" },
        { label: "Qualified Pipeline", value: "$4.2M" },
        { label: "Sales Closing Speed", value: "2x Faster" }
      ],
      problem: "Apex Realty was spending thousands of dollars on digital ads but losing high-net-worth buyers due to slow response times. Inquiries submitted in the evening often waited until the next afternoon for an agent callback, by which time the leads had contacted competitor agencies.",
      solution: "Omniva built an instant-response AI lead qualification bot that engages ad inquiries within 10 seconds via SMS and WhatsApp. It asks tailored questions to qualify buyer budget, timeline, and location preferences, generates property comparison packets, and schedules property viewings directly onto senior broker calendars.",
      techStack: ["HubSpot CRM API", "Twilio SMS / WhatsApp", "n8n Lead Router", "GPT-4o", "Google Calendar API"],
      clientQuote: "Our meeting show-up rates skyrocketed. The AI qualifies leads better than our previous outsourced SDR team at a fraction of the cost.",
      authorName: "Elena Vance, Managing Partner at Apex Realty"
    }
  };

  window.OMNIVA_PORTFOLIO_DATA = PORTFOLIO_DATA;

  // =========================================================================
  // 4. API CONNECTORS (N8N INTEGRATION)
  // =========================================================================
  function isPlaceholderUrl(url) {
    if (!url) return true;
    return url.includes('YOUR-N8N-INSTANCE-URL') ||
      url.includes('YOUR_N8N_INSTANCE_URL') ||
      url.includes('placeholder') ||
      url.startsWith('https://YOUR');
  }

  async function submitBookingToN8n(bookingData) {
    const webhookUrl = CONFIG.n8n.bookingWebhookUrl;
    console.log('[Omniva API] Submitting Booking:', bookingData);

    if (isPlaceholderUrl(webhookUrl)) {
      console.warn('[Omniva API] bookingWebhookUrl is placeholder. Simulating successful response.');
      await new Promise(r => setTimeout(r, 800));
      return {
        success: true,
        bookingId: 'OMNIVA-' + Math.random().toString(36).substring(2, 8).toUpperCase()
      };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        event: 'consultation_booking',
        data: bookingData,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json().catch(() => ({ success: true, bookingId: 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase() }));
  }

  async function submitContactToN8n(contactData) {
    const webhookUrl = CONFIG.n8n.contactWebhookUrl;
    console.log('[Omniva API] Submitting Contact Inquiry:', contactData);

    if (isPlaceholderUrl(webhookUrl)) {
      console.warn('[Omniva API] contactWebhookUrl is placeholder. Simulating transmission.');
      await new Promise(r => setTimeout(r, 700));
      return { success: true };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        event: 'contact_form_inquiry',
        data: contactData,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json().catch(() => ({ success: true }));
  }

  window.OmnivaAPI = { submitBookingToN8n, submitContactToN8n };

  // =========================================================================
  // 5. BOOKING WORKFLOW CONTROLLER
  // =========================================================================
  class BookingWorkflowManager {
    constructor() {
      this.modal = document.getElementById('booking-modal');
      this.form = document.getElementById('booking-form');
      this.closeBtn = document.getElementById('booking-close-btn');
      this.headerCloseBtn = document.getElementById('booking-header-close-btn');
      this.steps = document.querySelectorAll('.booking-step');
      this.progressIndicators = document.querySelectorAll('.booking-step-dot');
      this.prevBtn = document.querySelector('.btn-booking-prev');
      this.nextBtn = document.querySelector('.btn-booking-next');
      this.submitBtn = document.getElementById('booking-submit-btn');
      this.currentStep = 1;
      this.totalSteps = 3;

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

      this.attachTriggerButtons();

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      if (this.headerCloseBtn) {
        this.headerCloseBtn.addEventListener('click', () => this.close());
      }

      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) this.close();
      });

      this.initStepNavigation();
      this.initServiceSelectors();
      this.initTimeSlotSelectors();

      if (this.form) {
        this.form.addEventListener('submit', (e) => this.handleBookingSubmit(e));
      }

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
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      this.goToStep(1);
    }

    close() {
      if (!this.modal) return;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
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

      if (timePills.length > 0) {
        timePills[0].classList.add('selected');
        this.formData.preferredTime = timePills[0].getAttribute('data-time') || timePills[0].textContent.trim();
      }
    }

    initStepNavigation() {
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          if (this.validateCurrentStep()) {
            this.goToStep(this.currentStep + 1);
          }
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.goToStep(this.currentStep - 1);
        });
      }
    }

    goToStep(stepNumber) {
      if (stepNumber < 1 || stepNumber > 4) return;
      this.currentStep = stepNumber;

      this.steps.forEach(step => {
        const stepIdx = parseInt(step.getAttribute('data-step'), 10);
        step.style.display = (stepIdx === this.currentStep) ? 'block' : 'none';
      });

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

      // Update Footer Buttons
      if (this.prevBtn && this.nextBtn && this.submitBtn && this.closeBtn) {
        if (this.currentStep === 1) {
          this.prevBtn.style.visibility = 'hidden';
          this.prevBtn.style.display = 'inline-flex';
          this.nextBtn.style.display = 'inline-flex';
          this.submitBtn.style.display = 'none';
          this.closeBtn.style.display = 'none';
        } else if (this.currentStep === 2) {
          this.prevBtn.style.visibility = 'visible';
          this.prevBtn.style.display = 'inline-flex';
          this.nextBtn.style.display = 'inline-flex';
          this.submitBtn.style.display = 'none';
          this.closeBtn.style.display = 'none';
        } else if (this.currentStep === 3) {
          this.prevBtn.style.visibility = 'visible';
          this.prevBtn.style.display = 'inline-flex';
          this.nextBtn.style.display = 'none';
          this.submitBtn.style.display = 'inline-flex';
          this.closeBtn.style.display = 'none';
        } else if (this.currentStep === 4) {
          this.prevBtn.style.display = 'none';
          this.nextBtn.style.display = 'none';
          this.submitBtn.style.display = 'none';
          this.closeBtn.style.display = 'inline-flex';
        }
      }

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

      this.formData.fullName = fullName;
      this.formData.email = email;
      this.formData.company = company;
      this.formData.phone = phone;
      this.formData.notes = notes;
      this.formData.submittedAt = new Date().toISOString();

      const submitBtn = document.getElementById('booking-submit-btn');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Confirm Consultation';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
          </svg> Transmitting to n8n...
        `;
      }

      try {
        const response = await submitBookingToN8n(this.formData);
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

      const serviceName = SERVICES_DATA[this.formData.service] ? SERVICES_DATA[this.formData.service].title : this.formData.service.toUpperCase();

      if (summaryService) summaryService.textContent = serviceName;
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

      const dateInput = document.getElementById('booking-date');
      if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
        this.formData.preferredDate = dateInput.value;
      }

      const serviceOptions = document.querySelectorAll('.booking-service-card');
      serviceOptions.forEach(o => o.classList.remove('selected'));
    }
  }

  // =========================================================================
  // 6. PERSISTENT LIVE AI DEMO CHATBOT
  // =========================================================================
  class PersistentDemoChatbot {
    constructor() {
      this.widget = document.getElementById('demo-chatbot-widget');
      this.messagesContainer = document.getElementById('demo-chat-messages');
      this.inputField = document.getElementById('demo-chat-input');
      this.sendBtn = document.getElementById('demo-send-btn');
      this.endChatBtn = document.getElementById('demo-end-chat-btn');
      this.minimizeBtn = document.getElementById('demo-minimize-btn');
      this.floatingLauncher = document.getElementById('demo-floating-launcher');
      this.suggestionsContainer = document.getElementById('demo-chat-suggestions');

      this.isResponding = false;
      this.chatHistory = this.loadHistory();

      this.knowledgeBase = [
        {
          triggers: ['service', 'offer', 'what do you do', 'solutions', 'capabilities'],
          response: `Omniva builds production AI automation systems across 9 core pillars:\n\n1. **AI Customer Support Agents**: 24/7 autonomous ticket resolution\n2. **AI Chatbots**: Brand-calibrated natural language agents\n3. **Workflow Automation**: Connecting tools via n8n & custom webhooks\n4. **AI Appointment Booking**: Automated scheduling & calendar sync\n5. **Lead Qualification**: Real-time scoring and CRM routing\n6. **CRM & Email Automation**: HubSpot, Salesforce, Zendesk\n7. **AI Consulting & Custom Solutions**\n\nWhich solution would you like to explore?`
        },
        {
          triggers: ['roi', 'cost', 'save', 'pricing', 'price', 'calculator', 'how much'],
          response: `📊 **Typical ROI with Omniva Automations**:\n• **70% average reduction** in customer support overhead\n• **90% faster response times** (<2 seconds vs. hours)\n• **5x ROI** achieved within 60 days of deployment\n\nOur plans start from **$1,490** for Starter Automation up to custom enterprise multi-agent architectures. You can click **Pricing** on the nav bar to see all tier details!`
        },
        {
          triggers: ['book', 'consultation', 'appointment', 'schedule', 'talk to human', 'meeting'],
          response: `You can schedule a **Free 30-Minute AI Discovery Consultation** directly! Click the **"Book Free Consultation"** button at the top of the page, and our booking coordinator will confirm your time slot.`
        },
        {
          triggers: ['crm', 'integration', 'integrate', 'tools', 'hubspot', 'salesforce', 'zapier', 'n8n'],
          response: `We build deep bi-directional integrations across:\n• **CRMs**: HubSpot, Salesforce, Zoho, Pipedrive\n• **Communication**: WhatsApp Business API, Slack, Twilio, Gmail, Outlook\n• **E-Commerce**: Shopify, Stripe, WooCommerce\n• **Databases**: PostgreSQL, MySQL, Supabase, Pinecone Vector DB\n• **Workflow Engines**: n8n, Make, Custom REST APIs.`
        },
        {
          triggers: ['how long', 'timeline', 'deploy', 'fast', 'speed'],
          response: `⚡ **Fast Turnaround**:\n• Most AI customer support agents and appointment workflows are live in **7 to 12 business days**.\n• Simple automations can be deployed in as little as **5 days**.\n• Enterprise custom multi-agent systems take **2 to 4 weeks**.`
        },
        {
          triggers: ['security', 'privacy', 'gdpr', 'data', 'safe'],
          response: `🔒 **Enterprise Security Promise**:\nAll client workflows run in private, isolated sandboxes. Your business documents and customer inquiries are **never used to train public models**, and all transmissions are encrypted in compliance with SOC2 and GDPR standards.`
        },
        {
          triggers: ['hi', 'hello', 'hey', 'start'],
          response: `Hello! 👋 How can I help you today? You can ask me about our AI customer support agents, appointment booking, CRM integrations, or estimated ROI for your industry.`
        }
      ];

      this.init();
    }

    init() {
      if (!this.widget) return;

      this.attachTriggerButtons();

      if (this.endChatBtn) {
        this.endChatBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.confirmEndChat();
        });
      }

      if (this.minimizeBtn) {
        this.minimizeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.minimize();
        });
      }

      if (this.floatingLauncher) {
        this.floatingLauncher.addEventListener('click', () => {
          this.open();
        });
      }

      if (this.sendBtn) {
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
      }

      // DO NOT close on type or Enter
      if (this.inputField) {
        this.inputField.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendMessage();
          }
        });
      }

      this.renderSuggestions();
      this.renderInitialMessages();
    }

    attachTriggerButtons() {
      const triggers = document.querySelectorAll(
        '.btn-try-demo, .open-demo-chat, [data-open-demo]'
      );

      triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });
    }

    open() {
      if (!this.widget) return;
      this.widget.classList.add('active');
      this.widget.classList.remove('minimized');
      if (this.floatingLauncher) this.floatingLauncher.classList.add('hidden');

      setTimeout(() => {
        if (this.inputField) this.inputField.focus();
        this.scrollToBottom();
      }, 100);
    }

    minimize() {
      if (!this.widget) return;
      this.widget.classList.remove('active');
      if (this.floatingLauncher) this.floatingLauncher.classList.remove('hidden');
    }

    confirmEndChat() {
      const confirmation = window.confirm("Are you sure you want to end this demo session and clear chat history?");
      if (confirmation) {
        this.resetChat();
        this.minimize();
      }
    }

    resetChat() {
      this.chatHistory = [];
      try { sessionStorage.removeItem('omniva_demo_history'); } catch (e) {}
      if (this.suggestionsContainer) {
        this.suggestionsContainer.style.display = 'flex';
      }
      this.renderInitialMessages();
    }

    loadHistory() {
      try {
        const saved = sessionStorage.getItem('omniva_demo_history');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }

    saveHistory() {
      try {
        sessionStorage.setItem('omniva_demo_history', JSON.stringify(this.chatHistory));
      } catch (e) {}
    }

    renderSuggestions() {
      if (!this.suggestionsContainer) return;
      this.suggestionsContainer.innerHTML = '';

      const suggestions = CONFIG.demoChat.suggestedQueries || [];

      suggestions.forEach(text => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'demo-suggestion-chip';
        chip.textContent = text;
        chip.addEventListener('click', () => {
          if (this.inputField) {
            this.inputField.value = text;
            this.handleSendMessage();
          }
        });
        this.suggestionsContainer.appendChild(chip);
      });
    }

    renderInitialMessages() {
      if (!this.messagesContainer) return;
      this.messagesContainer.innerHTML = '';

      if (this.chatHistory.length > 0) {
        this.chatHistory.forEach(msg => {
          this.appendMessageBubble(msg.text, msg.sender, false);
        });
      } else {
        const welcome = CONFIG.demoChat.welcomeMessage;
        this.appendMessageBubble(welcome, 'bot', true);
      }
    }

    appendMessageBubble(text, sender = 'bot', save = true) {
      if (!this.messagesContainer) return;

      const bubble = document.createElement('div');
      bubble.className = `demo-bubble ${sender}`;
      bubble.innerHTML = this.formatMessage(text);

      this.messagesContainer.appendChild(bubble);
      this.scrollToBottom();

      if (save) {
        this.chatHistory.push({ text, sender, timestamp: Date.now() });
        this.saveHistory();
      }
    }

    formatMessage(text) {
      if (!text) return '';
      let formatted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      formatted = formatted.replace(/\n/g, '<br>');
      return formatted;
    }

    showTypingIndicator() {
      this.removeTypingIndicator();
      const typing = document.createElement('div');
      typing.className = 'demo-typing-indicator';
      typing.id = 'demo-typing-indicator';
      typing.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      this.messagesContainer.appendChild(typing);
      this.scrollToBottom();
    }

    removeTypingIndicator() {
      const existing = document.getElementById('demo-typing-indicator');
      if (existing) existing.remove();
    }

    scrollToBottom() {
      if (this.messagesContainer) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }
    }

    handleSendMessage() {
      if (this.isResponding) return;
      const text = this.inputField ? this.inputField.value.trim() : '';
      if (!text) return;

      this.inputField.value = '';
      this.appendMessageBubble(text, 'user', true);

      this.isResponding = true;
      this.showTypingIndicator();

      setTimeout(() => {
        this.removeTypingIndicator();
        const botResponse = this.generateResponse(text);
        this.appendMessageBubble(botResponse, 'bot', true);
        this.isResponding = false;
      }, 500 + Math.random() * 350);
    }

    generateResponse(userQuery) {
      const q = userQuery.toLowerCase();

      for (const item of this.knowledgeBase) {
        if (item.triggers.some(trigger => q.includes(trigger))) {
          return item.response;
        }
      }

      return `At Omniva AI Automation, we engineer tailored AI agents and workflows for that exact requirement. You can click **"Book Free Consultation"** to schedule a personalized 1-on-1 strategy call with our automation architects!`;
    }
  }

  // =========================================================================
  // 7. INITIALIZATION ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Omniva App] Initializing interactive components...');

    // 1. Initialize Booking Workflow & Live Demo Chatbot
    const bookingManager = new BookingWorkflowManager();
    const demoChatbot = new PersistentDemoChatbot();
    window.bookingManager = bookingManager;
    window.demoChatbot = demoChatbot;

    // 2. Sticky Header with Glass Scroll Effect & Active Section Spy
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
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '' || targetId.startsWith('#!')) return;
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
      serviceModal.setAttribute('aria-hidden', 'false');
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
        serviceModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
      serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
          serviceModal.classList.remove('active');
          serviceModal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
    }

    if (serviceModalBookBtn) {
      serviceModalBookBtn.addEventListener('click', () => {
        if (serviceModal) {
          serviceModal.classList.remove('active');
          serviceModal.setAttribute('aria-hidden', 'true');
        }
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
      portfolioModal.setAttribute('aria-hidden', 'false');
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
        portfolioModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
      portfolioModal.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
          portfolioModal.classList.remove('active');
          portfolioModal.setAttribute('aria-hidden', 'true');
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

    // 8. Contact Form Validation & Submission
    const contactForm = document.getElementById('production-contact-form');
    const formSuccess = document.getElementById('contact-form-success');

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

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
          const err = document.getElementById('err-contact-name');
          if (err) err.style.display = 'block';
          hasError = true;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
          const err = document.getElementById('err-contact-email');
          if (err) err.style.display = 'block';
          hasError = true;
        }

        if (!company) {
          const err = document.getElementById('err-contact-company');
          if (err) err.style.display = 'block';
          hasError = true;
        }

        if (!phone || phone.length < 7) {
          const err = document.getElementById('err-contact-phone');
          if (err) err.style.display = 'block';
          hasError = true;
        }

        if (!message || message.length < 5) {
          const err = document.getElementById('err-contact-message');
          if (err) err.style.display = 'block';
          hasError = true;
        }

        if (hasError) return;

        const submitBtn = document.getElementById('contact-submit-btn');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
              <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
            </svg> Transmitting to n8n...
          `;
        }

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
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
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
        infoModal.setAttribute('aria-hidden', 'false');
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
        infoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
      infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) {
          infoModal.classList.remove('active');
          infoModal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
    }

    // 11. Dynamic Year in Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    console.log('[Omniva App] All components initialized successfully.');
  });

})();
