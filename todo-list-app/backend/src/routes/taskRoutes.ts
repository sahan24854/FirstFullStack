import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from '../controllers/taskController';

const router = Router();

// Get all tasks (with optional filters)
router.get('/', getTasks);

// Get a specific task
router.get('/:id', getTaskById);

// Create a new task
router.post('/', createTask);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

// Toggle task completion status
router.patch('/:id/toggle', toggleTask);

export default router;
