import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { DashboardTask } from '../../../services/dashboard-task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconsModule],
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent {
  @Input() task!: DashboardTask;

  statuses: DashboardTask['status'][] = ['todo', 'in-progress', 'done'];

  @Output() close = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<{ task: DashboardTask, status: 'todo' | 'in-progress' | 'done' }>();
  changeStatus(newStatus: 'todo' | 'in-progress' | 'done') {
    if (this.task.status !== newStatus) {
      this.statusChange.emit({ task: this.task, status: newStatus });
    }
  }

  emitClose(): void {
    this.close.emit();
  }
  @Output() delete = new EventEmitter<DashboardTask>();

  deleteTask() {
  this.delete.emit(this.task); // assuming `@Input() task: DashboardTask`
}


  emitStatusChange(newStatus: DashboardTask['status']): void {
    if (this.task && newStatus !== this.task.status) {
      this.statusChange.emit({ task: this.task, status: newStatus });
    }
  }
}
