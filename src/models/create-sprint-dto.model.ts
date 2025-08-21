// src/app/models/create-sprint-dto.model.ts

export interface CreateSprintDto {
  name: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
}
