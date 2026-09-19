/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - SERVICES DATA REPOSITORY
 * =========================================================================
 * Deep structured content for service detail modals.
 */

export const SERVICES_DATA = {
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
    deliverables: [
      "Custom-calibrated LLM persona and prompt engineering",
      "Vector search knowledge base integration",
      "Ticketing platform bi-directional sync (Zendesk / Freshdesk / HubSpot)",
      "Automated human handoff routing logic",
      "Weekly performance analytics dashboard"
    ],
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
    deliverables: [
      "Full conversational flow architecture & edge-case guards",
      "Custom branded chat widget with glassmorphic dark/light UI",
      "API integration for live product / inventory / user lookups",
      "Analytics logging and sentiment classification pipeline"
    ],
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
    deliverables: [
      "End-to-end workflow blueprint and logic mapping",
      "Production webhook pipelines and secure credential management",
      "Error handling, alert monitoring, and automated fallback logic",
      "Complete documentation and maintenance handoff"
    ],
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
    deliverables: [
      "Calendar integration for multi-host and round-robin scheduling",
      "Conversational qualification flow (budget, timeline, requirements)",
      "Automated reminder sequences (Email + WhatsApp)",
      "Post-booking CRM contact creation and pipeline stage update"
    ],
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
    deliverables: [
      "Custom lead scoring rubric and question branches",
      "Data enrichment pipeline and verification checks",
      "Automated lead assignment logic (geo, industry, deal size)",
      "Instant notification bots for sales reps"
    ],
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
    deliverables: [
      "CRM schema optimization and custom properties setup",
      "Automated deal pipeline stage automations",
      "Activity logging and email summary transformers",
      "Contract and invoice auto-generation workflows"
    ],
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
    deliverables: [
      "Email parsing and sentiment classification pipeline",
      "Auto-drafting assistant for customer service & sales teams",
      "Attachment processing and OCR extraction workflows",
      "Automated follow-up drip sequences"
    ],
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
    deliverables: [
      "Comprehensive AI Readiness & Workflow Audit Report",
      "Prioritized Automation Opportunity Matrix with ROI Estimates",
      "Technical Architecture Diagram & Security Guidelines",
      "Executive Presentation and Implementation Roadmap"
    ],
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
    deliverables: [
      "Custom multi-agent architecture and orchestrator",
      "Private API endpoints and secure database connectors",
      "Interactive web UI / admin dashboard",
      "Full source code, documentation, and continuous maintenance plan"
    ],
    timeline: "14 – 28 Business Days"
  }
};

if (typeof window !== 'undefined') {
  window.OMNIVA_SERVICES_DATA = SERVICES_DATA;
}
