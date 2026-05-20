"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DB_FILE_PATH = path_1.default.join(__dirname, '../../data.json');
const defaultData = {
    users: [
        {
            id: "demo_user",
            email: "demo@domain.com",
            profile: { name: "Demo User", bio: "Full stack developer apprentice." },
            settings: { theme: 'light', colorTheme: 'default', language: 'en' },
            tags: [
                { id: "t1", name: "Work", color: "work" },
                { id: "t2", name: "Personal", color: "personal" },
                { id: "t3", name: "Urgent", color: "urgent" },
                { id: "t4", name: "Todo", color: "todo" }
            ]
        }
    ],
    tasks: [
        {
            id: 1,
            name: 'Design review meeting',
            tagId: 't1',
            done: false,
            date: new Date().toISOString().split('T')[0],
            userId: 'demo_user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 2,
            name: 'Submit project report',
            tagId: 't3',
            done: false,
            date: new Date().toISOString().split('T')[0],
            userId: 'demo_user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 3,
            name: 'Buy groceries',
            tagId: 't2',
            done: true,
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            userId: 'demo_user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ]
};
class Database {
    static read() {
        try {
            if (!fs_1.default.existsSync(DB_FILE_PATH)) {
                this.write(defaultData);
                return defaultData;
            }
            const dataStr = fs_1.default.readFileSync(DB_FILE_PATH, 'utf-8');
            return JSON.parse(dataStr);
        }
        catch (error) {
            console.error('Failed to read database file, returning default:', error);
            return defaultData;
        }
    }
    static write(data) {
        try {
            fs_1.default.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Failed to write database file:', error);
        }
    }
    // Tasks
    static getTasks() {
        return this.read().tasks;
    }
    static saveTasks(tasks) {
        const data = this.read();
        data.tasks = tasks;
        this.write(data);
    }
    // Users
    static getUsers() {
        return this.read().users;
    }
    static saveUsers(users) {
        const data = this.read();
        data.users = users;
        this.write(data);
    }
}
exports.Database = Database;
//# sourceMappingURL=db.js.map