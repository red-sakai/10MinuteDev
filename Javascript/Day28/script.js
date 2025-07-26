// LocalStorage Demo - Todo Application with Data Persistence

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.init();
    }

    init() {
        this.createUI();
        this.bindEvents();
        this.renderTodos();
        this.displayStorageInfo();
    }

    createUI() {
        document.body.innerHTML = `
            <div class="container">
                <h1>LocalStorage Todo App</h1>
                
                <div class="add-todo">
                    <input type="text" id="todoInput" placeholder="Enter a new todo...">
                    <button id="addBtn">Add Todo</button>
                </div>
                
                <div class="filters">
                    <button id="showAll" class="active">All</button>
                    <button id="showActive">Active</button>
                    <button id="showCompleted">Completed</button>
                </div>
                
                <ul id="todoList"></ul>
                
                <div class="actions">
                    <button id="clearCompleted">Clear Completed</button>
                    <button id="clearAll">Clear All</button>
                    <button id="exportData">Export Data</button>
                    <button id="importData">Import Data</button>
                </div>
                
                <div class="storage-info">
                    <h3>Storage Information</h3>
                    <div id="storageDetails"></div>
                </div>
                
                <div class="demo-section">
                    <h3>LocalStorage API Demo</h3>
                    <button id="basicDemo">Basic Operations</button>
                    <button id="objectDemo">Object Storage</button>
                    <button id="arrayDemo">Array Storage</button>
                    <button id="storageEvents">Storage Events</button>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Todo operations
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filters
        document.getElementById('showAll').addEventListener('click', () => this.setFilter('all'));
        document.getElementById('showActive').addEventListener('click', () => this.setFilter('active'));
        document.getElementById('showCompleted').addEventListener('click', () => this.setFilter('completed'));

        // Actions
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('exportData').addEventListener('click', () => this.exportData());
        document.getElementById('importData').addEventListener('click', () => this.importData());

        // Demo buttons
        document.getElementById('basicDemo').addEventListener('click', () => this.basicStorageDemo());
        document.getElementById('objectDemo').addEventListener('click', () => this.objectStorageDemo());
        document.getElementById('arrayDemo').addEventListener('click', () => this.arrayStorageDemo());
        document.getElementById('storageEvents').addEventListener('click', () => this.storageEventsDemo());

        // Listen for storage events from other tabs
        window.addEventListener('storage', (e) => this.handleStorageEvent(e));
    }

    // Todo Management Methods
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.todos.push(todo);
            this.saveTodos();
            this.renderTodos();
            input.value = '';
            this.displayStorageInfo();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.displayStorageInfo();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`show${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
        this.renderTodos();
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        const filter = this.currentFilter || 'all';
        
        let filteredTodos = this.todos;
        if (filter === 'active') {
            filteredTodos = this.todos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
            filteredTodos = this.todos.filter(todo => todo.completed);
        }

        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="todoApp.toggleTodo(${todo.id})">
                <span class="todo-text">${todo.text}</span>
                <span class="todo-date">${new Date(todo.createdAt).toLocaleDateString()}</span>
                <button onclick="todoApp.deleteTodo(${todo.id})" class="delete-btn">Delete</button>
            </li>
        `).join('');
    }

    // LocalStorage Operations
    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
            console.log('Todos saved to localStorage');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.handleStorageError(error);
        }
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.renderTodos();
        this.displayStorageInfo();
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all todos?')) {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
            this.displayStorageInfo();
        }
    }

    // Data Import/Export
    exportData() {
        const data = {
            todos: this.todos,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todos-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.todos && Array.isArray(data.todos)) {
                            this.todos = data.todos;
                            this.saveTodos();
                            this.renderTodos();
                            this.displayStorageInfo();
                            alert('Data imported successfully!');
                        } else {
                            alert('Invalid file format');
                        }
                    } catch (error) {
                        alert('Error reading file: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // Storage Information
    displayStorageInfo() {
        const details = document.getElementById('storageDetails');
        const used = new Blob([JSON.stringify(localStorage)]).size;
        const totalItems = Object.keys(localStorage).length;
        
        details.innerHTML = `
            <p><strong>Storage Used:</strong> ${(used / 1024).toFixed(2)} KB</p>
            <p><strong>Total Items:</strong> ${totalItems}</p>
            <p><strong>Todos Count:</strong> ${this.todos.length}</p>
            <p><strong>Available:</strong> ${this.checkStorageAvailable() ? 'Yes' : 'No'}</p>
        `;
    }

    checkStorageAvailable() {
        try {
            const test = 'localStorage-test';
            localStorage.setItem(test, 'test');
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    handleStorageError(error) {
        if (error.name === 'QuotaExceededError') {
            alert('Storage quota exceeded! Please clear some data.');
        } else {
            alert('Storage error: ' + error.message);
        }
    }

    handleStorageEvent(e) {
        if (e.key === 'todos' && e.newValue) {
            console.log('Todos updated in another tab');
            this.todos = JSON.parse(e.newValue);
            this.renderTodos();
        }
    }

    // Demo Methods
    basicStorageDemo() {
        console.log('=== Basic LocalStorage Operations ===');
        
        // Set items
        localStorage.setItem('username', 'john_doe');
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('lastLogin', new Date().toISOString());
        
        // Get items
        console.log('Username:', localStorage.getItem('username'));
        console.log('Theme:', localStorage.getItem('theme'));
        console.log('Last Login:', localStorage.getItem('lastLogin'));
        
        // Update item
        localStorage.setItem('theme', 'light');
        console.log('Updated Theme:', localStorage.getItem('theme'));
        
        // Check if item exists
        console.log('Has username?', localStorage.getItem('username') !== null);
        console.log('Has email?', localStorage.getItem('email') !== null);
        
        // Remove item
        localStorage.removeItem('lastLogin');
        console.log('After removing lastLogin:', localStorage.getItem('lastLogin'));
        
        alert('Check console for basic storage demo results');
    }

    objectStorageDemo() {
        console.log('=== Object Storage Demo ===');
        
        const user = {
            id: 123,
            name: 'Alice Smith',
            email: 'alice@example.com',
            preferences: {
                theme: 'dark',
                notifications: true,
                language: 'en'
            },
            lastActive: new Date()
        };
        
        // Store object
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Stored user object');
        
        // Retrieve and parse object
        const retrievedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Retrieved user:', retrievedUser);
        
        // Update object
        retrievedUser.preferences.theme = 'light';
        retrievedUser.lastActive = new Date();
        localStorage.setItem('user', JSON.stringify(retrievedUser));
        
        console.log('Updated user:', JSON.parse(localStorage.getItem('user')));
        
        alert('Check console for object storage demo results');
    }

    arrayStorageDemo() {
        console.log('=== Array Storage Demo ===');
        
        let favorites = ['JavaScript', 'Python', 'React'];
        
        // Store array
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Stored favorites array');
        
        // Retrieve array
        let storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        console.log('Retrieved favorites:', storedFavorites);
        
        // Add to array
        storedFavorites.push('Node.js');
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        
        // Remove from array
        storedFavorites = storedFavorites.filter(item => item !== 'Python');
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        
        console.log('Final favorites:', JSON.parse(localStorage.getItem('favorites')));
        
        alert('Check console for array storage demo results');
    }

    storageEventsDemo() {
        console.log('=== Storage Events Demo ===');
        
        // This demonstrates storage events between tabs
        localStorage.setItem('demo-key', 'demo-value-' + Date.now());
        
        alert('Open another tab with this same page to see storage events in action. Then modify localStorage in one tab and watch the console in the other tab.');
    }
}

// Utility functions for localStorage management
const StorageUtils = {
    // Safe get with default value
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error parsing localStorage item:', error);
            return defaultValue;
        }
    },

    // Safe set with error handling
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting localStorage item:', error);
            return false;
        }
    },

    // Remove item
    remove(key) {
        localStorage.removeItem(key);
    },

    // Clear all localStorage
    clear() {
        localStorage.clear();
    },

    // Get all keys
    keys() {
        return Object.keys(localStorage);
    },

    // Get storage size
    getSize() {
        return new Blob([JSON.stringify(localStorage)]).size;
    },

    // Check available space (approximation)
    getAvailableSpace() {
        const testKey = 'storage-test';
        let testString = '';
        let testSize = 0;
        
        try {
            // Try to fill storage
            while (testSize < 10 * 1024 * 1024) { // 10MB limit
                testString += '0123456789';
                testSize = testString.length;
                localStorage.setItem(testKey, testString);
            }
        } catch (error) {
            localStorage.removeItem(testKey);
            return testSize;
        }
        
        localStorage.removeItem(testKey);
        return testSize;
    }
};

// Initialize the app
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
    
    // Add some CSS for better appearance
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .add-todo { margin: 20px 0; display: flex; gap: 10px; }
        #todoInput { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        button { padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; background: #007bff; color: white; }
        button:hover { background: #0056b3; }
        .filters { margin: 20px 0; display: flex; gap: 10px; }
        .filters button.active { background: #28a745; }
        .todo-item { display: flex; align-items: center; gap: 10px; padding: 10px; border-bottom: 1px solid #eee; }
        .todo-item.completed { opacity: 0.6; text-decoration: line-through; }
        .todo-text { flex: 1; }
        .todo-date { font-size: 0.8em; color: #666; }
        .delete-btn { background: #dc3545; }
        .actions, .demo-section { margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap; }
        .storage-info { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; }
        .demo-section button { background: #6f42c1; }
        h1, h3 { color: #333; }
    `;
    document.head.appendChild(style);
});
