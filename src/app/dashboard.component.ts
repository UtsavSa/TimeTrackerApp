// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DashboardTaskService, DashboardTask } from '../services/dashboard-task.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   standalone: true,
//   selector: 'app-dashboard',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './dashboard.component.html',
// })
// export class DashboardComponent implements OnInit {
//   taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
//   tasks: DashboardTask[] = [];

//   constructor(
//     private taskService: DashboardTaskService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks() {
//     this.taskService.getAll().subscribe({
//       next: (data) => (this.tasks = data),
//       error: () => this.toastr.error('Failed to load tasks'),
//     });
//   }

//   getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
//     return this.tasks.filter(task => task.status === status);
//   }

//   openTaskModal(status: 'todo' | 'in-progress' | 'done') {
//     const name = prompt('Enter task name');
//     if (!name) return;

//     const description = prompt('Enter description') ?? '';
//     const storyPoints = Number(prompt('Enter story points'));
//     const hoursNeeded = Number(prompt('Estimated hours'));

//     if (isNaN(storyPoints) || isNaN(hoursNeeded)) {
//       this.toastr.error('Story points and hours must be numbers.');
//       return;
//     }

//     const newTask = {
//       name,
//       description,
//       storyPoints,
//       hoursNeeded,
//       hoursTaken: 0,
//       status,
//     };

//     this.taskService.create(newTask).subscribe({
//       next: () => {
//         this.toastr.success('Task created');
//         this.loadTasks();
//       },
//       error: () => this.toastr.error('Failed to create task'),
//     });




//   }




// }



// // src/app/dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { DashboardTaskService, DashboardTask, CreateTaskDto } from '../services/dashboard-task.service';

// @Component({
//   standalone: true,
//   selector: 'app-dashboard',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './dashboard.component.html',
// })
// export class DashboardComponent implements OnInit {
//   taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
//   tasks: DashboardTask[] = [];

//   constructor(
//     private taskService: DashboardTaskService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks(): void {
//     this.taskService.getAll().subscribe({
//       next: (data) => {
//         this.tasks = data;
//         console.log('Loaded tasks:', data);
//       },
//       error: () => this.toastr.error('Failed to load tasks'),
//     });
//   }

//   getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
//     return this.tasks.filter((task) => task.status === status);
//   }

//   updateStatus(task: DashboardTask, newStatus: DashboardTask['status']) {
//     if (task.status === newStatus) return;

//     const updatedTask: DashboardTask = { ...task, status: newStatus };

//     this.taskService.update(updatedTask).subscribe({
//       next: () => {
//         this.toastr.success('✅ Task status updated');
//         this.loadTasks();
//       },
//       error: () => this.toastr.error('❌ Failed to update task'),
//     });
//   }

//   openTaskModal(status: 'todo' | 'in-progress' | 'done') {
//     const name = prompt('Enter task name');
//     if (!name) return;

//     const description = prompt('Enter description') ?? '';
//     const storyPoints = Number(prompt('Enter story points'));
//     const hoursNeeded = Number(prompt('Estimated hours'));

//     if (isNaN(storyPoints) || isNaN(hoursNeeded)) {
//       this.toastr.error('❌ Story points and hours must be numbers.');
//       return;
//     }

//     const newTask: CreateTaskDto = {
//   name,
//   description,
//   storyPoints,
//   hoursNeeded,
//   hoursTaken: 0,
//   status,
// };


//     this.taskService.create(newTask).subscribe({
//       next: () => {
//         this.toastr.success('✅ Task created');
//         this.loadTasks();
//       },
//       error: (err) => {
//         this.toastr.error('❌ Failed to create task');
//         console.error(err);
//       },
//     });
//   }

//   deleteTask(task: DashboardTask) {
//     if (confirm(`Delete task "${task.name}"?`)) {
//       this.taskService.delete(task.id).subscribe({
//         next: () => {
//           this.toastr.success(`✅ "${task.name}" deleted`);
//           this.loadTasks();
//         },
//         error: () => {
//           this.toastr.error('❌ Failed to delete task');
//         },
//       });
//     }
//   }
// }


