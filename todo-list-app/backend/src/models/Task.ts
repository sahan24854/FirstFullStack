export interface Task {
  id: number;
  name: string;
  tag: 'work' | 'personal' | 'urgent' | 'todo';
  done: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  name: string;
  tag?: 'work' | 'personal' | 'urgent' | 'todo';
  date?: string;
}

export interface UpdateTaskDto {
  name?: string;
  tag?: 'work' | 'personal' | 'urgent' | 'todo';
  done?: boolean;
  date?: string;
}
