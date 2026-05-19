import { Task, CreateTaskDto, UpdateTaskDto } from '../models/Task';

// In-memory database (replace with real DB in production)
let tasks: Task[] = [
  {
    id: 1,
    name: 'Design review meeting',
    tag: 'work',
    done: false,
    date: '2026-05-19',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Submit project report',
    tag: 'urgent',
    done: false,
    date: '2026-05-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Buy groceries',
    tag: 'personal',
    done: true,
    date: '2026-05-18',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Team standup',
    tag: 'work',
    done: false,
    date: '2026-05-21',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Fix login bug',
    tag: 'todo',
    done: false,
    date: '2026-05-22',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 6;

export class TaskController {
  /**
   * Get all tasks
   */
  static getAllTasks(): Task[] {
    return tasks;
  }

  /**
   * Get task by ID
   */
  static getTaskById(id: number): Task | undefined {
    return tasks.find(t => t.id === id);
  }

  /**
   * Create a new task
   */
  static createTask(dto: CreateTaskDto): Task {
    const today = new Date().toISOString().split('T')[0];
    const newTask: Task = {
      id: nextId++,
      name: dto.name,
      tag: dto.tag || 'todo',
      done: false,
      date: dto.date || today,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  }

  /**
   * Update a task
   */
  static updateTask(id: number, dto: UpdateTaskDto): Task | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;

    if (dto.name !== undefined) task.name = dto.name;
    if (dto.tag !== undefined) task.tag = dto.tag;
    if (dto.done !== undefined) task.done = dto.done;
    if (dto.date !== undefined) task.date = dto.date;
    task.updatedAt = new Date().toISOString();

    return task;
  }

  /**
   * Delete a task
   */
  static deleteTask(id: number): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }

  /**
   * Get tasks by status
   */
  static getTasksByStatus(status: 'done' | 'pending'): Task[] {
    if (status === 'done') {
      return tasks.filter(t => t.done);
    } else {
      return tasks.filter(t => !t.done);
    }
  }

  /**
   * Get tasks by tag
   */
  static getTasksByTag(tag: string): Task[] {
    return tasks.filter(t => t.tag === tag);
  }

  /**
   * Get today's tasks
   */
  static getTodaysTasks(): Task[] {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(t => t.date === today);
  }
}
