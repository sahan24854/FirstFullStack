import fs from 'fs';
import path from 'path';
import { Task, User, Tag } from './Task';

const DB_FILE_PATH = path.join(__dirname, '../../data.json');

interface Schema {
  users: User[];
  tasks: Task[];
}

const defaultData: Schema = {
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

export class Database {
  private static read(): Schema {
    try {
      if (!fs.existsSync(DB_FILE_PATH)) {
        this.write(defaultData);
        return defaultData;
      }
      const dataStr = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      return JSON.parse(dataStr);
    } catch (error) {
      console.error('Failed to read database file, returning default:', error);
      return defaultData;
    }
  }

  private static write(data: Schema): void {
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to write database file:', error);
    }
  }

  // Tasks
  static getTasks(): Task[] {
    return this.read().tasks;
  }

  static saveTasks(tasks: Task[]): void {
    const data = this.read();
    data.tasks = tasks;
    this.write(data);
  }

  // Users
  static getUsers(): User[] {
    return this.read().users;
  }

  static saveUsers(users: User[]): void {
    const data = this.read();
    data.users = users;
    this.write(data);
  }
}
