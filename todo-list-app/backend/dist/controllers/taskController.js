"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const db_1 = require("../models/db");
class TaskController {
    /**
     * Get all tasks, optionally filtered by user ID
     */
    static getAllTasks(userId) {
        const allTasks = db_1.Database.getTasks();
        if (userId) {
            return allTasks.filter(t => t.userId === userId);
        }
        return allTasks;
    }
    /**
     * Get task by ID and user ID
     */
    static getTaskById(id, userId) {
        const allTasks = db_1.Database.getTasks();
        return allTasks.find(t => t.id === id && (!userId || t.userId === userId));
    }
    /**
     * Create a new task
     */
    static createTask(dto) {
        const allTasks = db_1.Database.getTasks();
        const maxId = allTasks.reduce((max, t) => t.id > max ? t.id : max, 0);
        const nextId = maxId + 1;
        const today = new Date().toISOString().split('T')[0];
        const newTask = {
            id: nextId,
            name: dto.name,
            tagId: dto.tagId,
            done: false,
            date: dto.date || today,
            userId: dto.userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        allTasks.push(newTask);
        db_1.Database.saveTasks(allTasks);
        return newTask;
    }
    /**
     * Update a task
     */
    static updateTask(id, dto, userId) {
        const allTasks = db_1.Database.getTasks();
        const taskIndex = allTasks.findIndex(t => t.id === id && (!userId || t.userId === userId));
        if (taskIndex === -1)
            return undefined;
        const task = allTasks[taskIndex];
        if (dto.name !== undefined)
            task.name = dto.name;
        if (dto.tagId !== undefined)
            task.tagId = dto.tagId;
        if (dto.done !== undefined)
            task.done = dto.done;
        if (dto.date !== undefined)
            task.date = dto.date;
        task.updatedAt = new Date().toISOString();
        allTasks[taskIndex] = task;
        db_1.Database.saveTasks(allTasks);
        return task;
    }
    /**
     * Delete a task
     */
    static deleteTask(id, userId) {
        const allTasks = db_1.Database.getTasks();
        const index = allTasks.findIndex(t => t.id === id && (!userId || t.userId === userId));
        if (index === -1)
            return false;
        allTasks.splice(index, 1);
        db_1.Database.saveTasks(allTasks);
        return true;
    }
    /**
     * Get tasks by status
     */
    static getTasksByStatus(status, userId) {
        const tasks = this.getAllTasks(userId);
        if (status === 'done') {
            return tasks.filter(t => t.done);
        }
        else {
            return tasks.filter(t => !t.done);
        }
    }
    /**
     * Get tasks by tag
     */
    static getTasksByTag(tagId, userId) {
        const tasks = this.getAllTasks(userId);
        return tasks.filter(t => t.tagId === tagId);
    }
    /**
     * Get today's tasks
     */
    static getTodaysTasks(userId) {
        const tasks = this.getAllTasks(userId);
        const today = new Date().toISOString().split('T')[0];
        return tasks.filter(t => t.date === today);
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=taskController.js.map