//------------------------------------------------------------------------



// // src/app/dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import {
//   DashboardTaskService,
//   DashboardTask,
//   CreateTaskDto,
// } from '../services/dashboard-task.service';
// import { AddTaskPopoverComponent } from './components/add-task-popover/add-task-popover.component';
// import { TaskDetailsComponent } from './components/task-details/task-details.component';

// @Component({
//   standalone: true,
//   selector: 'app-dashboard',
//   imports: [
//     CommonModule,
//     FormsModule,
//     AddTaskPopoverComponent,
//     TaskDetailsComponent,
//   ],
//   templateUrl: './dashboard.component.html',
// })
// export class DashboardComponent implements OnInit {
//   taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
//   tasks: DashboardTask[] = [];
//   selectedTask: DashboardTask | null = null;

//   constructor(
//     private taskService: DashboardTaskService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks(): void {
//     this.taskService.getAll().subscribe({
//       next: (data) => {
//         this.tasks = data;
//         console.log('Loaded tasks:', data);
//       },
//       error: () => this.toastr.error('Failed to load tasks'),
//     });
//   }

//   getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
//     return this.tasks.filter((task) => task.status === status);
//   }

//   updateStatus(task: DashboardTask, newStatus: DashboardTask['status']) {
//     if (task.status === newStatus) return;

//     const updatedTask: DashboardTask = { ...task, status: newStatus };

//     this.taskService.update(updatedTask).subscribe({
//       next: () => {
//         this.toastr.success('✅ Task status updated');
//         this.loadTasks();
//       },
//       error: () => this.toastr.error('❌ Failed to update task'),
//     });
//   }

//   handleNewTask(
//     {
//       name,
//       description,
//       storyPoints,
//       hoursNeeded,
//     }: {
//       name: string;
//       description: string;
//       storyPoints: number;
//       hoursNeeded: number;
//     },
//     status: 'todo' | 'in-progress' | 'done'
//   ) {
//     const newTask: CreateTaskDto = {
//       name,
//       description,
//       storyPoints,
//       hoursNeeded,
//       hoursTaken: 0,
//       status,
//     };

//     this.taskService.create(newTask).subscribe({
//       next: () => {
//         this.toastr.success('✅ Task created');
//         this.loadTasks();
//       },
//       error: (err) => {
//         this.toastr.error('❌ Failed to create task');
//         console.error(err);
//       },
//     });
//   }

//   deleteTask(task: DashboardTask) {
//     if (confirm(`Delete task "${task.name}"?`)) {
//       this.taskService.delete(task.id).subscribe({
//         next: () => {
//           this.toastr.success(`✅ "${task.name}" deleted`);
//           this.loadTasks();
//         },
//         error: () => {
//           this.toastr.error('❌ Failed to delete task');
//         },
//       });
//     }
//   }

//   openTask(task: DashboardTask) {
//     this.selectedTask = task;
//   }

//   closeTaskDetails() {
//     this.selectedTask = null;
//   }


//   updateTaskHours(task: DashboardTask) {
//   // Optional: validate hoursTaken
//   if (task.hoursTaken < 0 || task.hoursTaken > task.hoursNeeded) {
//     this.toastr.warning('Invalid hours entered');
//     this.loadTasks(); // Reload to revert UI
//     return;
//   }

//   this.taskService.update(task).subscribe({
//     next: () => {
//       this.toastr.success('🕒 Hours updated');
//       this.loadTasks();
//     },
//     error: () => {
//       this.toastr.error('❌ Failed to update hours');
//     },
//   });
// }

// }






//-------------------------------------------------------------------



// // src/app/dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { DashboardTaskService, DashboardTask, CreateTaskDto } from '../services/dashboard-task.service';
// import { SprintService } from '../services/sprint.service';
// import { Sprint } from '../models/sprint.model';
// import { AddTaskPopoverComponent } from './components/add-task-popover/add-task-popover.component';
// import { TaskDetailsComponent } from './components/task-details/task-details.component';

