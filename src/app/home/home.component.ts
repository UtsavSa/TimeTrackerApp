// // src/app/home/home.component.ts
// import { Component, ChangeDetectionStrategy, OnInit, inject, ChangeDetectorRef } from '@angular/core';
// import { CommonModule, DatePipe } from '@angular/common';
// import { CalendarMonthComponent } from '../components/calender-month/calender-month.component';
// import { SprintStatusListComponent, SprintCardItem } from '../components/sprint-status-list/sprint-status-list.component';
// import { SprintService } from '../../services/sprint.service';
// import { Sprint } from '../../models/sprint.model';
// import { SprintProgress } from '../../models/sprint-progress.model';
// import { forkJoin, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, DatePipe, CalendarMonthComponent, SprintStatusListComponent],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//     <div class="mx-auto max-w-7xl p-4 md:p-6">
//       <h1 class="text-2xl font-semibold mb-4">Home</h1>

//       <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div class="lg:col-span-2">
//           <app-calendar-month (dateSelected)="applyDateFilter($event)"></app-calendar-month>
//         </div>

//         <div class="lg:col-span-1 space-y-3">
//           <div *ngIf="selectedDate" class="flex items-center justify-between text-xs text-gray-600 dark:text-slate-300">
//             <span>Sprints active on <strong>{{ selectedDate | date:'MMM d, y' }}</strong></span>
//             <button class="underline hover:opacity-80" (click)="clearFilter()">Clear</button>
//           </div>

//           <app-sprint-status-list [items]="items"></app-sprint-status-list>
//         </div>
//       </div>
//     </div>
//   `,
// })
// export class HomeComponent implements OnInit {
//   private sprintSvc = inject(SprintService);
//   private cdr = inject(ChangeDetectorRef);

//   private allItems: SprintCardItem[] = [];
//   items: SprintCardItem[] = [];
//   selectedDate: Date | null = null;

//   ngOnInit(): void {
//     forkJoin({
//       sprints: this.sprintSvc.getMySprints(),
//       progress: this.sprintSvc.getMySprintProgress().pipe(catchError(() => of([] as SprintProgress[]))),
//     }).subscribe({
//       next: ({ sprints, progress }) => {
//         const pMap = new Map<string, number>((progress ?? []).map(p => [p.sprintId, p.doneStoryPoints]));
//         this.allItems = (sprints ?? []).map<SprintCardItem>((s: Sprint) => ({
//           sprint: s,
//           doneStoryPoints: pMap.get(s.id) ?? 0,
//         }));

//         // Filter to TODAY on first load
//         this.applyDateFilter(new Date());
//       },
//       error: () => {
//         this.allItems = [];
//         this.items = [];
//         this.cdr.markForCheck();
//       },
//     });
//   }

//   applyDateFilter(date: Date) {
//     this.selectedDate = date;

//     const dayStart = startOfLocalDay(date);
//     const dayEnd = endOfLocalDay(date);

//     this.items = this.allItems.filter(it => {
//       // Parse incoming ISO robustly. If your API sends UTC without 'Z', we append 'Z'.
//       const startMs = safeParseIsoMs(it.sprint.startDate);
//       const endMs = safeParseIsoMs(it.sprint.endDate);
//       if (startMs === null || endMs === null) return false;

//       // Overlap test: [sprintStart, sprintEnd] ∩ [dayStart, dayEnd] ≠ ∅
//       return startMs <= dayEnd.getTime() && endMs >= dayStart.getTime();
//     });

//     this.cdr.markForCheck();
//   }

//   clearFilter() {
//     this.applyDateFilter(new Date());
//   }
// }

// /* ---------- helpers ---------- */

// // Returns Date at local 00:00:00.000
// function startOfLocalDay(d: Date): Date {
//   return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
// }
// // Returns Date at local 23:59:59.999
// function endOfLocalDay(d: Date): Date {
//   return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
// }

// // Parses ISO safely. If the string lacks timezone info, assumes UTC ('Z').
// function safeParseIsoMs(input: string | null | undefined): number | null {
//   if (!input) return null;
//   const hasTz = /Z$|[+-]\d{2}:\d{2}$/.test(input);
//   const iso = hasTz ? input : `${input}Z`;
//   const t = Date.parse(iso);
//   return Number.isFinite(t) ? t : null;
// }

