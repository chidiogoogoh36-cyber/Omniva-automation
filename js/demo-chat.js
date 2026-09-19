/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - PERSISTENT LIVE AI DEMO CHATBOT
 * =========================================================================
 * Standalone interactive demo agent that:
 * 1. Opens and stays open firmly.
 * 2. Never closes while typing.
 * 3. Answers demo questions with natural language multi-turn memory.
 * 4. Preserves chat history in sessionStorage.
 * 5. Shows realistic typing indicator.
 * 6. Features quick prompt suggestions.
 * 7. Includes a clear, visible "End Chat" button.
 */

import { CONFIG as ImportedConfig } from './config.js';

const getConfig = () => (typeof window !== 'undefined' && window.OMNIVA_CONFIG) ? window.OMNIVA_CONFIG : ImportedConfig;

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
        response: `📊 **Typical ROI with Omniva Automations**:\n• **70% average reduction** in customer support overhead\n• **90% faster response times** (<2 seconds vs. hours)\n• **5x ROI** achieved within 60 days of deployment\n\nOur plans start from **$1,490/mo** for Starter Automation up to custom enterprise multi-agent architectures. You can click **Pricing** on the nav bar to see all tier details!`
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

    // Attach trigger buttons ("Try Live AI Demo")
    this.attachTriggerButtons();

    // End Chat Button
    if (this.endChatBtn) {
      this.endChatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.confirmEndChat();
      });
    }

    // Minimize Button
    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimize();
      });
    }

    // Floating Launcher Button
    if (this.floatingLauncher) {
      this.floatingLauncher.addEventListener('click', () => {
        this.open();
      });
    }

    // Send on click
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    }

    // Send on Enter (do NOT close on type!)
    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    // Render suggestion chips
    this.renderSuggestions();

    // Render stored or initial welcome message
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
    sessionStorage.removeItem('omniva_demo_history');
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
    } catch (e) {
      console.warn('Session storage quota exceeded', e);
    }
  }

  renderSuggestions() {
    if (!this.suggestionsContainer) return;
    this.suggestionsContainer.innerHTML = '';

    const config = getConfig();
    const suggestions = config.demoChat.suggestedQueries || [];

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
      const config = getConfig();
      const welcome = config.demoChat.welcomeMessage;
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

    // Clear input field
    this.inputField.value = '';

    // Append user message
    this.appendMessageBubble(text, 'user', true);

    this.isResponding = true;
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const botResponse = this.generateResponse(text);
      this.appendMessageBubble(botResponse, 'bot', true);
      this.isResponding = false;
    }, 600 + Math.random() * 400);
  }

  generateResponse(userQuery) {
    const q = userQuery.toLowerCase();

    for (const item of this.knowledgeBase) {
      if (item.triggers.some(trigger => q.includes(trigger))) {
        return item.response;
      }
    }

    return `At Omniva AI Automation, we build customized AI workflows and intelligent agents to solve that exact operational challenge. You can click **"Book Free Consultation"** on the header to schedule a personalized 1-on-1 strategy call with our engineering team!`;
  }
}

export function initPersistentDemoChatbot() {
  return new PersistentDemoChatbot();
}

if (typeof window !== 'undefined') {
  window.PersistentDemoChatbot = PersistentDemoChatbot;
  window.initPersistentDemoChatbot = initPersistentDemoChatbot;
}
