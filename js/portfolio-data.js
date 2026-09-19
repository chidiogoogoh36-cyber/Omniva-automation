/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - PORTFOLIO CASE STUDIES DATA
 * =========================================================================
 * Deep project breakdown data for portfolio detail modals.
 */

export const PORTFOLIO_DATA = {
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
    keyFeatures: [
      "Real-time live order status lookup and package tracking",
      "Automated return policy verification and label generation",
      "Multi-lingual support for US, UK, and European customers",
      "Smart sentiment analysis that flags frustrated shoppers for immediate human escalation"
    ],
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
    keyFeatures: [
      "Natural language triage pre-screening to match patients with the right specialist",
      "Real-time multi-doctor calendar conflict management",
      "Automated reminder sequences 24 hours and 2 hours before appointments",
      "Digital intake form collection sent directly into secure clinic storage"
    ],
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
    keyFeatures: [
      "Sub-10-second instant engagement upon form submission or ad click",
      "Dynamic buyer budget and mortgage readiness scoring",
      "Automatic property matching based on buyer preference filters",
      "Direct calendar synchronization with senior listing agents"
    ],
    clientQuote: "Our meeting show-up rates skyrocketed. The AI qualifies leads better than our previous outsourced SDR team at a fraction of the cost.",
    authorName: "Elena Vance, Managing Partner at Apex Realty"
  }
};

if (typeof window !== 'undefined') {
  window.OMNIVA_PORTFOLIO_DATA = PORTFOLIO_DATA;
}
