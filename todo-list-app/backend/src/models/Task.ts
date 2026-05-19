import { v4 as uuidv4 } from 'uuid';

export type TaskTag = 'Work' | 'Todo' | 'Personal' | 'Urgent';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  tag: TaskTag;
  dueDate?: string;
  dueTime?: string;
  priority?: 'low' | 'medium' | 'high';
  status: TaskStatus;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export class TaskModel {
  private tasks: Task[] = [];

  constructor() {
    this.initializeSampleTasks();
  }

  private initializeSampleTasks(): void {
    this.tasks = [
      {
        id: uuidv4(),
        title: 'Design the Application in Figma',
        tag: 'Work',
        dueTime: '1:00 PM',
        status: 'pending',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Set Up VS Code with MCP',
        tag: 'Todo',
        dueTime: '2:00 PM',
        status: 'pending',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Integrate with GitHub',
        tag: 'Work',
        dueTime: '3:00 PM',
        status: 'pending',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Configure Azure DevOps',
        tag: 'Todo',
        dueTime: '3:30 PM',
        status: 'pending',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const task: Task = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, data: Partial<Task>): Task | undefined {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return undefined;

    this.tasks[index] = {
      ...this.tasks[index],
      ...data,
      id: this.tasks[index].id,
      createdAt: this.tasks[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return this.tasks[index];
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  toggleTaskStatus(id: string): Task | undefined {
    const task = this.getTaskById(id);
    if (!task) return undefined;

    return this.updateTask(id, {
      completed: !task.completed,
      status: task.completed ? 'pending' : 'completed',
    });
  }
}
