import { Request, Response } from 'express';
import { TaskModel, Task } from '../models/Task';

const taskModel = new TaskModel();

export const getTasks = (req: Request, res: Response): void => {
  try {
    const { status, tag } = req.query;

    let tasks = taskModel.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (tag) {
      tasks = tasks.filter(task => task.tag === tag);
    }

    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks',
    });
  }
};

export const getTaskById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const task = taskModel.getTaskById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Task not found',
      });
      return;
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task',
    });
  }
};

export const createTask = (req: Request, res: Response): void => {
  try {
    const { title, description, tag, dueDate, dueTime, priority } = req.body;

    if (!title || !tag) {
      res.status(400).json({
        success: false,
        error: 'Title and tag are required',
      });
      return;
    }

    const newTask = taskModel.createTask({
      title,
      description,
      tag,
      dueDate,
      dueTime,
      priority,
      status: 'pending',
      completed: false,
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create task',
    });
  }
};

export const updateTask = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTask = taskModel.updateTask(id, updateData);

    if (!updatedTask) {
      res.status(404).json({
        success: false,
        error: 'Task not found',
      });
      return;
    }

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update task',
    });
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = taskModel.deleteTask(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Task not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete task',
    });
  }
};

export const toggleTask = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updatedTask = taskModel.toggleTaskStatus(id);

    if (!updatedTask) {
      res.status(404).json({
        success: false,
        error: 'Task not found',
      });
      return;
    }

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to toggle task',
    });
  }
};
