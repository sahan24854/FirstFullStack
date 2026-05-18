document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const addButton = document.getElementById('add-button');

    const fetchTodos = async () => {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        renderTodos(todos);
    };

    const renderTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            li.className = todo.completed ? 'completed' : '';
            li.addEventListener('click', () => toggleTodoCompletion(todo.id));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
            });
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    };

    const addTodo = async () => {
        const title = todoInput.value;
        if (title) {
            await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            todoInput.value = '';
            fetchTodos();
        }
    };

    const toggleTodoCompletion = async (id) => {
        await fetch(`/api/todos/${id}/toggle`, {
            method: 'PATCH',
        });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });
        fetchTodos();
    };

    addButton.addEventListener('click', addTodo);
    fetchTodos();
});