// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sprint-status-list',
//   imports: [],
//   templateUrl: './sprint-status-list.component.html',
//   styleUrl: './sprint-status-list.component.css'
// })
// export class SprintStatusListComponent {

// }


//-------------------------

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sprint } from '../../../models/sprint.model';

export interface SprintCardItem {
  sprint: Sprint;
  doneStoryPoints: number; // completed points
}

@Component({
  selector: 'app-sprint-status-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sprint-status-list.component.html',
})
export class SprintStatusListComponent {
  @Input() items: SprintCardItem[] = [];

  completionPct(it: SprintCardItem): number {
    const total = it.sprint.totalStoryPoints || 0;
    if (total <= 0) return 0;
    const pct = (it.doneStoryPoints / total) * 100;
    return Math.max(0, Math.min(100, pct));
  }

  timePct(it: SprintCardItem): number {
    const start = new Date(it.sprint.startDate).getTime();
    const end = new Date(it.sprint.endDate).getTime();
    const now = Date.now();
    if (!isFinite(start) || !isFinite(end) || end <= start) return 100;
    const pct = ((now - start) / (end - start)) * 100;
    return Math.max(0, Math.min(100, pct));
  }

  behindPace(it: SprintCardItem): boolean {
    return this.completionPct(it) + 7 < this.timePct(it); // 7% buffer
  }

  trackById = (_: number, it: SprintCardItem) => it.sprint.id;
}
