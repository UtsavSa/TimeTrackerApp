export interface TimeEntry {
  id?: string;
  taskName: string;
  punchInTime?: string | Date;
  punchOutTime?: string | Date;
  userId: string;
}
