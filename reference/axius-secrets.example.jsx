// ============================================================
// AXIUS — SECRETS TEMPLATE  (commit this file with placeholders)
// ============================================================
// Copy this file to `axius-secrets.local.jsx` and replace the
// placeholder values with your real credentials.  The `.local.jsx`
// variant is gitignored so secrets never reach the public repo.
//
// Load order in Axius Compare.html:
//   1. axius-secrets.local.jsx   ← sets window.AxiusSecrets
//   2. axius-shared.jsx          ← reads window.AxiusSecrets and
//                                  merges values into AxiusConfig
window.AxiusSecrets = {
  // Telegram bot — used by the Ring-Andrés flow.  Get the token
  // from @BotFather and the chat ID from getUpdates after sending
  // any message to the bot or to the supergroup it lives in.
  telegramBotToken: 'YOUR_TELEGRAM_BOT_TOKEN',
  telegramChatId:   'YOUR_TELEGRAM_CHAT_ID',

  // Direct contact channels — E.164 with NO leading + or spaces
  whatsappNumber: 'YOUR_WHATSAPP_E164',
  phoneNumber:    'YOUR_PHONE_E164',

  // Stripe Payment Links per pricing tier
  checkoutUrls: {
    operador:     '',
    equipo:       '',
    departamento: '',
  },
};
