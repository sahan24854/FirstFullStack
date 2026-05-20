import { Task, CreateTaskDto, UpdateTaskDto } from '../models/Task';
export declare class TaskController {
    /**
     * Get all tasks, optionally filtered by user ID
     */
    static getAllTasks(userId?: string): Task[];
    /**
     * Get task by ID and user ID
     */
    static getTaskById(id: number, userId?: string): Task | undefined;
    /**
     * Create a new task
     */
    static createTask(dto: CreateTaskDto): Task;
    /**
     * Update a task
     */
    static updateTask(id: number, dto: UpdateTaskDto, userId?: string): Task | undefined;
    /**
     * Delete a task
     */
    static deleteTask(id: number, userId?: string): boolean;
    /**
     * Get tasks by status
     */
    static getTasksByStatus(status: 'done' | 'pending', userId?: string): Task[];
    /**
     * Get tasks by tag
     */
    static getTasksByTag(tagId: string, userId?: string): Task[];
    /**
     * Get today's tasks
     */
    static getTodaysTasks(userId?: string): Task[];
}
//# sourceMappingURL=taskController.d.ts.map