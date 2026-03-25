import { getCasesData } from './cases.js';
import { getLocalAIResponse } from '../ai_core/logic.js';

export function setupAIBridge() {
    const chatBtn = document.getElementById('ai-chat-btn');
    const chatPanel = document.getElementById('ai-chat-panel');
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    const chatLog = document.getElementById('ai-chat-log');
    const closeChat = document.getElementById('close-ai-chat');

    if (!chatBtn || !chatPanel || !chatForm || !chatLog) return;

    // Toggle Panel
    chatBtn.onclick = () => {
        chatPanel.classList.toggle('active');
        if (chatPanel.classList.contains('active')) {
            if (chatLog.innerHTML.trim() === "") {
                const count = getCasesData().filter(c => !c.isEvent).length;
                addAIMessage(`⚖️ **CLERKY v5.0-G3** (LOCAL-SECURE) \n\n**Neural Engine Active.** \n\nIndices: \n• **Live Case Repository** (${count} records) \n• 406k+ Word Lexicon \n• Black's Law Dictionary \n• Judicial PDF Reference Core \n\nOffline Mode is active. Data is stored locally for maximum judicial security. How can I help?`);
            }
            chatInput.focus();
        }
    };

    closeChat.onclick = () => chatPanel.classList.remove('active');

    // Handle Messages
    chatForm.onsubmit = (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        addMessage(query, 'user');
        chatInput.value = '';
        
        showThinking();
        setTimeout(() => processAI(query), 300); // Small delay for UX
    };

    function addMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat-msg msg-${type}`;
        msg.innerHTML = `<div class="msg-content">${text}</div>`;
        chatLog.appendChild(msg);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function addAIMessage(text) {
        addMessage(text, 'ai');
    }

    function showThinking() {
        const thinking = document.createElement('div');
        thinking.id = 'ai-thinking';
        thinking.className = 'chat-msg msg-ai';
        thinking.innerHTML = `<div class="dots-container"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
        chatLog.appendChild(thinking);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Logic Processing
    const settingsBtn = document.getElementById('ai-settings-btn');
    if(settingsBtn) settingsBtn.style.display = 'none';

    async function processAI(query) {
        const thinking = document.getElementById('ai-thinking');
        if (thinking) thinking.remove();

        const q = query.toLowerCase();
        const apiKey = localStorage.getItem('CLERKY_API_KEY');

        // Commands
        if (q.includes('hard reset') || q.includes('wipe')) {
            chatLog.innerHTML = '';
            localStorage.removeItem('CLERKY_API_KEY');
            return addAIMessage("🧹 **SYSTEM WIPED.** Cache and API key cleared.");
        }

        if (q.includes('master') || q.includes('owner') || q.includes('creator')) {
            return addAIMessage("I am developed by **Master Jazzam**, the Principal Architect of Branch 77 digital infrastructure. My intelligence is derived from his advanced coding protocols.");
        }

        // 1. Live Case Scanner (Live Firebase Cache)
        const normalize = (str) => str.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        const qNorm = normalize(query);
        const allCases = getCasesData().filter(c => !c.isEvent);
        
        const matches = allCases.filter(c => {
            const cNoNorm = normalize(c.caseNo);
            const titleNorm = normalize(c.title || "");
            const accusedNorm = normalize(c.accused || "");
            const respNorm = normalize(c.respondent || "");
            
            return (qNorm.length > 3 && (
                qNorm.includes(cNoNorm) || 
                cNoNorm.includes(qNorm) ||
                titleNorm.includes(qNorm) ||
                accusedNorm.includes(qNorm) ||
                respNorm.includes(qNorm)
            ));
        });

        if (matches.length > 0 && query.length > 3) {
            let res = `📂 **DOCKET SEARCH RESULT:** \nI found ${matches.length} matching case records: \n\n`;
            matches.slice(0, 3).forEach(m => {
                res += `• **${m.caseNo}**: ${m.title || m.accused} (${m.place}) \n  Status: ${m.status} | Last Event: ${m.date} \n\n`;
            });
            if (matches.length > 3) res += `... (*plus ${matches.length - 3} more*).`;
            return addAIMessage(res);
        }

        // 1. Try Python AI Engine (Primary Local)
        try {
            const pyRes = await fetch('http://localhost:8000/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query })
            });
            const pyData = await pyRes.json();
            if (pyData && pyData.response && pyData.source !== "python_fallback") {
                return addAIMessage(pyData.response);
            }
        } catch (e) {
            console.log("Python engine offline. Falling back to JavaScript Core...");
        }

        // 2. Fallback to JavaScript Knowledge Base (Legacy Local)
        const local = await getLocalAIResponse(query);
        const knowledge = await (await fetch('ai_core/knowledge.json')).json();
        if (local && local !== knowledge.fallback) {
            return addAIMessage(`🏠 **JS CORE:** \n${local}`);
        }

        // 3. Final Local Fallback (No Gemini)
        const caseRegex = /[A-Za-z]-[A-Za-z-]+\d{2}-\d{4}/;
        if (caseRegex.test(query)) {
            return addAIMessage(`🔍 **DOCKET SCAN FAILED:** I could not find a case numbered **${query.toUpperCase()}** in the current live records. Please ensure the case has been imported or synchronized correctly.`);
        }
        addAIMessage("⚖️ **OFFLINE MODE:** I have consulted all local Python and JavaScript knowledge cores but could not find a direct protocol for this query. My intelligence is strictly local for your security.");
    }
}
