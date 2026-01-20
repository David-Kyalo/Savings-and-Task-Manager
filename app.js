// SmartSave - Savings Calculator Application
class SavingsCalculator {
    constructor() {
        this.principal = 0;
        this.categories = [];
        this.history = [];
        this.charts = {};
        this.defaultCategories = [
            { id: 1, name: 'Rent/Housing', percentage: 30, color: '#E8A87C' },
            { id: 2, name: 'Food & Groceries', percentage: 15, color: '#FFAB91' },
            { id: 3, name: 'Transportation', percentage: 10, color: '#B39DDB' },
            { id: 4, name: 'Entertainment', percentage: 5, color: '#80CBC4' },
            { id: 5, name: 'Utilities', percentage: 5, color: '#81D4FA' }
        ];
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.renderCategories();
        this.updateCalculations();
        this.initCharts();
        this.renderHistory();
    }

    loadFromStorage() {
        const savedData = localStorage.getItem('smartsave_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.principal = data.principal || 0;
            this.categories = data.categories || [...this.defaultCategories];
            this.history = data.history || [];
        } else {
            this.categories = [...this.defaultCategories];
        }
        document.getElementById('principalAmount').value = this.principal || '';
    }

    saveToStorage() {
        const data = { principal: this.principal, categories: this.categories, history: this.history };
        localStorage.setItem('smartsave_data', JSON.stringify(data));
    }

