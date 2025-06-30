import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardTask } from '../../../services/dashboard-task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent {
  @Input() task!: DashboardTask;
  @Output() close = new EventEmitter<void>();

  updateStatus(newStatus: DashboardTask['status']) {
    this.task.status = newStatus;
  }

  emitClose() {
    this.close.emit();
  }
}
