/**
 * Prize2Pride Lingua Spanish Platform
 * Luxury Chat Arena Server - Full Visual Experience
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// LUXURY CHAT ARENA - MAIN PAGE
// ============================================

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Prize2Pride Lingua Spanish - Luxury Chat Arena</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --gold: #FBBF24;
          --royal-blue: #1E40AF;
          --black: #111827;
          --gray-dark: #1F2937;
          --gray-light: #D1D5DB;
          --success: #22C55E;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, var(--black) 0%, var(--gray-dark) 100%);
          color: var(--gray-light);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Header */
        header {
          background: rgba(17, 24, 39, 0.95);
          border-bottom: 2px solid var(--gold);
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 10px 40px rgba(251, 191, 36, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.8em;
          font-weight: bold;
          background: linear-gradient(135deg, var(--gold) 0%, var(--royal-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-icon {
          font-size: 2.5em;
        }

        nav {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        nav button {
          padding: 10px 20px;
          border: 2px solid var(--gold);
          background: transparent;
          color: var(--gold);
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        nav button:hover {
          background: var(--gold);
          color: var(--black);
          transform: translateY(-2px);
        }

        /* Main Container */
        .container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          padding: 40px;
          max-width: 1600px;
          margin: 0 auto;
          min-height: calc(100vh - 100px);
        }

        /* Avatar Section */
        .avatar-section {
          background: rgba(30, 64, 175, 0.1);
          border: 2px solid var(--royal-blue);
          border-radius: 15px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .avatar-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .avatar-container {
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .avatar-icon {
          font-size: 120px;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .avatar-name {
          font-size: 1.5em;
          color: var(--gold);
          font-weight: bold;
          margin-bottom: 10px;
        }

        .avatar-status {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          color: var(--success);
          font-size: 0.95em;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .avatar-info {
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid rgba(251, 191, 36, 0.3);
          text-align: left;
          z-index: 10;
          position: relative;
        }

        .info-item {
          margin-bottom: 15px;
          padding: 10px;
          background: rgba(251, 191, 36, 0.05);
          border-left: 3px solid var(--gold);
          border-radius: 4px;
        }

        .info-label {
          color: var(--gold);
          font-size: 0.85em;
          font-weight: bold;
          text-transform: uppercase;
        }

        .info-value {
          color: var(--gray-light);
          margin-top: 5px;
        }

        /* Chat Section */
        .chat-section {
          background: rgba(31, 41, 55, 0.8);
          border: 2px solid var(--gold);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(251, 191, 36, 0.15);
        }

        .chat-header {
          background: linear-gradient(135deg, var(--gold) 0%, var(--royal-blue) 100%);
          padding: 20px;
          color: var(--black);
          font-weight: bold;
          font-size: 1.2em;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-level-badge {
          background: rgba(0, 0, 0, 0.3);
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.85em;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-height: 400px;
        }

        .message {
          display: flex;
          gap: 10px;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 10px;
          word-wrap: break-word;
        }

        .message.assistant .message-content {
          background: rgba(251, 191, 36, 0.15);
          border-left: 3px solid var(--gold);
          color: var(--gray-light);
        }

        .message.user .message-content {
          background: var(--royal-blue);
          color: white;
        }

        .chat-input-area {
          padding: 20px;
          border-top: 1px solid rgba(251, 191, 36, 0.2);
          display: flex;
          gap: 10px;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--gold);
          border-radius: 8px;
          color: var(--gray-light);
          font-size: 0.95em;
        }

        .chat-input:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
        }

        .chat-input::placeholder {
          color: rgba(209, 213, 219, 0.5);
        }

        .send-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--royal-blue) 100%);
          border: none;
          border-radius: 8px;
          color: var(--black);
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .send-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.3);
        }

        .send-btn:active {
          transform: translateY(0);
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 40px;
          padding: 0 40px 40px;
        }

        .feature-card {
          background: rgba(251, 191, 36, 0.05);
          border: 1px solid var(--gold);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: rgba(251, 191, 36, 0.1);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.2);
        }

        .feature-icon {
          font-size: 2.5em;
          margin-bottom: 10px;
        }

        .feature-title {
          color: var(--gold);
          font-weight: bold;
          margin-bottom: 8px;
        }

        .feature-desc {
          font-size: 0.9em;
          color: rgba(209, 213, 219, 0.8);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 1fr;
          }

          header {
            flex-direction: column;
            gap: 15px;
          }

          nav {
            width: 100%;
            justify-content: center;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">
          <span class="logo-icon">🏆</span>
          <span>Prize2Pride Lingua Spanish</span>
        </div>
        <nav>
          <button onclick="alert('📚 Browse Lessons Coming Soon!')">Lessons</button>
          <button onclick="alert('💰 Upgrade Your Plan!')">Upgrade</button>
        </nav>
      </header>

      <div class="container">
        <!-- Avatar Section -->
        <div class="avatar-section">
          <div class="avatar-container">
            <div class="avatar-icon">👨‍🏫</div>
            <div class="avatar-name">Professor Carlos</div>
            <div class="avatar-status">
              <span class="status-dot"></span>
              <span>Ready to Teach</span>
            </div>
          </div>

          <div class="avatar-info">
            <div class="info-item">
              <div class="info-label">Current Level</div>
              <div class="info-value">A1 - Beginner</div>
            </div>
            <div class="info-item">
              <div class="info-label">Learning Mode</div>
              <div class="info-value">Formal Spanish</div>
            </div>
            <div class="info-item">
              <div class="info-label">Streak</div>
              <div class="info-value">🔥 7 Days</div>
            </div>
            <div class="info-item">
              <div class="info-label">XP Points</div>
              <div class="info-value">⭐ 2,450 XP</div>
            </div>
          </div>
        </div>

        <!-- Chat Section -->
        <div class="chat-section">
          <div class="chat-header">
            <span>🎓 Luxury Chat Arena</span>
            <div class="chat-level-badge">A1 Level</div>
          </div>

          <div class="chat-messages">
            <div class="message assistant">
              <div class="message-content">
                <strong>📚 VOCABULARIO</strong><br><br>
                <strong style="color: #FBBF24;">Hola</strong> → Hello<br>
                Pronunciación: [Ó-la]<br><br>
                <strong style="color: #FBBF24;">¿Cómo estás?</strong> → How are you?<br>
                Pronunciación: [KÓ-mo] es-[TÁS]
              </div>
            </div>
            <div class="message user">
              <div class="message-content">¡Hola! Muy bien, gracias.</div>
            </div>
            <div class="message assistant">
              <div class="message-content">
                <strong style="color: #22C55E;">✅ Excelente!</strong><br><br>
                Your Spanish is perfect! 🎉<br><br>
                <strong style="color: #FBBF24;">Next Step:</strong> Try asking "¿Y tú?" (And you?)
              </div>
            </div>
          </div>

          <div class="chat-input-area">
            <input 
              type="text" 
              class="chat-input" 
              placeholder="Write your Spanish response here... ¡Escribe aquí!"
              id="messageInput"
            >
            <button class="send-btn" onclick="sendMessage()">Send ✈️</button>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🧠</div>
          <div class="feature-title">AI Tutor</div>
          <div class="feature-desc">Intelligent tutoring system</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <div class="feature-title">10,000 Lessons</div>
          <div class="feature-desc">All levels A1-C2</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <div class="feature-title">6 Languages</div>
          <div class="feature-desc">Learn in your language</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <div class="feature-title">Gamification</div>
          <div class="feature-desc">Earn XP & achievements</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">♾️</div>
          <div class="feature-title">Eternal</div>
          <div class="feature-desc">Permanent & unsuspendable</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💰</div>
          <div class="feature-title">Flexible Plans</div>
          <div class="feature-desc">Freemium to VIP</div>
        </div>
      </div>

      <script>
        function sendMessage() {
          const input = document.getElementById('messageInput');
          const message = input.value.trim();
          
          if (!message) return;

          // Add user message
          const chatMessages = document.querySelector('.chat-messages');
          const userMsg = document.createElement('div');
          userMsg.className = 'message user';
          userMsg.innerHTML = \`<div class="message-content">\${message}</div>\`;
          chatMessages.appendChild(userMsg);

          // Simulate AI response
          setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message assistant';
            aiMsg.innerHTML = \`<div class="message-content">
              <strong style="color: #22C55E;">✅ ¡Muy bien!</strong><br><br>
              Your Spanish is improving! Keep practicing. 🎉<br><br>
              <strong style="color: #FBBF24;">Tip:</strong> Remember to use accents on vowels!
            </div>\`;
            chatMessages.appendChild(aiMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, 500);

          input.value = '';
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Allow Enter key to send
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendMessage();
        });
      </script>
    </body>
    </html>
  `);
});

// ============================================
// API ROUTES
// ============================================

app.get('/api/lessons/stats', (req, res) => {
  res.json({
    totalLessons: 10000,
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    modes: ['formal', 'informal', 'slang', 'dirty', 'expert'],
    languages: ['en', 'fr', 'de', 'it', 'ar', 'zh'],
    immutable: true
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', platform: 'Prize2Pride', eternal: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  🏆 Prize2Pride Lingua Spanish - Luxury Arena              ║
║  ✅ Server running on port ${PORT}                            ║
║  🌐 Access at: http://localhost:${PORT}                      ║
║  ♾️  Status: ETERNAL & UNSUSPENDABLE                        ║
║  🧠 Powered by Manus AI                                    ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;
