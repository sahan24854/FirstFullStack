class TodoController {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }

    async getAllTodos(req, res) {
        try {
            const todos = await this.todoModel.findAll();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving todos', error });
        }
    }

    async createTodo(req, res) {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        try {
            const newTodo = await this.todoModel.create({ title, completed: false });
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(500).json({ message: 'Error creating todo', error });
        }
    }

    async updateTodo(req, res) {
        const { id } = req.params;
        const { title, completed } = req.body;

        try {
            const updatedTodo = await this.todoModel.update(id, { title, completed });
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(500).json({ message: 'Error updating todo', error });
        }
    }

    async deleteTodo(req, res) {
        const { id } = req.params;

        try {
            const deletedTodo = await this.todoModel.delete(id);
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting todo', error });
        }
    }
}

export default TodoController;