// @Component({
//   standalone: true,
//   selector: 'app-dashboard',
//   imports: [
//     CommonModule,
//     FormsModule,
//     AddTaskPopoverComponent,
//     TaskDetailsComponent,
//   ],
//   templateUrl: './dashboard.component.html',
// })
// export class DashboardComponent implements OnInit {
//   taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
//   tasks: DashboardTask[] = [];
//   sprints: Sprint[] = [];
//   selectedSprint: Sprint | null = null;
//   selectedTask: DashboardTask | null = null;
//   addTaskStatus: 'todo' | 'in-progress' | 'done' | null = null;

//   constructor(
//     private taskService: DashboardTaskService,
//     private sprintService: SprintService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.loadSprints();
//   }

//   loadSprints() {
//     this.sprintService.getMySprints().subscribe({
//       next: (data) => {
//         this.sprints = data;
//         if (data.length > 0) {
//           this.selectedSprint = data[0];
//           this.loadTasksForSprint(data[0].id);
//         } else {
//           this.selectedSprint = null;
//           this.loadUnassignedTasks();
//         }
//       },
//       error: () => this.toastr.error('❌ Failed to load sprints'),
//     });
//   }

//   loadTasksForSprint(sprintId: string): void {
//     this.taskService.getBySprint(sprintId).subscribe({
//       next: (data) => (this.tasks = data),
//       error: () => this.toastr.error('❌ Failed to load tasks'),
//     });
//   }

//   loadUnassignedTasks() {
//     this.taskService.getAll().subscribe({
//       next: (data) => {
//         this.tasks = data.filter((task) => !task.sprintId);
//       },
//       error: () => this.toastr.error('❌ Failed to load unassigned tasks'),
//     });
//   }

//   handleSprintChange(event: Event) {
//     const selectElement = event.target as HTMLSelectElement;
//     const sprintId = selectElement.value;
//     this.onSprintChange(sprintId);
//   }

//   onSprintChange(sprintId: string) {
//     if (!sprintId) {
//       this.selectedSprint = null;
//       this.loadUnassignedTasks();
//     } else {
//       const sprint = this.sprints.find((s) => s.id === sprintId);
//       if (sprint) {
//         this.selectedSprint = sprint;
//         this.loadTasksForSprint(sprint.id);
//       }
//     }
//   }

//   getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
//     return this.tasks.filter((task) => task.status === status);
//   }

//   openTask(task: DashboardTask) {
//     this.selectedTask = task;
//   }

//   closeTaskDetails() {
//     this.selectedTask = null;
//   }

//   showAddTaskPopover(status: 'todo' | 'in-progress' | 'done') {
//   this.addTaskStatus = this.addTaskStatus === status ? null : status;
// }


//   handleNewTask(
//     {
//       name,
//       description,
//       storyPoints,
//       hoursNeeded,
//     }: {
//       name: string;
//       description: string;
//       storyPoints: number;
//       hoursNeeded: number;
//     }
//   ) {
//     if (!this.addTaskStatus) return;

//     const newTask: CreateTaskDto = {
//       name,
//       description,
//       storyPoints,
//       hoursNeeded,
//       hoursTaken: 0,
//       status: this.addTaskStatus,
//       sprintId: this.selectedSprint?.id,
//     };

//     this.taskService.create(newTask).subscribe({
//       next: () => {
//         this.toastr.success('✅ Task created');
//         if (this.selectedSprint) {
//           this.loadTasksForSprint(this.selectedSprint.id);
//         } else {
//           this.loadUnassignedTasks();
//         }
//         this.addTaskStatus = null;
//       },
//       error: () => {
//         this.toastr.error('❌ Failed to create task');
//         this.addTaskStatus = null;
//       },
//     });
//   }

