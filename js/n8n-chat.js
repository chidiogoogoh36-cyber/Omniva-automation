/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - N8N CONSULTATION AI AGENT INTEGRATION
 * =========================================================================
 * Integrates the n8n Customer Support / Consultation AI Agent workflow.
 */

import { CONFIG as ImportedConfig } from './config.js';

const CONFIG = typeof window !== 'undefined' && window.OMNIVA_CONFIG ? window.OMNIVA_CONFIG : ImportedConfig;

export class N8nConsultationAgent {
  constructor() {
    this.modal = document.getElementById('n8n-consultation-modal');
    this.messagesContainer = document.getElementById('n8n-chat-messages');
    this.inputField = document.getElementById('n8n-chat-input');
    this.sendButton = document.getElementById('n8n-send-btn');
    this.closeButton = document.getElementById('n8n-close-btn');
    this.resetButton = document.getElementById('n8n-reset-btn');
    this.promptsContainer = document.getElementById('n8n-quick-prompts');
    
    // Unique session ID for n8n memory nodes
    this.sessionId = this.getOrCreateSessionId();
    this.isLoading = false;
    this.chatHistory = this.loadHistory();

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Attach click listeners to all consultation trigger buttons across the site
    this.attachTriggerListeners();

    // Setup modal controls
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => this.resetConversation());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Keyboard escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Send on click
    if (this.sendButton) {
      this.sendButton.addEventListener('click', () => this.sendMessage());
    }

    // Send on Enter key
    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Render Quick Prompts
    this.renderQuickPrompts();

