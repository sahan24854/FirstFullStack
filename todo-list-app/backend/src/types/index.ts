export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface Request {
    body: {
        title: string;
        completed?: boolean;
    };
}