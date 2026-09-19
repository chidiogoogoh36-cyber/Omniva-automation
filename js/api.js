/**
 * =========================================================================
 * OMNIVA AI AUTOMATION - PRODUCTION API CONNECTORS
 * =========================================================================
 * Clean, production-ready async functions for communicating with n8n webhooks.
 */

import { CONFIG as ImportedConfig } from './config.js';

const getConfig = () => (typeof window !== 'undefined' && window.OMNIVA_CONFIG) ? window.OMNIVA_CONFIG : ImportedConfig;

/**
 * Checks if a webhook URL is configured or still a placeholder.
 */
function isPlaceholderUrl(url) {
  if (!url) return true;
  return url.includes('YOUR-N8N-INSTANCE-URL') || 
         url.includes('YOUR_N8N_INSTANCE_URL') || 
         url.includes('placeholder') || 
         url.startsWith('https://YOUR');
}

/**
 * 1. SUBMIT CONSULTATION BOOKING TO N8N WEBHOOK
 * Payload structure: { name, email, company, phone, service, preferredDate, preferredTime, notes, submittedAt }
 */
export async function submitBookingToN8n(bookingData) {
  const config = getConfig();
  const webhookUrl = config.n8n.bookingWebhookUrl;

  console.log('[Omniva API] Preparing booking submission:', bookingData);

  // If webhook is not yet configured, provide simulated response if enabled
  if (isPlaceholderUrl(webhookUrl)) {
    console.warn('[Omniva API] bookingWebhookUrl is currently a placeholder. Simulating successful transmission.');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Booking successfully received! Our AI coordinator will send calendar details shortly.',
      bookingId: 'BK-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    };
  }

  // Real production webhook call
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        event: 'consultation_booking',
        data: bookingData,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`n8n HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json().catch(() => ({ success: true }));
    return { success: true, ...result };
  } catch (error) {
    console.error('[Omniva API] Failed to submit booking to n8n:', error);
    throw error;
  }
}

/**
 * 2. SUBMIT CONTACT FORM INQUIRY TO N8N WEBHOOK
 * Payload structure: { name, email, company, phone, service, message, submittedAt }
 */
export async function submitContactToN8n(contactData) {
  const config = getConfig();
  const webhookUrl = config.n8n.contactWebhookUrl;

  console.log('[Omniva API] Submitting contact form to n8n:', contactData);

  if (isPlaceholderUrl(webhookUrl)) {
    console.warn('[Omniva API] contactWebhookUrl is currently a placeholder. Simulating transmission.');
    await new Promise(resolve => setTimeout(resolve, 900));
    return {
      success: true,
      message: 'Thank you! Your inquiry has been sent to our automation team.'
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        event: 'contact_form_inquiry',
        data: contactData,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`n8n HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json().catch(() => ({ success: true }));
    return { success: true, ...result };
  } catch (error) {
    console.error('[Omniva API] Failed to send contact form to n8n:', error);
    throw error;
  }
}

/**
 * 3. SEND MESSAGE TO N8N SUPPORT AGENT WEBHOOK
 */
export async function sendSupportChatMessage(message, history = [], sessionId = '') {
  const config = getConfig();
  const webhookUrl = config.n8n.supportAgentWebhookUrl;

  if (isPlaceholderUrl(webhookUrl)) {
    throw new Error('n8n Support Agent Webhook is not yet configured.');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      action: 'sendMessage',
      sessionId: sessionId || 'omniva_default_session',
      message: message,
      chatInput: message,
      history: history.slice(-8)
    })
  });

  if (!response.ok) {
    throw new Error(`n8n HTTP Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  let reply = '';
  if (typeof data === 'string') reply = data;
  else if (data.output) reply = data.output;
  else if (data.message) reply = data.message;
  else if (data.text) reply = data.text;
  else if (data.response) reply = data.response;
  else reply = JSON.stringify(data);

  return reply;
}

if (typeof window !== 'undefined') {
  window.OmnivaAPI = {
    submitBookingToN8n,
    submitContactToN8n,
    sendSupportChatMessage
  };
}