//   deleteTask(task: DashboardTask) {
//     if (confirm(`Delete task "${task.name}"?`)) {
//       this.taskService.delete(task.id).subscribe({
//         next: () => {
//           this.toastr.success(`✅ "${task.name}" deleted`);
//           if (this.selectedSprint) {
//             this.loadTasksForSprint(this.selectedSprint.id);
//           } else {
//             this.loadUnassignedTasks();
//           }
//         },
//         error: () => this.toastr.error('❌ Failed to delete task'),
//       });
//     }
//   }

//   updateTaskHours(task: DashboardTask) {
//     if (task.hoursTaken < 0 || task.hoursTaken > task.hoursNeeded) {
//       this.toastr.warning('Invalid hours entered');
//       this.loadSprints();
//       return;
//     }

//     this.taskService.update(task).subscribe({
//       next: () => this.toastr.success('🕒 Hours updated'),
//       error: () => this.toastr.error('❌ Failed to update hours'),
//     });
//   }

//   updateStatus(task: DashboardTask, newStatus: DashboardTask['status']) {
//     if (task.status === newStatus) return;

//     const updatedTask: DashboardTask = { ...task, status: newStatus };

//     this.taskService.update(updatedTask).subscribe({
//       next: () => {
//         this.toastr.success('✅ Task status updated');
//         if (this.selectedSprint) {
//           this.loadTasksForSprint(this.selectedSprint.id);
//         } else {
//           this.loadUnassignedTasks();
//         }
//       },
//       error: () => this.toastr.error('❌ Failed to update task'),
//     });
//   }
// }



// src/app/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {
  DashboardTaskService,
  DashboardTask,
  CreateTaskDto,
} from '../services/dashboard-task.service';

import { SprintService } from '../services/sprint.service';
import { Sprint } from '../models/sprint.model';
import { CreateSprintDto } from '../models/create-sprint-dto.model';

import { AddTaskPopoverComponent } from './components/add-task-popover/add-task-popover.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

