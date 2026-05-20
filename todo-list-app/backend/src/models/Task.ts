export interface Tag {
  id: string;
  name: string;
  color: 'work' | 'personal' | 'urgent' | 'todo';
}

export interface User {
  id: string;
  email: string;
  profile: {
    name: string;
    bio: string;
  };
  settings: {
    theme: 'light' | 'dark';
    colorTheme: 'default' | 'emerald' | 'ocean' | 'sunset';
    language: 'en' | 'si';
  };
  tags: Tag[];
}

export interface Task {
  id: number;
  name: string;
  tagId: string;
  done: boolean;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  name: string;
  tagId: string;
  date?: string;
  userId: string;
}

export interface UpdateTaskDto {
  name?: string;
  tagId?: string;
  done?: boolean;
  date?: string;
}
