import { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/taskController';
import { CreateTaskDto, UpdateTaskDto } from '../models/Task';

const router = Router();

/**
 * GET /api/tasks - Get all tasks, optionally scoped by userId
 */
router.get('/tasks', (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const tasks = TaskController.getAllTasks(userId);
  res.json(tasks);
});

/**
 * GET /api/tasks/:id - Get task by ID
 */
router.get('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.query.userId as string;
  const task = TaskController.getTaskById(id, userId);
  
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
    const { name, tagId, date, userId } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Task name is required' });
    }
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const dto: CreateTaskDto = {
      name: name.trim(),
      tagId: tagId,
      date: date,
      userId: userId,
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
    const { name, tagId, done, date, userId } = req.body;
    
    const updatedTask = TaskController.updateTask(id, { name, tagId, done, date }, userId);
    
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
    const userId = req.query.userId as string;
    const deleted = TaskController.deleteTask(id, userId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

/**
 * GET /api/alerts - Get dynamic notifications for tasks due today or tomorrow
 */
router.get('/alerts', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const tasks = TaskController.getAllTasks(userId);
    const today = new Date();
    const alerts = [];

    for (const task of tasks) {
      if (!task.done && task.date) {
        const dueDate = new Date(task.date + 'T23:59:59');
        const timeDiff = dueDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff >= 0 && daysDiff <= 1) {
          alerts.push({
            id: `alert_${task.id}`,
            title: daysDiff === 0 ? 'Task Due Today' : 'Task Due Tomorrow',
            desc: `"${task.name}" is due soon. Make sure to complete it!`,
            associatedTagId: task.tagId
          });
        }
      }
    }

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

/**
 * GET /api/tasks/status/:status - Get tasks by status
 */
router.get('/tasks/status/:status', (req: Request, res: Response) => {
  const status = req.params.status as 'done' | 'pending';
  const userId = req.query.userId as string;
  
  if (status !== 'done' && status !== 'pending') {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const tasks = TaskController.getTasksByStatus(status, userId);
  res.json(tasks);
});

/**
 * GET /api/tasks/tag/:tag - Get tasks by tagId
 */
router.get('/tasks/tag/:tag', (req: Request, res: Response) => {
  const tagId = req.params.tag;
  const userId = req.query.userId as string;
  const tasks = TaskController.getTasksByTag(tagId, userId);
  res.json(tasks);
});

/**
 * GET /api/today - Get today's tasks
 */
router.get('/today', (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const tasks = TaskController.getTodaysTasks(userId);
  res.json(tasks);
});

/**
 * Health check
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default router;