import { NgIcon } from '@ng-icons/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    AddTaskPopoverComponent,
    TaskDetailsComponent,
    NgIcon,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
  tasks: DashboardTask[] = [];
  selectedTask: DashboardTask | null = null;

  sprints: Sprint[] = [];
  selectedSprint: Sprint | null = null;
  selectedSprintId: string = '';
  selectedSprintUserEmails: string[] = [];
  isSprintCreator: boolean = false;

  readonly MAX_SPRINT_NAME = 40;
  readonly NAME_WARN_THRESHOLD = 30;

  creatingSprint = false;
  newSprint: CreateSprintDto = { name: '', startDate: '', endDate: '' };
  inviteEmail: string = '';
  addTaskStatus: 'todo' | 'in-progress' | 'done' | null = null;


  savingSprint = false;
  todayStr = new Date().toISOString().slice(0, 10);

  constructor(
    private taskService: DashboardTaskService,
    private sprintService: SprintService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadSprints();
  }

  getCurrentUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['email'] || null;
    } catch {
      return null;
    }
  }

  loadSprints(): void {
    this.sprintService.getMySprints().subscribe({
      next: (data) => {
        this.sprints = data;
        if (data.length > 0) {
          this.selectSprint(data[0].id);
        } else {
          this.selectedSprint = null;
          this.selectedSprintId = '';
          this.loadUnassignedTasks();
        }
      },
      error: () => this.toastr.error('❌ Failed to load sprints'),
    });
  }

  selectSprint(sprintId: string): void {
    this.selectedSprintId = sprintId;
    if (!sprintId) {
      this.selectedSprint = null;
      this.selectedSprintUserEmails = [];
      this.loadUnassignedTasks();
      return;
    }

    const sprint = this.sprints.find(s => s.id === sprintId);
    if (sprint) {
      this.selectedSprint = sprint;
      this.loadTasksForSprint(sprint.id);
      this.loadSprintUsers(sprint.id);
      const email = this.getCurrentUserEmail();
      this.isSprintCreator = !!email && sprint.createdBy === email;
    }
  }

  loadTasksForSprint(sprintId: string): void {
    this.taskService.getBySprint(sprintId).subscribe({
      next: (data) => this.tasks = data,
      error: () => this.toastr.error('❌ Failed to load tasks'),
    });
  }

  loadUnassignedTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data.filter(t => !t.sprintId);
      },
      error: () => this.toastr.error('❌ Failed to load tasks'),
    });
  }

  loadSprintUsers(sprintId: string): void {
    this.sprintService.getSprintUsers(sprintId).subscribe({
      next: (users) => this.selectedSprintUserEmails = users,
      error: () => this.toastr.error('❌ Failed to load sprint users'),
    });
  }

  inviteUserToSprint(): void {
    if (!this.selectedSprint || !this.inviteEmail) return;

    this.sprintService.inviteUser(this.selectedSprint.id, this.inviteEmail).subscribe({
      next: () => {
        this.toastr.success('✅ User invited');
        this.loadSprintUsers(this.selectedSprint!.id);
        this.inviteEmail = '';
      },
      error: () => this.toastr.error('❌ Failed to invite user'),
    });
  }

  onSprintNameInput() {
    const n = this.newSprint.name || '';
    if (n.length > this.MAX_SPRINT_NAME) {
      this.newSprint.name = n.slice(0, this.MAX_SPRINT_NAME);
    }
  }

  // createSprint(): void {
  //   const { name, startDate, endDate } = this.newSprint;
  //   if (!name || !startDate || !endDate) {
  //     this.toastr.warning('⚠️ Fill in all sprint fields');
  //     return;
  //   }

  //   this.sprintService.createSprint(this.newSprint).subscribe({
  //     next: (sprint) => {
  //       this.sprints.push(sprint);
  //       this.selectSprint(sprint.id);
  //       this.creatingSprint = false;
  //       this.newSprint = { name: '', startDate: '', endDate: '' };
  //       this.toastr.success('✅ Sprint created');
  //     },
  //     error: () => this.toastr.error('❌ Failed to create sprint'),
  //   });
  // }

  createSprint(): void {
    const name = (this.newSprint.name || '').trim();
    const { startDate, endDate } = this.newSprint;

    if (!name || !startDate || !endDate) {
      this.toastr.warning('⚠️ Fill in all sprint fields');
      return;
    }
    if (name.length > this.MAX_SPRINT_NAME) {
      this.toastr.warning(`⚠️ Sprint name must be ≤ ${this.MAX_SPRINT_NAME} characters`);
      return;
    }

    this.savingSprint = true;
    this.newSprint.name = name;

    this.sprintService.createSprint(this.newSprint).subscribe({
      next: (sprint) => {
        this.savingSprint = false;
        this.sprints.push(sprint);
        this.selectSprint(sprint.id);
        this.creatingSprint = false;
        this.newSprint = { name: '', startDate: '', endDate: '' };
        this.toastr.success('✅ Sprint created');
      },
      error: () => {
        this.savingSprint = false;
        this.toastr.error('❌ Failed to create sprint');
      },
    });
  }


  deleteSprint(): void {
    if (!this.selectedSprint) return;

    const confirmDelete = confirm('Are you sure you want to delete this sprint?');
    if (!confirmDelete) return;

    const id = this.selectedSprint.id;
    this.sprintService.deleteSprint(id).subscribe({
      next: () => {
        this.sprints = this.sprints.filter(s => s.id !== id);
        this.selectedSprint = null;
        this.selectedSprintId = '';
        this.loadUnassignedTasks();
        this.toastr.success('✅ Sprint deleted');
      },
      error: () => this.toastr.error('❌ Failed to delete sprint'),
    });
  }

  showAddTaskPopover(status: 'todo' | 'in-progress' | 'done'): void {
    this.addTaskStatus = this.addTaskStatus === status ? null : status;
  }

  getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
    return this.tasks.filter(task => task.status === status);
  }

  handleNewTask({ name, description, storyPoints, hoursNeeded }: {
    name: string;
    description: string;
    storyPoints: number;
    hoursNeeded: number;
  }): void {
    const newTask: CreateTaskDto = {
      name,
      description,
      storyPoints,
      hoursNeeded,
      hoursTaken: 0,
      status: this.addTaskStatus!,
      sprintId: this.selectedSprint?.id,
    };

    this.taskService.create(newTask).subscribe({
      next: () => {
        this.toastr.success('✅ Task created');
        this.refreshTasks();
        this.addTaskStatus = null;
      },
      error: () => this.toastr.error('❌ Failed to create task'),
    });
  }

  updateStatus(task: DashboardTask, newStatus: DashboardTask['status']): void {
    if (task.status === newStatus) return;

    const updated: DashboardTask = { ...task, status: newStatus };
    this.taskService.update(updated).subscribe({
      next: () => this.refreshTasks(),
      error: () => this.toastr.error('❌ Failed to update status'),
    });
  }

  updateTaskHours(task: DashboardTask): void {
    if (task.hoursTaken < 0 || task.hoursTaken > task.hoursNeeded) {
      this.toastr.warning('⚠️ Invalid hours entered');
      this.refreshTasks();
      return;
    }

    this.taskService.update(task).subscribe({
      next: () => this.toastr.success('✅ Hours updated'),
      error: () => this.toastr.error('❌ Failed to update hours'),
    });
  }

  deleteTask(task: DashboardTask): void {
    if (!confirm(`Delete task "${task.name}"?`)) return;

    this.taskService.delete(task.id).subscribe({
      next: () => this.refreshTasks(),
      error: () => this.toastr.error('❌ Failed to delete task'),
    });
  }

  refreshTasks(): void {
    if (this.selectedSprint) {
      this.loadTasksForSprint(this.selectedSprint.id);
    } else {
      this.loadUnassignedTasks();
    }
  }

  openTask(task: DashboardTask): void {
    this.selectedTask = task;
  }

  closeTaskDetails(): void {
    this.selectedTask = null;
  }

  onSprintChange(sprintId: string): void {
    this.selectSprint(sprintId);
  }

  // adding the sprintDate feature

  // --- Date utils ---
