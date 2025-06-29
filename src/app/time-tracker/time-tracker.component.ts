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


import { Component, OnInit } from '@angular/core';
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
export class TimeTrackerComponent implements OnInit {
  userId: string = 'user1';
  taskName: string = '';
  entries: TimeEntry[] = [];
  activeEntry: TimeEntry | null = null;
  showTaskDetails: boolean = false;
  liveTimer: string = '00:00:00';
  intervalRef: any;

  constructor(private timeEntryService: TimeEntryService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadEntries();
  }

  loadEntries() {
    this.timeEntryService.getEntries(this.userId).subscribe({
      next: (entries) => {
        this.entries = entries.map(entry => ({
          ...entry,
          punchInTime: new Date(entry.punchInTime || ''),
          punchOutTime: entry.punchOutTime ? new Date(entry.punchOutTime) : undefined
        }));
        this.activeEntry = this.entries.find(e => !e.punchOutTime) || null;
        if (this.activeEntry?.punchInTime) this.startLiveTimer();
      },
      error: (err) => console.error('Failed to load entries:', err),
    });
  }

  punchIn() {
    if (!this.taskName.trim()) return;
    this.timeEntryService.punchIn(this.taskName, this.userId).subscribe({
      next: (entry) => {
        this.taskName = '';
        this.activeEntry = entry;
        this.startLiveTimer();
        this.loadEntries();
      },
      error: (err) => console.error('Punch in failed:', err),
    });
  }

  punchOut() {
    if (!this.activeEntry?.id) return;
    this.timeEntryService.punchOut(this.activeEntry.id, this.userId).subscribe({
      next: () => {
        this.activeEntry = null;
        this.liveTimer = '00:00:00';
        clearInterval(this.intervalRef);
        this.loadEntries();
      },
      error: (err) => console.error('Punch out failed:', err),
    });
  }

//   deleteEntry(entryId: string) {
//   this.timeEntryService.deleteEntry(entryId, this.userId).subscribe({
//     next: (success) => {
//       if (success) {
//         this.entries = this.entries.filter(e => e.id !== entryId);
//         this.toastr.success('The task was successfully deleted.', 'Task Removed');
//       }
//     },
//     error: (err) => console.error('Delete failed:', err),
//   });
// }

deleteEntry(entryId: string) {
  // Prevent deleting the active task
  if (this.activeEntry?.id === entryId) {
    this.toastr.warning('You must punch out before deleting this task.', 'Action Blocked');
    return;
  }

  this.timeEntryService.deleteEntry(entryId, this.userId).subscribe({
    next: (success: boolean) => {
      if (success) {
        this.entries = this.entries.filter(e => e.id !== entryId);
        this.toastr.success('The task was successfully deleted.', 'Task Removed');
      }
    },
    error: (err: any) => {
      console.error('Delete failed:', err);
      this.toastr.error('Failed to delete the task.', 'Error');
    },
  });
}





  deleteAllEntries() {
  this.timeEntryService.deleteAll(this.userId).subscribe({
    next: () => {
      this.entries = [];
      this.activeEntry = null;
      this.toastr.info('All time entries were successfully deleted.', 'All Tasks Removed');
    },
    error: (err) => console.error('Delete all failed:', err),
  });
}


  toggleTaskDetails() {
    this.showTaskDetails = !this.showTaskDetails;
  }

  getDuration(start: any, end: any): string {
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
        const diff = now - start;
        const totalSeconds = Math.floor(diff / 1000);
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
