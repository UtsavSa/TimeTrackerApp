export interface Task {
  id: string;
  name: string;
  description: string;
  storyPoints: number;
  hoursNeeded: number;
  hoursTaken: number;
  status: 'todo' | 'in-progress' | 'done';
  assignedTo?: string;
}
