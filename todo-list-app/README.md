# Todo List Application

This is a simple Todo List web application built with a frontend in HTML/CSS and a backend using Node.js with Express and SQLite.

## Project Structure

```
todo-list-app
├── frontend
│   ├── index.html        # HTML structure of the application
│   ├── styles.css       # CSS styles for the frontend
│   └── script.js        # JavaScript for handling user interactions
├── backend
│   ├── src
│   │   ├── app.ts       # Entry point of the backend application
│   │   ├── routes
│   │   │   └── todos.ts # API routes for todo operations
│   │   ├── controllers
│   │   │   └── todoController.ts # Business logic for todos
│   │   ├── models
│   │   │   └── todo.ts  # Todo model for the SQLite database
│   │   └── types
│   │       └── index.ts # TypeScript interfaces
│   ├── package.json      # Backend dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration
│   └── .env              # Environment variables
├── README.md             # Project documentation
└── .gitignore            # Files to ignore in Git
```

## Getting Started

### Prerequisites

- Node.js
- npm
- SQLite

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd todo-list-app
   ```

2. Navigate to the backend directory and install dependencies:

   ```
   cd backend
   npm install
   ```

3. Set up the environment variables in the `.env` file. You can use the following template:

   ```
   DATABASE_URL=sqlite:./database.sqlite
   ```

4. Navigate to the frontend directory and open `index.html` in your browser.

### Running the Application

1. Start the backend server:

   ```
   cd backend
   npm start
   ```

2. Open the frontend in your browser to interact with the Todo List application.

### Usage

- Add new todos using the input field and button.
- Mark todos as completed or delete them as needed.
- The application communicates with the backend to persist data in the SQLite database.

### Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

### License

This project is licensed under the MIT License.