    bindEvents() {
        // Principal amount input
        document.getElementById('principalAmount').addEventListener('input', (e) => {
            this.principal = parseFloat(e.target.value) || 0;
            this.updateCalculations();
            this.saveToStorage();
        });

        // Quick amount buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.principal = parseFloat(e.target.dataset.amount);
                document.getElementById('principalAmount').value = this.principal;
                this.updateCalculations();
                this.saveToStorage();
            });
        });

        // Add category button
        document.getElementById('addCategoryBtn').addEventListener('click', () => this.addCategory());
        document.getElementById('newCategoryName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCategory();
        });

        // Save snapshot button
        document.getElementById('saveSnapshot').addEventListener('click', () => this.saveSnapshot());
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());

        // Navigation smooth scroll
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    addCategory() {
        const nameInput = document.getElementById('newCategoryName');
        const percentInput = document.getElementById('newCategoryPercent');
        const colorInput = document.getElementById('newCategoryColor');
        const name = nameInput.value.trim();
        const percentage = parseFloat(percentInput.value) || 0;
        const color = colorInput.value;

        if (!name) { this.showToast('Please enter a category name', 'error'); return; }
        if (percentage <= 0 || percentage > 100) { this.showToast('Percentage must be between 1 and 100', 'error'); return; }

        const newCategory = { id: Date.now(), name, percentage, color };
        this.categories.push(newCategory);
        nameInput.value = '';
        percentInput.value = '';
        colorInput.value = this.getRandomColor();
        this.renderCategories();
        this.updateCalculations();
        this.saveToStorage();
        this.showToast(`${name} category added!`, 'success');
    }

    deleteCategory(id) {
        this.categories = this.categories.filter(cat => cat.id !== id);
        this.renderCategories();
        this.updateCalculations();
        this.saveToStorage();
    }

    updateCategoryPercentage(id, newPercentage) {
        const category = this.categories.find(cat => cat.id === id);
        if (category) {
            category.percentage = Math.max(0, Math.min(100, parseFloat(newPercentage) || 0));
            this.updateCalculations();
            this.saveToStorage();
        }
    }

    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        container.innerHTML = this.categories.map(cat => `
            <div class="category-item" data-id="${cat.id}">
                <div class="category-color" style="background-color: ${cat.color}"></div>
                <span class="category-name">${cat.name}</span>
                <input type="number" class="category-input" value="${cat.percentage}" min="0" max="100" data-id="${cat.id}">
                <span class="category-percent">%</span>
                <span class="category-amount" id="amount-${cat.id}">$0.00</span>
                <button class="category-delete" data-id="${cat.id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
            </div>
        `).join('');

        container.querySelectorAll('.category-input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.updateCategoryPercentage(parseInt(e.target.dataset.id), e.target.value);
            });
        });

        container.querySelectorAll('.category-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.deleteCategory(id);
            });
        });
    }

    updateCalculations() {
        const totalPercentage = this.categories.reduce((sum, cat) => sum + cat.percentage, 0);
        const remainingPercentage = 100 - totalPercentage;
        const remainingAmount = this.principal * (remainingPercentage / 100);

        // Update category amounts
        this.categories.forEach(cat => {
            const amount = this.principal * (cat.percentage / 100);
            const amountEl = document.getElementById(`amount-${cat.id}`);
            if (amountEl) amountEl.textContent = this.formatCurrency(amount);
        });

        // Update total percentage
        const totalEl = document.getElementById('totalPercentage');
        totalEl.textContent = `${totalPercentage.toFixed(1)}%`;
        totalEl.className = 'percentage-value';
        if (totalPercentage > 100) totalEl.classList.add('error');
        else if (totalPercentage === 100) totalEl.classList.add('success');
        else if (totalPercentage > 80) totalEl.classList.add('warning');

        // Update remaining
        document.getElementById('remainingAmount').textContent = this.formatCurrency(remainingAmount);
        document.getElementById('remainingPercent').textContent = `${remainingPercentage.toFixed(1)}% of principal`;

        // Update summary
        this.renderSummary();
        this.updateCharts();
    }

    renderSummary() {
        const container = document.getElementById('summaryContainer');
        container.innerHTML = this.categories.map(cat => {
            const amount = this.principal * (cat.percentage / 100);
            return `
                <div class="summary-item">
                    <div class="summary-color" style="background-color: ${cat.color}"></div>
                    <div class="summary-info">
                        <div class="summary-name">${cat.name}</div>
                        <div class="summary-percent">${cat.percentage}%</div>
                    </div>
                    <div class="summary-amount">${this.formatCurrency(amount)}</div>
                </div>
            `;
        }).join('');
    }

    initCharts() {
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, font: { family: "'Inter', sans-serif" } } } }
        };

        // Allocation Pie Chart
        const allocationCtx = document.getElementById('allocationChart').getContext('2d');
        this.charts.allocation = new Chart(allocationCtx, {
            type: 'doughnut',
            data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 0, hoverOffset: 10 }] },
            options: { ...chartOptions, cutout: '60%' }
        });

        // Trend Line Chart
        const trendCtx = document.getElementById('trendChart').getContext('2d');
        this.charts.trend = new Chart(trendCtx, {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: { ...chartOptions, scales: { y: { beginAtZero: true, grid: { color: '#FFF3D4' } }, x: { grid: { display: false } } }, interaction: { intersect: false, mode: 'index' } }
        });

        // Comparison Bar Chart
        const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
        this.charts.comparison = new Chart(comparisonCtx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: { ...chartOptions, scales: { y: { beginAtZero: true, grid: { color: '#FFF3D4' } }, x: { grid: { display: false } } } }
        });

        this.updateCharts();
    }

    updateCharts() {
        if (!this.charts.allocation) return;

        const labels = [...this.categories.map(c => c.name), 'Savings'];
        const data = [...this.categories.map(c => c.percentage), Math.max(0, 100 - this.categories.reduce((s, c) => s + c.percentage, 0))];
        const colors = [...this.categories.map(c => c.color), '#81C784'];

        this.charts.allocation.data.labels = labels;
        this.charts.allocation.data.datasets[0].data = data;
        this.charts.allocation.data.datasets[0].backgroundColor = colors;
        this.charts.allocation.update();

        this.updateTrendCharts();
    }

    updateTrendCharts() {
        if (this.history.length === 0) return;

        const labels = this.history.map(h => new Date(h.date).toLocaleDateString());
        const allCategories = [...new Set(this.history.flatMap(h => h.categories.map(c => c.name)))];
        const colors = ['#E8A87C', '#FFAB91', '#B39DDB', '#80CBC4', '#81D4FA', '#A5D6A7', '#FF8A80'];

        // Trend chart datasets
        const trendDatasets = allCategories.map((name, i) => ({
            label: name,
            data: this.history.map(h => { const cat = h.categories.find(c => c.name === name); return cat ? h.principal * (cat.percentage / 100) : 0; }),
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length] + '40',
            fill: true,
            tension: 0.4
        }));

        this.charts.trend.data.labels = labels;
        this.charts.trend.data.datasets = trendDatasets;
        this.charts.trend.update();

        // Comparison chart - latest vs average
        if (this.history.length >= 2) {
            const latest = this.history[this.history.length - 1];
            const avgData = allCategories.map(name => {
                const values = this.history.slice(0, -1).map(h => { const cat = h.categories.find(c => c.name === name); return cat ? h.principal * (cat.percentage / 100) : 0; });
                return values.reduce((a, b) => a + b, 0) / values.length;
            });
            const latestData = allCategories.map(name => { const cat = latest.categories.find(c => c.name === name); return cat ? latest.principal * (cat.percentage / 100) : 0; });

            this.charts.comparison.data.labels = allCategories;
            this.charts.comparison.data.datasets = [
                { label: 'Previous Avg', data: avgData, backgroundColor: '#D4CFC9' },
                { label: 'Latest', data: latestData, backgroundColor: '#E8A87C' }
            ];
            this.charts.comparison.update();
        }
    }

    saveSnapshot() {
        if (this.principal <= 0) { this.showToast('Please enter a principal amount first', 'error'); return; }
        const snapshot = { id: Date.now(), date: new Date().toISOString(), principal: this.principal, categories: JSON.parse(JSON.stringify(this.categories)) };
        this.history.push(snapshot);
        this.saveToStorage();
        this.renderHistory();
        this.updateTrendCharts();
        this.showToast('Snapshot saved successfully!', 'success');
    }

    deleteHistoryItem(id) {
        this.history = this.history.filter(h => h.id !== id);
        this.saveToStorage();
        this.renderHistory();
        this.updateTrendCharts();
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all history?')) {
            this.history = [];
            this.saveToStorage();
            this.renderHistory();
            this.updateTrendCharts();
            this.showToast('History cleared', 'success');
        }
    }

    renderHistory() {
        const container = document.getElementById('historyContainer');
        if (this.history.length === 0) {
            container.innerHTML = '<p class="empty-history">No snapshots saved yet. Save a snapshot to track your trends!</p>';
            return;
        }
        container.innerHTML = this.history.slice().reverse().map(h => `
            <div class="history-item">
                <span class="history-date">${new Date(h.date).toLocaleDateString()} ${new Date(h.date).toLocaleTimeString()}</span>
                <span class="history-principal">${this.formatCurrency(h.principal)}</span>
                <div class="history-categories">${h.categories.slice(0, 5).map(c => `<span class="history-category-dot" style="background-color: ${c.color}" title="${c.name}: ${c.percentage}%"></span>`).join('')}</div>
                <button class="history-delete" data-id="${h.id}">×</button>
            </div>
        `).join('');

        container.querySelectorAll('.history-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteHistoryItem(parseInt(e.target.dataset.id)));
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    getRandomColor() {
        const colors = ['#E8A87C', '#FFAB91', '#B39DDB', '#80CBC4', '#81D4FA', '#A5D6A7', '#FF8A80', '#FFD54F'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    showToast(message, type = 'default') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.animation = 'toastOut 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SavingsCalculator();
    new TaskManager();
});

// TaskManager - Task Management Application
class TaskManager {
    constructor() {
        this.tasks = [];
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.renderAllTasks();
        this.updateNotificationBadge();
    }

    loadFromStorage() {
        const savedTasks = localStorage.getItem('smartsave_tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
    }

    saveToStorage() {
        localStorage.setItem('smartsave_tasks', JSON.stringify(this.tasks));
    }

    bindEvents() {
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());
        document.getElementById('newTaskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    addTask() {
        const input = document.getElementById('newTaskInput');
        const prioritySelect = document.getElementById('taskPriority');
        const title = input.value.trim();
        const priority = prioritySelect.value;

        if (!title) {
            this.showToast('Please enter a task description', 'error');
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            priority,
            status: 'not-started',
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        input.value = '';
        this.saveToStorage();
        this.renderAllTasks();
        this.updateNotificationBadge();
        this.showToast('Task added successfully!', 'success');
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToStorage();
        this.renderAllTasks();
        this.updateNotificationBadge();
    }

    changeStatus(id, newStatus) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = newStatus;
            this.saveToStorage();
            this.renderAllTasks();
            this.updateNotificationBadge();
        }
    }

    getTasksByStatus(status) {
        return this.tasks.filter(t => t.status === status);
    }

    renderAllTasks() {
        this.renderTaskColumn('not-started', 'notStartedTasks', 'notStartedCount');
        this.renderTaskColumn('in-progress', 'inProgressTasks', 'inProgressCount');
        this.renderTaskColumn('completed', 'completedTasks', 'completedCount');
    }

    renderTaskColumn(status, containerId, countId) {
        const container = document.getElementById(containerId);
        const countEl = document.getElementById(countId);
        const tasks = this.getTasksByStatus(status);

        countEl.textContent = tasks.length;

        if (tasks.length === 0) {
            container.innerHTML = '<p class="empty-column">No tasks here</p>';
            return;
        }

        container.innerHTML = tasks.map(task => this.createTaskCard(task, status)).join('');

        // Bind events
        container.querySelectorAll('.task-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteTask(parseInt(e.currentTarget.dataset.id));
            });
        });

        container.querySelectorAll('.task-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                const newStatus = e.currentTarget.dataset.status;
                this.changeStatus(id, newStatus);
            });
        });
    }

    createTaskCard(task, currentStatus) {
        let actionButtons = '';

        if (currentStatus === 'not-started') {
            actionButtons = `
                <button class="task-action-btn" data-id="${task.id}" data-status="in-progress">Start</button>
                <button class="task-action-btn complete" data-id="${task.id}" data-status="completed">Complete</button>
            `;
        } else if (currentStatus === 'in-progress') {
            actionButtons = `
                <button class="task-action-btn" data-id="${task.id}" data-status="not-started">Pause</button>
                <button class="task-action-btn complete" data-id="${task.id}" data-status="completed">Complete</button>
            `;
        } else {
            actionButtons = `
                <button class="task-action-btn" data-id="${task.id}" data-status="not-started">Reopen</button>
            `;
        }

        return `
            <div class="task-card" data-id="${task.id}">
                <div class="task-card-header">
                    <span class="task-title">${task.title}</span>
                    <button class="task-delete" data-id="${task.id}">×</button>
                </div>
                <div class="task-card-footer">
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                    <div class="task-actions">${actionButtons}</div>
                </div>
            </div>
        `;
    }

    updateNotificationBadge() {
        const badge = document.getElementById('taskNotificationBadge');
        const notStartedCount = this.getTasksByStatus('not-started').length;

        if (notStartedCount > 0) {
            badge.textContent = notStartedCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    showToast(message, type = 'default') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.animation = 'toastOut 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
    }
}
