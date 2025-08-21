// src/app/models/sprint.model.ts
// export interface Sprint {
//   id: string;
//   name: string;
//   startDate: string;
//   endDate: string;
//   createdByUserName?: string;
// }


// src/app/models/sprint.model.ts

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalStoryPoints: number;
  totalHoursTaken: number;
  userEmails: string[];        // ✅ emails of all users in the sprint
  createdBy: string;           // ✅ email of creator
}
