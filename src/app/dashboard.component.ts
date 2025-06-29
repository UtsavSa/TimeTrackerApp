import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardTaskService, DashboardTask } from '../services/dashboard-task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  taskStatuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
  tasks: DashboardTask[] = [];

  constructor(
    private taskService: DashboardTaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAll().subscribe({
      next: (data) => (this.tasks = data),
      error: () => this.toastr.error('Failed to load tasks'),
    });
  }

  getTasksByStatus(status: 'todo' | 'in-progress' | 'done'): DashboardTask[] {
    return this.tasks.filter(task => task.status === status);
  }

  openTaskModal(status: 'todo' | 'in-progress' | 'done') {
    const name = prompt('Enter task name');
    if (!name) return;

    const description = prompt('Enter description') ?? '';
    const storyPoints = Number(prompt('Enter story points'));
    const hoursNeeded = Number(prompt('Estimated hours'));

    if (isNaN(storyPoints) || isNaN(hoursNeeded)) {
      this.toastr.error('Story points and hours must be numbers.');
      return;
    }

    const newTask = {
      name,
      description,
      storyPoints,
      hoursNeeded,
      hoursTaken: 0,
      status,
    };

    this.taskService.create(newTask).subscribe({
      next: () => {
        this.toastr.success('Task created');
        this.loadTasks();
      },
      error: () => this.toastr.error('Failed to create task'),
    });
  }
}
