import { Task, User } from './Task';
export declare class Database {
    private static read;
    private static write;
    static getTasks(): Task[];
    static saveTasks(tasks: Task[]): void;
    static getUsers(): User[];
    static saveUsers(users: User[]): void;
}
//# sourceMappingURL=db.d.ts.map