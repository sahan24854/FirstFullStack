import { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/taskController';
import { CreateTaskDto, UpdateTaskDto } from '../models/Task';

const router = Router();

/**
 * GET /api/tasks - Get all tasks
 */
router.get('/tasks', (req: Request, res: Response) => {
  const tasks = TaskController.getAllTasks();
  res.json(tasks);
});

/**
 * GET /api/tasks/:id - Get task by ID
 */
router.get('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = TaskController.getTaskById(id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

/**
 * POST /api/tasks - Create a new task
 */
router.post('/tasks', (req: Request, res: Response) => {
  try {
    const { name, tag, date } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Task name is required' });
    }
    
    const dto: CreateTaskDto = {
      name: name.trim(),
      tag: tag || 'todo',
      date: date,
    };
    
    const newTask = TaskController.createTask(dto);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

/**
 * PUT /api/tasks/:id - Update a task
 */
router.put('/tasks/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const dto: UpdateTaskDto = req.body;
    
    const updatedTask = TaskController.updateTask(id, dto);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

/**
 * DELETE /api/tasks/:id - Delete a task
 */
router.delete('/tasks/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = TaskController.deleteTask(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

/**
 * GET /api/tasks/status/:status - Get tasks by status
 */
router.get('/tasks/status/:status', (req: Request, res: Response) => {
  const status = req.params.status as 'done' | 'pending';
  
  if (status !== 'done' && status !== 'pending') {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const tasks = TaskController.getTasksByStatus(status);
  res.json(tasks);
});

/**
 * GET /api/tasks/tag/:tag - Get tasks by tag
 */
router.get('/tasks/tag/:tag', (req: Request, res: Response) => {
  const tag = req.params.tag;
  const tasks = TaskController.getTasksByTag(tag);
  res.json(tasks);
});

/**
 * GET /api/tasks/today - Get today's tasks
 */
router.get('/today', (req: Request, res: Response) => {
  const tasks = TaskController.getTodaysTasks();
  res.json(tasks);
});

/**
 * Health check
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default router;
