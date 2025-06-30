import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-popover',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-popover.component.html',
})
export class AddTaskPopoverComponent {
  name = '';
  description = '';
  storyPoints: number | null = null;
  hoursNeeded: number | null = null;

  @Output() create = new EventEmitter<{
    name: string;
    description: string;
    storyPoints: number;
    hoursNeeded: number;
  }>();

  submit(): void {
    if (!this.name || this.storyPoints == null || this.hoursNeeded == null) {
      alert('Please fill all required fields: name, points, hours.');
      return;
    }

    this.create.emit({
      name: this.name,
      description: this.description,
      storyPoints: this.storyPoints,
      hoursNeeded: this.hoursNeeded,
    });

    // Reset fields after submission
    this.name = '';
    this.description = '';
    this.storyPoints = null;
    this.hoursNeeded = null;
  }
}
