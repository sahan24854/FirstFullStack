import { Router } from 'express';
import TodoController from '../controllers/todoController';

const router = Router();
const todoController = new TodoController();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;