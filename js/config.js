/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - CONFIGURATION FILE
 * =========================================================================
 * Centralized settings for n8n webhook URLs, company info, and features.
 */

export const CONFIG = {
  // Brand & Company Information
  brand: {
    name: "Omniva AI Automation",
    tagline: "Automating Business. Empowering Growth.",
    mission: "To help businesses save time, reduce costs, and improve customer experiences through intelligent AI automation solutions.",
    email: "chidiogoogoh@gmail.com",
    phoneDisplay: "08164078027", // Used internally and in contact records
    website: "Coming Soon",
    // WhatsApp direct chat URL (Nigerian number: 08164078027 -> International: 2348164078027)
    whatsappUrl: "https://wa.me/2348164078027?text=Hello%20Omniva%20AI%20Automation%2C%20I%20would%20like%20to%20inquire%20about%20your%20AI%20solutions."
  },

  // =========================================================================
  // N8N WEBHOOK ENDPOINTS
  // =========================================================================
  // Replace the placeholder URLs below with your active n8n Webhook URLs.
  n8n: {
    // 1. Webhook for "Book Free Consultation" form submissions:
    bookingWebhookUrl: "https://YOUR-N8N-INSTANCE-URL/webhook/omniva-booking",

    // 2. Webhook for Contact Us inquiry form submissions:
    contactWebhookUrl: "https://YOUR-N8N-INSTANCE-URL/webhook/omniva-contact",

    // 3. Webhook for Live Customer Support AI Agent (separate from demo chatbot):
    supportAgentWebhookUrl: "https://YOUR-N8N-INSTANCE-URL/webhook/omniva-chat-agent",

    // Set to true to use smart simulated responses when n8n webhooks are offline/unconfigured
    useSimulatedFallbackWhenOffline: true,

    // Fallback message when a live webhook call fails
    errorMessage: "Sorry, our AI assistant is temporarily unavailable. Please try again later or contact us on WhatsApp."
  },

  // Live AI Demo Chatbot Settings (Independent from n8n)
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

// Expose globally for browser script compatibility
if (typeof window !== 'undefined') {
  window.OMNIVA_CONFIG = CONFIG;
}
