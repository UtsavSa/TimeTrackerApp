// import { Component, OnInit } from '@angular/core';
// import { TimeEntryService } from '../../services/time-entry.service';
// import { TimeEntry } from '../../models/time-entry.model';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-time-tracker',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './time-tracker.component.html',
// })
// export class TimeTrackerComponent implements OnInit {
//   userId: string = 'user1';
//   taskName: string = '';
//   entries: TimeEntry[] = [];
//   activeEntry: TimeEntry | null = null;
//   showTaskDetails: boolean = false;
//   liveTimer: string = '00:00:00';
//   intervalRef: any;

//   constructor(private timeEntryService: TimeEntryService) {}

//   ngOnInit() {
//     this.loadEntries();
//   }

//   loadEntries() {
//   this.timeEntryService.getEntries(this.userId).subscribe({
//     next: (entries) => {
//       this.entries = entries.map(entry => ({
//         ...entry,
//         punchInTime: new Date(entry.punchInTime || ''),   // Force into JS Date object
//         punchOutTime: entry.punchOutTime ? new Date(entry.punchOutTime) : undefined
//       }));

//       this.activeEntry = this.entries.find(e => !e.punchOutTime) || null;

//       if (this.activeEntry?.punchInTime) {
//         this.startLiveTimer();
//       }
//     },
//     error: (err) => console.error('Failed to load entries:', err),
//   });
// }


//   punchIn() {
//     if (!this.taskName.trim()) return;
//     this.timeEntryService.punchIn(this.taskName, this.userId).subscribe({
//       next: (entry) => {
//         this.taskName = '';
//         this.activeEntry = entry;
//         this.startLiveTimer();
//         this.loadEntries();
//       },
//       error: (err) => console.error('Punch in failed:', err),
//     });
//   }

//   punchOut() {
//     if (!this.activeEntry?.id) return;
//     this.timeEntryService.punchOut(this.activeEntry.id, this.userId).subscribe({
//       next: () => {
//         this.activeEntry = null;
//         this.liveTimer = '00:00:00';
//         clearInterval(this.intervalRef);
//         this.loadEntries();
//       },
//       error: (err) => console.error('Punch out failed:', err),
//     });
//   }

//   toggleTaskDetails() {
//     this.showTaskDetails = !this.showTaskDetails;
//   }

//   getDuration(start: string | undefined, end: string | undefined): string {
//     if (!start || !end) return '—';
//     const startTime = new Date(start).getTime();
//     const endTime = new Date(end).getTime();
//     const diff = endTime - startTime;
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     return `${hours}h ${remainingMinutes}m`;
//   }

//   startLiveTimer() {
//     clearInterval(this.intervalRef);
//     this.intervalRef = setInterval(() => {
//       if (this.activeEntry?.punchInTime) {
//         const start = new Date(this.activeEntry.punchInTime).getTime();
//         const now = Date.now();
//         const diff = now - start;
//         const totalSeconds = Math.floor(diff / 1000);
//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;
//         this.liveTimer = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
//       }
//     }, 1000);
//   }

//   pad(num: number): string {
//     return num.toString().padStart(2, '0');
//   }
// }



//------------------




import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeEntryService } from '../../services/time-entry.service';
import { TimeEntry } from '../../models/time-entry.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-tracker.component.html',
})
export class TimeTrackerComponent implements OnInit, OnDestroy {
  taskName: string = '';
  entries: TimeEntry[] = [];
  activeEntry: TimeEntry | null = null;
  showTaskDetails: boolean = false;
  liveTimer: string = '00:00:00';
  intervalRef: any;

  constructor(
    private timeEntryService: TimeEntryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadEntries();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }

  loadEntries() {
    this.timeEntryService.getEntries().subscribe({
      next: (entries) => {
        this.entries = entries.map(entry => ({
          ...entry,
          punchInTime: entry.punchInTime ? new Date(entry.punchInTime) : undefined,
          punchOutTime: entry.punchOutTime ? new Date(entry.punchOutTime) : undefined,
        }));
        this.activeEntry = this.entries.find(e => !e.punchOutTime) || null;
        if (this.activeEntry?.punchInTime) this.startLiveTimer();
      },
      error: (err) => {
        console.error('Failed to load entries:', err);
        this.toastr.error('Failed to load entries.', 'Error');
      },
    });
  }

  punchIn() {
    if (!this.taskName.trim()) {
      this.toastr.warning('Task name cannot be empty.', 'Validation');
      return;
    }

    this.timeEntryService.punchIn(this.taskName).subscribe({
      next: (entry) => {
        this.taskName = '';
        this.activeEntry = {
          ...entry,
          punchInTime: entry.punchInTime ? new Date(entry.punchInTime) : undefined
        };
        this.startLiveTimer();
        this.toastr.success('Punched in successfully.', 'Punch In');
        this.loadEntries();
      },
      error: (err) => {
        console.error('Punch in failed:', err);
        this.toastr.error('Punch in failed.', 'Error');
      },
    });
  }

  punchOut() {
    if (!this.activeEntry?.id) return;

    this.timeEntryService.punchOut(this.activeEntry.id).subscribe({
      next: () => {
        this.activeEntry = null;
        this.liveTimer = '00:00:00';
        clearInterval(this.intervalRef);
        this.toastr.success('Punched out successfully.', 'Punch Out');
        this.loadEntries();
      },
      error: (err) => {
        console.error('Punch out failed:', err);
        this.toastr.error('Punch out failed.', 'Error');
      },
    });
  }

  deleteEntry(entryId: string) {
    if (this.activeEntry?.id === entryId) {
      this.toastr.warning('Punch out before deleting this task.', 'Action Blocked');
      return;
    }

    this.timeEntryService.deleteEntry(entryId).subscribe({
      next: (success) => {
        if (success) {
          this.entries = this.entries.filter(e => e.id !== entryId);
          this.toastr.success('Task deleted successfully.', 'Task Removed');
        }
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.toastr.error('Failed to delete task.', 'Error');
      },
    });
  }

  deleteAllEntries() {
    this.timeEntryService.deleteAll().subscribe({
      next: () => {
        this.entries = [];
        this.activeEntry = null;
        clearInterval(this.intervalRef);
        this.liveTimer = '00:00:00';
        this.toastr.info('All tasks cleared.', 'Cleared');
      },
      error: (err) => {
        console.error('Delete all failed:', err);
        this.toastr.error('Failed to delete all entries.', 'Error');
      },
    });
  }

  toggleTaskDetails() {
    this.showTaskDetails = !this.showTaskDetails;
  }

  getDuration(start: Date | string | undefined, end: Date | string | undefined): string {
    if (!start || !end) return '—';
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diff = endTime - startTime;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  startLiveTimer() {
    clearInterval(this.intervalRef);
    this.intervalRef = setInterval(() => {
      if (this.activeEntry?.punchInTime) {
        const start = new Date(this.activeEntry.punchInTime).getTime();
        const now = Date.now();
        const totalSeconds = Math.floor((now - start) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        this.liveTimer = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      }
    }, 1000);
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