//---------------------------------

// src/app/home/home.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Adjust the path/spelling to match your calendar component file
import { CalendarMonthComponent } from '../components/calender-month/calender-month.component';

import {
  SprintStatusListComponent,
  SprintCardItem,
} from '../components/sprint-status-list/sprint-status-list.component';

import { SprintService } from '../../services/sprint.service';
import { Sprint } from '../../models/sprint.model';
import { SprintProgress } from '../../models/sprint-progress.model';

import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, CalendarMonthComponent, SprintStatusListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-7xl p-4 md:p-6">
      <h1 class="text-2xl font-semibold mb-4">Home</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Calendar (emits clicked date) -->
        <div class="lg:col-span-2">
          <app-calendar-month (dateSelected)="applyDateFilter($event)"></app-calendar-month>
        </div>

        <!-- Right: Sprints panel -->
        <div class="lg:col-span-1 space-y-3">
          <div
            *ngIf="selectedDate"
            class="flex items-center justify-between text-xs text-gray-600 dark:text-slate-300"
          >
            <span>
              Sprints active on <strong>{{ selectedDate | date: 'MMM d, y' }}</strong>
            </span>
            <button class="underline hover:opacity-80" (click)="clearFilter()">Clear</button>
          </div>

          <app-sprint-status-list [items]="items"></app-sprint-status-list>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private sprintSvc = inject(SprintService);
  private cdr = inject(ChangeDetectorRef);

  /** Unfiltered full set (merged with progress) */
  private allItems: SprintCardItem[] = [];
  /** Rendered (filtered) items */
  items: SprintCardItem[] = [];
  /** Current selected date (defaults to today after load) */
  selectedDate: Date | null = null;

  ngOnInit(): void {
    forkJoin({
      sprints: this.sprintSvc.getMySprints(),
      progress: this.sprintSvc
        .getMySprintProgress()
        .pipe(catchError(() => of([] as SprintProgress[]))),
    }).subscribe({
      next: ({ sprints, progress }) => {

        //console.log('[Home] /mine payload:', sprints);
        //console.log('[Home] /mine/progress payload:', progress);

        const pMap = new Map<string, number>(
          (progress ?? []).map((p) => [p.sprintId, p.doneStoryPoints])
        );

        this.allItems = (sprints ?? []).map<SprintCardItem>((s: Sprint) => ({
          sprint: s,
          doneStoryPoints: pMap.get(s.id) ?? 0,
        }));

        // Default filter: show sprints open TODAY
        this.applyDateFilter(new Date());
      },
      error: () => {
        this.allItems = [];
        this.items = [];
        this.cdr.markForCheck();
      },
    });
  }

  /** Filter to sprints that overlap the selected local day */
  applyDateFilter(date: Date) {
    this.selectedDate = date;

    const dayStart = startOfLocalDay(date).getTime();
    const dayEnd = endOfLocalDay(date).getTime();

    this.items = this.allItems.filter((it) => {
      const startMs = safeParseIsoMs(it.sprint.startDate);
      const endMs = safeParseIsoMs(it.sprint.endDate);
      if (startMs === null || endMs === null) return false;

      // Overlap test between [sprintStart, sprintEnd] and [dayStart, dayEnd]
      return startMs <= dayEnd && endMs >= dayStart;
    });

    this.cdr.markForCheck();
  }

  /** Reset to today's open sprints */
  clearFilter() {
    this.applyDateFilter(new Date());
  }
}

/* ---------- helpers ---------- */

// Start of local day (00:00:00.000)
function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

// End of local day (23:59:59.999)
function endOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

// Parse ISO safely. If no timezone is present, assume UTC by appending 'Z'.
function safeParseIsoMs(input: string | null | undefined): number | null {
  if (!input) return null;
  const hasTz = /Z$|[+-]\d{2}:\d{2}$/.test(input);
  const iso = hasTz ? input : `${input}Z`;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : null;
}
