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
import { AddTaskPopoverComponent } from './components/add-task-popover/add-task-popover.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    AddTaskPopoverComponent,
    TaskDetailsComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
  tasks: DashboardTask[] = [];
  selectedTask: DashboardTask | null = null;

  constructor(
    private taskService: DashboardTaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Loaded tasks:', data);
      },
      error: () => this.toastr.error('Failed to load tasks'),
    });
  }

  getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
    return this.tasks.filter((task) => task.status === status);
  }

  updateStatus(task: DashboardTask, newStatus: DashboardTask['status']) {
    if (task.status === newStatus) return;

    const updatedTask: DashboardTask = { ...task, status: newStatus };

    this.taskService.update(updatedTask).subscribe({
      next: () => {
        this.toastr.success('✅ Task status updated');
        this.loadTasks();
      },
      error: () => this.toastr.error('❌ Failed to update task'),
    });
  }

  handleNewTask(
    {
      name,
      description,
      storyPoints,
      hoursNeeded,
    }: {
      name: string;
      description: string;
      storyPoints: number;
      hoursNeeded: number;
    },
    status: 'todo' | 'in-progress' | 'done'
  ) {
    const newTask: CreateTaskDto = {
      name,
      description,
      storyPoints,
      hoursNeeded,
      hoursTaken: 0,
      status,
    };

    this.taskService.create(newTask).subscribe({
      next: () => {
        this.toastr.success('✅ Task created');
        this.loadTasks();
      },
      error: (err) => {
        this.toastr.error('❌ Failed to create task');
        console.error(err);
      },
    });
  }

  deleteTask(task: DashboardTask) {
    if (confirm(`Delete task "${task.name}"?`)) {
      this.taskService.delete(task.id).subscribe({
        next: () => {
          this.toastr.success(`✅ "${task.name}" deleted`);
          this.loadTasks();
        },
        error: () => {
          this.toastr.error('❌ Failed to delete task');
        },
      });
    }
  }

  openTask(task: DashboardTask) {
    this.selectedTask = task;
  }

  closeTaskDetails() {
    this.selectedTask = null;
  }


  updateTaskHours(task: DashboardTask) {
  // Optional: validate hoursTaken
  if (task.hoursTaken < 0 || task.hoursTaken > task.hoursNeeded) {
    this.toastr.warning('Invalid hours entered');
    this.loadTasks(); // Reload to revert UI
    return;
  }

  this.taskService.update(task).subscribe({
    next: () => {
      this.toastr.success('🕒 Hours updated');
      this.loadTasks();
    },
    error: () => {
      this.toastr.error('❌ Failed to update hours');
    },
  });
}

}