private parseDate(dateStr: string): Date {
  // Accept "YYYY-MM-DD" or ISO strings
  let d = new Date(dateStr);
  if (isNaN(d.getTime())) d = new Date(`${dateStr}T00:00:00`);
  return d;
}
private startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
formatDate(dateStr?: string | null): string {
  if (!dateStr) return '—';
  const d = this.parseDate(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// --- Computed sprint info ---
get sprintProgressPercent(): number {
  const s = this.selectedSprint;
  if (!s?.startDate || !s?.endDate) return 0;

  const start = this.startOfDay(this.parseDate(s.startDate));
  const end = this.startOfDay(this.parseDate(s.endDate));
  const today = this.startOfDay(new Date());

  const total = end.getTime() - start.getTime();
  if (total <= 0) return 100;

  const elapsed = today.getTime() - start.getTime();
  const pct = (elapsed / total) * 100;

  return Math.max(0, Math.min(100, Math.round(pct)));
}
get sprintDaysLeftText(): string {
  const s = this.selectedSprint;
  if (!s?.startDate || !s?.endDate) return '';

  const start = this.startOfDay(this.parseDate(s.startDate));
  const end = this.startOfDay(this.parseDate(s.endDate));
  const today = this.startOfDay(new Date());

  const DAY = 24 * 60 * 60 * 1000;

  if (today < start) {
    const days = Math.max(0, Math.round((start.getTime() - today.getTime()) / DAY));
    return `Starts in ${days} day${days === 1 ? '' : 's'}`;
  }
  if (today > end) {
    const days = Math.max(0, Math.round((today.getTime() - end.getTime()) / DAY));
    return `Ended ${days} day${days === 1 ? '' : 's'} ago`;
  }
  // during sprint (inclusive of today)
  const daysLeft = Math.max(0, Math.round((end.getTime() - today.getTime()) / DAY));
  return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
}


get nameLen(): number {
  return this.newSprint.name.length; // always a string in your model
}


}
