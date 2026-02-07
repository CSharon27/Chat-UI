// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// Initialize Theme
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Toggle Theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    });
}

// Chat Logic (if on chat page)
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const typingIndicator = document.getElementById('typing-indicator');

if (chatForm) {
    // Initial messages or load from localStorage
    let messages = JSON.parse(localStorage.getItem('chatHistory')) || [
        { sender: 'bot', text: 'Hey there! Welcome to ChatUI. How can I assist you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];

    renderMessages();

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text) {
            addMessage('user', text);
            messageInput.value = '';
            simulateBotResponse();
        }
    });

    function addMessage(sender, text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messages.push({ sender, text, time });
        renderMessages();
        saveHistory();
        scrollToBottom();
    }

    function renderMessages() {
        if (!chatMessages) return;
        chatMessages.innerHTML = '';
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = `message ${msg.sender} animate-fade`;
            div.innerHTML = `
                <div class="message-bubble">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            `;
            chatMessages.appendChild(div);
        });
        scrollToBottom();
    }

    function simulateBotResponse() {
        if (typingIndicator) typingIndicator.style.display = 'flex';
        scrollToBottom();

        const responses = [
            "That's interesting! Tell me more.",
            "I'm just a simulation, but I'm learning fast!",
            "ChatUI is built with pure HTML, CSS, and JS. Pretty cool, right?",
            "I totally agree with you on that one.",
            "Can you explain that in more detail?",
            "Have you seen our dark mode yet? It's stunning!",
            "I'm here to help with whatever you need."
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        setTimeout(() => {
            if (typingIndicator) typingIndicator.style.display = 'none';
            addMessage('bot', randomResponse);
        }, 1500 + Math.random() * 1000);
    }

    function saveHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Clear history button (optional, if you add one)
    window.clearChat = () => {
        messages = [{ sender: 'bot', text: 'History cleared! How can I help now?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
        renderMessages();
        saveHistory();
    };
}
