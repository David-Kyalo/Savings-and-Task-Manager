// FAQ Chatbot - Keyword-based Question Answering System
// Based on research of common questions about savings and task management

const ChatbotController = {
    // FAQ Knowledge Base - organized by category
    faqDatabase: [
        // SAVINGS & PERSONAL FINANCE
        {
            keywords: ['what is saving', 'what is savings', 'define saving', 'saving definition', 'meaning of saving'],
            category: 'savings',
            question: 'What is saving?',
            answer: 'Saving is the act of setting aside a portion of your income for future use rather than spending it immediately. It involves reserving money regularly to build financial security, prepare for emergencies, achieve goals (like buying a house), and plan for retirement. Savings provide a safety net and help you become financially independent.'
        },
        {
            keywords: ['personal finance', 'what is personal finance', 'finance basics'],
            category: 'savings',
            question: 'What is personal finance?',
            answer: 'Personal finance is the management of your money to achieve financial stability and long-term security. It includes budgeting, saving, investing, managing debt, and planning for major life events. Understanding personal finance helps you make informed decisions and take control of your financial future.'
        },
        // CUSTOMER SUPPORT
        {
            keywords: ['customer care', 'customer service', 'customer support', 'contact', 'speak to human', 'talk to human', 'real person', 'real human', 'human agent', 'live agent', 'support team', 'help desk', 'representative', 'speak to someone', 'talk to someone', 'call', 'phone number', 'reach you', 'get in touch'],
            category: 'support',
            question: 'How can I contact customer support?',
            answer: '📧 For personalized assistance from our support team, please email us at dinfo@smartsave.com. Our team is happy to help with any questions or concerns you may have. We typically respond within 24-48 hours!'
        },
        {
            keywords: ['complaint', 'issue', 'problem', 'not working', 'bug', 'error', 'feedback', 'suggestion'],
            category: 'support',
            question: 'How do I report an issue or give feedback?',
            answer: '📧 We value your feedback! Please email us at dinfo@smartsave.com with any issues, suggestions, or feedback. Our team will review and get back to you as soon as possible.'
        },
        {
            keywords: ['emergency', 'fund', 'rainy day', 'emergency savings'],
            category: 'savings',
            question: 'How much should I save for emergencies?',
            answer: 'Financial experts recommend having an emergency fund that covers 3-6 months of living expenses. Some experts now suggest 6-12 months for a more solid financial cushion. Keep this money in a liquid, stable account like a high-yield savings account.'
        },
        {
            keywords: ['50/30/20', 'rule', 'percentage', 'allocate', 'budget split'],
            question: 'What is the 50/30/20 rule?',
            answer: 'The 50/30/20 rule is a popular budgeting guideline: allocate 50% of your income to needs (essentials), 30% to wants (discretionary spending), and 20% to savings and debt repayment. It\'s a simple framework to help balance your finances.'
        },
        {
            keywords: ['budget', 'create', 'make', 'start', 'plan spending'],
            question: 'How do I create a budget?',
            answer: 'To create a budget: 1) Estimate your income and expenses, 2) Track all actual spending for 30 days, 3) Compare estimated vs actual, 4) Create an expected budget adjusting categories as needed. Use tools like spreadsheets or budgeting apps to track spending.'
        },
        {
            keywords: ['savings account', 'interest', 'bank account', 'save money', 'where to save'],
            category: 'savings',
            question: 'What is a savings account used for?',
            answer: 'A savings account lets you set money aside for short-term goals or emergency funds, separate from spending money. Most savings accounts earn interest because the bank uses your deposits to loan to others. Funds are typically FDIC-insured up to $250,000.'
        },
        {
            keywords: ['how much save', 'save month', 'monthly savings', 'save each month'],
            category: 'savings',
            question: 'How much should I save each month?',
            answer: 'The amount varies based on your income and goals. The 50/30/20 rule suggests saving 20% of your income. Start with what you can afford - even small amounts add up over time through consistent saving habits.'
        },
        {
            keywords: ['debt', 'pay off', 'loans', 'credit card', 'owe'],
            question: 'What\'s the best way to pay off debt?',
            answer: 'Two popular methods: the Avalanche method (pay highest interest debts first to save money) or the Snowball method (pay smallest debts first for psychological wins). Also consider debt consolidation if you have multiple high-interest debts.'
        },
        {
            keywords: ['invest', 'investing', 'stocks', 'start investing'],
            question: 'How much money do I need to start investing?',
            answer: 'You don\'t need a large sum to start! Many modern apps and platforms allow investing with just a few dollars through fractional shares. The key is to start early - even small investments can grow significantly over time through compound interest.'
        },
        {
            keywords: ['retirement', 'retire', 'pension', '401k'],
            question: 'When should I start saving for retirement?',
            answer: 'Start as soon as possible! The sooner you begin, the more time your money has to grow through compound interest. If your employer offers a 401(k) match, contribute at least enough to get the full match - it\'s free money.'
        },
        {
            keywords: ['financial planning', 'plan finances', 'money plan'],
            question: 'What is financial planning?',
            answer: 'Financial planning is managing your finances to achieve your dreams and goals. It involves reviewing your income, expenses, savings, investments, insurance, and taxes to make informed decisions and work towards financial objectives.'
        },
        {
            keywords: ['track spending', 'monitor expenses', 'where money goes'],
            question: 'What are the best ways to track spending?',
            answer: 'You can track spending by writing it down, using spreadsheets, or budgeting apps. Tracking helps identify where your money goes and where you can cut back. Review your spending regularly to stay on budget.'
        },
        {
            keywords: ['credit score', 'improve credit', 'credit rating'],
            question: 'How can I improve my credit score?',
            answer: 'Focus on: 1) Making all payments on time, 2) Keeping credit utilization below 30%, 3) Not closing old credit accounts, 4) Avoiding too many new credit applications. Payment history is the most important factor.'
        },
        {
            keywords: ['save', 'debt', 'both', 'priority'],
            question: 'Should I save money or pay off debt first?',
            answer: 'Do both if possible! Prioritize high-interest debt, but also build an emergency fund. If your employer offers 401(k) matching, contribute enough to get the match even while paying debt - it\'s too valuable to miss.'
        },

        // TASK MANAGEMENT & PRODUCTIVITY
        {
            keywords: ['task management', 'what is task management', 'manage tasks', 'task manager'],
            category: 'tasks',
            question: 'What is task management?',
            answer: 'Task management is planning, organizing, and tracking tasks from start to completion. It helps you stay organized, manage workload, ensure important tasks are completed on time, reduce stress, and cultivate stronger work habits.'
        },
        {
            keywords: ['to-do list', 'todo', 'task list', 'checklist'],
            question: 'What is a to-do list and why use one?',
            answer: 'A to-do list is a planning tool listing tasks to complete within a timeframe. Benefits include: keeping track of tasks, setting priorities, reducing mental clutter, saving time, and improving organizational skills. It helps you focus on what matters most.'
        },
        {
            keywords: ['create', 'effective', 'to-do', 'make list', 'good task list'],
            question: 'How do I create an effective to-do list?',
            answer: 'Tips for effective to-do lists: 1) Write down all tasks to reduce mental clutter, 2) Use action verbs to make tasks clear, 3) Break large tasks into smaller steps, 4) Limit daily tasks to 3-5 key items, 5) Set clear deadlines, 6) Organize by category or priority.'
        },
        {
            keywords: ['prioritize', 'priority', 'important', 'urgent', 'first'],
            question: 'How can I prioritize tasks effectively?',
            answer: 'Use the Eisenhower Matrix to categorize tasks: 1) Urgent & Important = Do first, 2) Important but not urgent = Schedule, 3) Urgent but not important = Delegate, 4) Neither urgent nor important = Delete. You can also use color-coding or number rankings.'
        },
        {
            keywords: ['procrastination', 'procrastinate', 'avoid delay', 'stop putting off'],
            question: 'How do I avoid procrastination?',
            answer: 'Combat procrastination by: 1) Breaking large tasks into smaller, less intimidating steps, 2) Using time blocking to schedule focused work, 3) Focusing on one task at a time, 4) Understanding WHY you\'re avoiding the task, 5) Starting with the hardest task first.'
        },
        {
            keywords: ['productive', 'productivity', 'get more done', 'efficient'],
            question: 'How can I improve my productivity?',
            answer: 'Boost productivity by: 1) Setting clear goals and priorities, 2) Breaking tasks into manageable chunks, 3) Using time blocking, 4) Avoiding multitasking, 5) Taking regular breaks, 6) Eliminating distractions, 7) Reviewing and adjusting your approach regularly.'
        },
        {
            keywords: ['time blocking', 'block time', 'schedule tasks'],
            question: 'What is time blocking?',
            answer: 'Time blocking is allocating specific time slots in your schedule for focused work on individual tasks. It helps minimize distractions, prevents multitasking, and ensures important work gets dedicated attention. Block out time for both important and routine tasks.'
        },
        {
            keywords: ['delegate', 'delegation', 'assign tasks'],
            question: 'When should I delegate tasks?',
            answer: 'Ask yourself: Does this task truly need to be done by ME? If someone else can do it effectively, consider delegating. Delegation frees your time for high-priority work that requires your specific skills and expertise.'
        },
        {
            keywords: ['break down', 'large task', 'big project', 'overwhelming'],
            question: 'How do I break down large tasks?',
            answer: 'Divide complex tasks into smaller, actionable steps. This makes them less daunting and easier to track progress. Each step should be specific and achievable. Breaking tasks down also helps you identify dependencies and plan better.'
        },
        {
            keywords: ['focus', 'stay focused', 'concentration', 'distraction'],
            question: 'How can I stay focused on tasks?',
            answer: 'Improve focus by: 1) Working on one task at a time, 2) Using time blocking for dedicated work periods, 3) Eliminating distractions (phone, notifications), 4) Taking regular breaks, 5) Working during your peak energy hours, 6) Creating a dedicated workspace.'
        },
        {
            keywords: ['daily', 'routine', 'every day', 'daily tasks'],
            question: 'How should I plan my daily tasks?',
            answer: 'Start each day by identifying your top 3-5 priority tasks. Tackle the most important or challenging task first when your energy is highest. Leave buffer time for unexpected items. Review progress at day\'s end and plan for tomorrow.'
        },
        {
            keywords: ['app', 'software', 'tool', 'digital', 'technology'],
            question: 'Should I use task management software?',
            answer: 'Task management apps offer many benefits: set reminders and due dates, organize by project or category, collaborate with teams, access from multiple devices, and visualize workload. Choose tools that fit your workflow and aren\'t overly complex.'
        },
        {
            keywords: ['multitask', 'multiple', 'many tasks', 'several things'],
            question: 'Is multitasking effective?',
            answer: 'No, multitasking generally reduces productivity and increases errors. Focus on one task at a time for better quality work and faster completion. If you must handle multiple responsibilities, use time blocking to give each task dedicated attention.'
        },
        {
            keywords: ['review', 'check', 'progress', 'assess'],
            question: 'How often should I review my tasks?',
            answer: 'Review tasks daily to adjust priorities and track progress. Do a weekly review to assess what worked, what didn\'t, and plan for the coming week. Regular reviews help you stay aligned with goals and adapt to changes.'
        },
        {
            keywords: ['goals', 'set goals', 'objectives', 'targets'],
            question: 'How do I set effective goals?',
            answer: 'Use SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound. Break long-term goals into smaller milestones. Write goals down and review them regularly. Align daily tasks with your larger objectives.'
        },

        // COMBINING SAVINGS & TASKS
        {
            keywords: ['financial goals', 'money goals', 'savings goals'],
            question: 'How do I set realistic financial goals?',
            answer: 'Start by envisioning what matters most (emergency fund, down payment, retirement). Break goals into time frames: short-term (1 year), mid-term (1-5 years), long-term (5+ years). Assign dollar amounts and deadlines. Prioritize and allocate a portion of each paycheck to top goals.'
        },
        {
            keywords: ['organize', 'stay organized', 'organization'],
            question: 'How can I stay organized with finances and tasks?',
            answer: 'Use digital tools to track both finances and tasks. Set up automated savings transfers. Schedule regular financial reviews as recurring tasks. Break financial goals into actionable tasks. Keep all financial documents organized and easily accessible.'
        },
        {
            keywords: ['habit', 'build habits', 'routine', 'consistency'],
            question: 'How do I build better financial and productivity habits?',
            answer: 'Start small and be consistent. For finances: automate savings, track spending daily. For tasks: plan each morning, review each evening. Use the same tools and routines. It takes about 21-66 days to form a habit, so stick with it!'
        },
        {
            keywords: ['motivation', 'motivated', 'stay motivated', 'keep going'],
            question: 'How do I stay motivated with my goals?',
            answer: 'Track and celebrate small wins. Visualize your progress with charts or checklists. Share goals with an accountability partner. Regularly remind yourself WHY these goals matter to you. Adjust strategies if something isn\'t working - flexibility helps maintain motivation.'
        }
    ],

    // State management
    isOpen: false,
    messageHistory: [],

    // Initialize chatbot
    init() {
        this.setupEventListeners();
        this.loadChatHistory();
    },

    // Set up event listeners
    setupEventListeners() {
        const chatToggle = document.getElementById('chatbotToggle');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => this.toggleChat());
        }

        if (chatSend) {
            chatSend.addEventListener('click', () => this.sendMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    },

    // Toggle chat window
    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        const chatToggle = document.getElementById('chatbotToggle');

        if (this.isOpen) {
            chatWindow.classList.add('open');
            chatToggle.style.display = 'none';

            // Show welcome message if first time
            if (this.messageHistory.length === 0) {
                this.addBotMessage('👋 Hi! I\'m your Smart Save assistant. Ask me anything about savings, budgeting, task management, or productivity!');
            }
        } else {
            chatWindow.classList.remove('open');
            chatToggle.style.display = 'flex';
        }
    },

    // Send user message
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        input.value = '';

        // Process and respond
        setTimeout(() => {
            const response = this.findBestAnswer(message);
            this.addBotMessage(response);
            this.saveChatHistory();
        }, 500);
    },

    // Add user message to chat
    addUserMessage(message) {
        this.messageHistory.push({ type: 'user', text: message });
        this.renderMessage('user', message);
    },

    // Add bot message to chat
    addBotMessage(message) {
        this.messageHistory.push({ type: 'bot', text: message });
        this.renderMessage('bot', message);
    },

    // Render message in chat window
    renderMessage(type, text) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = text;

        messageDiv.appendChild(bubbleDiv);
        messagesContainer.appendChild(messageDiv);

        // Auto-scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    // Keyword matching algorithm
    findBestAnswer(userQuestion) {
        const question = userQuestion.toLowerCase().trim();
        const words = question.split(/\s+/).filter(w => w.length > 2); // Filter out short words

        let bestMatch = null;
        let highestScore = 0;

        // Score each FAQ based on keyword matches
        for (const faq of this.faqDatabase) {
            let score = 0;

            for (const keyword of faq.keywords) {
                const keywordLower = keyword.toLowerCase();

                // Exact phrase match in question (highest priority)
                if (question.includes(keywordLower)) {
                    // Give more points for longer keyword phrases
                    score += 5 + keywordLower.split(' ').length;
                }

                // Check if question starts with the keyword (very relevant)
                if (question.startsWith(keywordLower)) {
                    score += 3;
                }
            }

            // Only add word-level matching if we haven't found strong phrase matches
            if (score < 5) {
                for (const keyword of faq.keywords) {
                    const keywordWords = keyword.toLowerCase().split(' ');
                    for (const word of words) {
                        for (const kw of keywordWords) {
                            // Exact word match only (not partial)
                            if (word === kw || (word.length > 4 && kw.startsWith(word))) {
                                score += 1;
                            }
                        }
                    }
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = faq;
            }
        }

        // Return best match if score is good enough
        if (highestScore >= 3) {
            return bestMatch.answer;
        }

        // Fallback responses
        return this.getFallbackResponse(question);
    },

    // Fallback response when no good match found
    getFallbackResponse(question) {
        const fallbacks = [
            "I'm not sure about that specific question. Try asking about savings, budgeting, emergency funds, task management, productivity, or prioritization!",
            "That's a great question, but I don't have a specific answer for it. I can help with topics like creating budgets, managing tasks, setting financial goals, or improving productivity.",
            "I specialize in savings and task management topics. Could you rephrase your question or ask about budgeting, financial planning, to-do lists, or prioritization?"
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    },

    // Save chat history to localStorage
    saveChatHistory() {
        try {
            localStorage.setItem('chatbotHistory', JSON.stringify(this.messageHistory));
        } catch (e) {
            console.error('Failed to save chat history:', e);
        }
    },

    // Load chat history from localStorage
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('chatbotHistory');
            if (saved) {
                this.messageHistory = JSON.parse(saved);
                // Render saved messages
                for (const msg of this.messageHistory) {
                    this.renderMessage(msg.type, msg.text);
                }
            }
        } catch (e) {
            console.error('Failed to load chat history:', e);
        }
    },

    // Clear chat history
    clearHistory() {
        this.messageHistory = [];
        document.getElementById('chatMessages').innerHTML = '';
        localStorage.removeItem('chatbotHistory');
        this.addBotMessage('Chat history cleared! How can I help you today?');
    }
};

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ChatbotController.init());
} else {
    ChatbotController.init();
}
