# SmartSave - Savings Calculator

A professional, elegant savings calculator web application that helps you visualize your income allocation and track spending patterns over time.

![SmartSave](https://img.shields.io/badge/Version-1.0.0-E8A87C) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 💰 Income Allocation
- Enter principal amount manually or use quick-select buttons
- Set custom percentages for each spending category
- Real-time calculation updates as you type

### 📂 Category Management
- **Default Categories**: Rent/Housing, Food & Groceries, Transportation, Entertainment, Utilities
- Add custom categories with personalized names, percentages, and colors
- Delete or modify existing categories
- Visual color coding for easy identification

### 📊 Data Visualization
- **Doughnut Chart**: Allocation overview with savings breakdown
- **Line Chart**: Spending trends over time
- **Bar Chart**: Compare current vs. historical averages

### 📈 Trend Tracking
- Save snapshots of your current allocation
- View history of all saved configurations
- Track spending patterns across multiple periods
- Data persists in local storage

### ✅ Task Manager
- **Kanban Board**: Visual task board with three status columns
- **Status Tracking**: Not Started, In Progress, Completed
- **Priority Levels**: Low, Medium, High priority tags
- **Notification Badge**: Shows count of pending (not started) tasks
- **Quick Actions**: Start, Pause, Complete, or Reopen tasks
- **Persistent Storage**: Tasks saved in local storage


## 🎨 Design

- **Color Palette**: Elegant cream (#FFF9E8) and light orange (#E8A87C)
- **Typography**: Playfair Display (headings) + Inter (body text)
- **Style**: Professional, classy, and modern
- **Responsive**: Optimized for desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser

```bash
# Or serve locally with any static server
npx serve .
```

## 📁 Project Structure

```
Savings/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and design system
├── app.js          # Application logic and Chart.js integration
└── README.md       # Project documentation
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)** - Class-based architecture
- **Chart.js** - Data visualization
- **Google Fonts** - Playfair Display & Inter

## 📱 Usage

1. **Enter Principal Amount**: Type your income/savings or click a quick-select button
2. **Adjust Categories**: Modify percentages for each category
3. **Add Custom Categories**: Use the "Add Category" section for personalized tracking
4. **View Breakdown**: Scroll to see the allocation chart and summary
5. **Save Snapshots**: Click "Save Current Snapshot" to track trends over time
6. **Analyze Trends**: View the Trends section to compare spending patterns

## 🔧 Customization

### Adding Default Categories
Edit the `defaultCategories` array in `app.js`:
```javascript
this.defaultCategories = [
    { id: 1, name: 'Category Name', percentage: 20, color: '#E8A87C' },
    // Add more...
];
```

### Changing Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --cream-100: #FFF9E8;
    --orange-400: #E8A87C;
    /* Customize as needed */
}
```

## 📄 License

MIT License - feel free to use and modify for your projects.

## 👤 Author

**David Kyalo** - © 2026

---

*Your path to financial wellness starts here.*