    // Render stored or welcome message
    this.renderInitialMessages();
  }

  attachTriggerListeners() {
    const triggers = document.querySelectorAll(
      '.open-consultation-chat, [data-open-consultation], .btn-book-consultation'
    );

    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  getOrCreateSessionId() {
    let sid = sessionStorage.getItem('omniva_n8n_session_id');
    if (!sid) {
      sid = 'omniva_sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('omniva_n8n_session_id', sid);
    }
    return sid;
  }

  loadHistory() {
    try {
      const saved = sessionStorage.getItem('omniva_consultation_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not load chat history from sessionStorage', e);
      return [];
    }
  }

  saveHistory() {
    try {
      sessionStorage.setItem('omniva_consultation_history', JSON.stringify(this.chatHistory));
    } catch (e) {
      console.warn('Could not save chat history to sessionStorage', e);
    }
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (this.inputField) this.inputField.focus();
      this.scrollToBottom();
    }, 150);
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('active');
  }

  renderQuickPrompts() {
    if (!this.promptsContainer) return;
    this.promptsContainer.innerHTML = '';

    const currentConfig = window.OMNIVA_CONFIG || CONFIG;
    const prompts = currentConfig.n8n.quickPrompts || [];
    prompts.forEach(text => {
      const pill = document.createElement('button');
      pill.className = 'n8n-prompt-pill';
      pill.textContent = text;
      pill.addEventListener('click', () => {
        if (this.inputField) {
          this.inputField.value = text;
          this.sendMessage();
        }
      });
      this.promptsContainer.appendChild(pill);
    });
  }

  renderInitialMessages() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = '';

    if (this.chatHistory.length > 0) {
      this.chatHistory.forEach(msg => {
        this.appendBubble(msg.text, msg.sender, false);
      });
    } else {
      const currentConfig = window.OMNIVA_CONFIG || CONFIG;
      const welcome = currentConfig.n8n.welcomeMessage;
      this.appendBubble(welcome, 'bot', true);
    }
  }

  appendBubble(text, sender = 'bot', save = true) {
    if (!this.messagesContainer) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
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
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'n8n-typing-indicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const existing = document.getElementById('n8n-typing-indicator');
    if (existing) existing.remove();
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  async sendMessage() {
    if (this.isLoading) return;
    const text = this.inputField ? this.inputField.value.trim() : '';
    if (!text) return;

    this.inputField.value = '';
    this.appendBubble(text, 'user', true);

    if (this.promptsContainer) {
      this.promptsContainer.style.display = 'none';
    }

    this.isLoading = true;
    this.showTypingIndicator();

    try {
      const responseText = await this.callN8nWorkflow(text);
      this.removeTypingIndicator();
      this.appendBubble(responseText, 'bot', true);
    } catch (error) {
      console.error('Error communicating with n8n workflow:', error);
      this.removeTypingIndicator();
      this.displayErrorFallback();
    } finally {
      this.isLoading = false;
    }
  }

  async callN8nWorkflow(message) {
    const currentConfig = window.OMNIVA_CONFIG || CONFIG;
    const webhookUrl = currentConfig.n8n.webhookUrl;

    const isPlaceholder = !webhookUrl || 
                          webhookUrl.includes('YOUR-N8N-INSTANCE-URL') || 
                          webhookUrl.includes('YOUR_N8N_INSTANCE_URL') ||
                          webhookUrl.includes('placeholder');

    if (isPlaceholder) {
      if (currentConfig.n8n.enableLocalFallbackSimulation) {
        await new Promise(r => setTimeout(r, 1200));
        return this.getSimulatedConsultationResponse(message);
      } else {
        throw new Error('n8n Webhook URL is not yet configured.');
      }
    }

    const payload = {
      action: 'sendMessage',
      sessionId: this.sessionId,
      chatInput: message,
      message: message,
      history: this.chatHistory.slice(-8)
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`n8n HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    let reply = '';
    if (typeof data === 'string') {
      reply = data;
    } else if (data.output) {
      reply = data.output;
    } else if (data.message) {
      reply = data.message;
    } else if (data.text) {
      reply = data.text;
    } else if (data.response) {
      reply = data.response;
    } else if (Array.isArray(data) && data[0] && (data[0].output || data[0].text || data[0].message)) {
      reply = data[0].output || data[0].text || data[0].message;
    } else {
      reply = JSON.stringify(data);
    }

    return reply;
  }

  displayErrorFallback() {
    if (!this.messagesContainer) return;
    const currentConfig = window.OMNIVA_CONFIG || CONFIG;

    const errorContainer = document.createElement('div');
    errorContainer.className = 'n8n-error-banner';
    errorContainer.innerHTML = `
      <span>${currentConfig.n8n.errorMessage}</span>
      <a href="${currentConfig.brand.whatsappUrl}" target="_blank" rel="noopener noreferrer">
        👉 Tap here to Chat directly with us on WhatsApp
      </a>
    `;

    this.messagesContainer.appendChild(errorContainer);
    this.scrollToBottom();
  }

  getSimulatedConsultationResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('cost') || q.includes('price') || q.includes('reduce')) {
      return "Omniva AI automation typically reduces operational and customer support costs by 60%–75%. We can schedule a 30-minute discovery call to evaluate your exact current support volume and calculate your exact ROI.";
    }
    if (q.includes('crm') || q.includes('integrate') || q.includes('existing')) {
      return "Yes! We seamlessly integrate AI agents with HubSpot, Salesforce, Zoho, Zendesk, WhatsApp Business API, PostgreSQL, and custom REST APIs.";
    }
    if (q.includes('time') || q.includes('deploy') || q.includes('long')) {
      return "Most custom AI workflows and customer support agents are designed, tested, and deployed within 7 to 14 business days.";
    }
    return "Thank you for sharing that! Our team at Omniva specializes in building tailored AI agents for your exact workflow. Would you like to schedule a free 30-minute consultation call, or connect with us on WhatsApp?";
  }

  resetConversation() {
    this.chatHistory = [];
    sessionStorage.removeItem('omniva_consultation_history');
    this.sessionId = 'omniva_sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    sessionStorage.setItem('omniva_n8n_session_id', this.sessionId);
    
    if (this.promptsContainer) {
      this.promptsContainer.style.display = 'flex';
    }
    
    this.renderInitialMessages();
  }
}

export function initN8nConsultationAgent() {
  return new N8nConsultationAgent();
}

if (typeof window !== 'undefined') {
  window.N8nConsultationAgent = N8nConsultationAgent;
  window.initN8nConsultationAgent = initN8nConsultationAgent;
}
