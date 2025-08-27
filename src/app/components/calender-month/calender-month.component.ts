

import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Signal,
  computed,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

type DayCell = { date: Date; inMonth: boolean; isToday: boolean };

@Component({
  selector: 'app-calendar-month',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calender-month.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthComponent implements OnDestroy {
  @Output() dateSelected = new EventEmitter<Date>();
  private router = inject(Router);

  /** Live “now” (local timezone) */
  private now = signal(new Date());
  /** Month the grid shows (first day) */
  private visibleMonth = signal(startOfMonth(this.now()));

  /** Midnight refresh timer */
  private midnightTimer: any;

  /** Header label like “August 2025” */
  monthLabel: Signal<string> = computed(() =>
    this.visibleMonth().toLocaleString(undefined, { month: 'long', year: 'numeric' }),
  );

  /** 6×7 grid, marks today, includes spillover days */
  grid: Signal<DayCell[]> = computed(() => buildGrid(this.visibleMonth(), this.now()));

  constructor() {
    this.scheduleMidnightTick();

    // If tab was in background and timers throttled, refresh on resume.
    document.addEventListener('visibilitychange', this.onVisibility, { passive: true });
  }

  prevMonth() {
    const m = this.visibleMonth();
    this.visibleMonth.set(new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  nextMonth() {
    const m = this.visibleMonth();
    this.visibleMonth.set(new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  goToday() {
    const t = new Date();
    this.now.set(t);
    this.visibleMonth.set(startOfMonth(t));
    this.dateSelected.emit(t);
  }

  openJournal(d: Date) {
    // Route to your daily notes page (wire up later if not present yet)
    const iso = toISODate(d); // YYYY-MM-DD in local time
    //this.router.navigate(['/journal', iso]);
    this.dateSelected.emit(d);
  }

  /** Schedule a tick at next local midnight (DST-safe) */
  private scheduleMidnightTick() {
    if (this.midnightTimer) clearTimeout(this.midnightTimer);
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );
    this.midnightTimer = setTimeout(
      () => this.onMidnight(),
      nextMidnight.getTime() - now.getTime()
    );
  }

  private onMidnight() {
    const t = new Date();
    this.now.set(t);
    // Home calendar should snap to the current month at midnight
    this.visibleMonth.set(startOfMonth(t));
    this.scheduleMidnightTick();
  }

  private onVisibility = () => {
    if (document.visibilityState === 'visible') {
      const t = new Date();
      this.now.set(t);
      // Keep Home “live” to current month on resume
      this.visibleMonth.set(startOfMonth(t));
    }
  };

  ngOnDestroy() {
    if (this.midnightTimer) clearTimeout(this.midnightTimer);
    document.removeEventListener('visibilitychange', this.onVisibility);
  }
}

/* ================= helpers ================= */

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildGrid(visibleMonth: Date, now: Date): DayCell[] {
  const first = startOfMonth(visibleMonth);

  // Start grid on the Sunday on/before the 1st (US week start).
  // For Monday-start, change offset accordingly.
  const start = new Date(first);
  start.setDate(1 - first.getDay());

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push({
      date: d,
      inMonth: d.getMonth() === visibleMonth.getMonth(),
      isToday: sameDay(d, now),
    });
  }
  return cells;
}

function toISODate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
