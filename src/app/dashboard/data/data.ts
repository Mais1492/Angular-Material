import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-data',
  imports: [
    DatePipe,
    LoadingSpinner,
    MatDialogModule,
    MatPaginatorModule
],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  public store = inject(Store);
  private backendService = inject(Backend);
  private dialog = inject(MatDialog);

  coursePageSize = 5;
  coursePageIndex = 0;
  registrationPageSize = 5;
  registrationPageIndex = 0;

  get pagedCourses() {
    const start = this.coursePageIndex * this.coursePageSize;
    const end = start + this.coursePageSize;
    return this.store.courses.slice(start, end);
  }

  get pagedRegistrations() {
    const start = this.registrationPageIndex * this.registrationPageSize;
    const end = start + this.registrationPageSize;
    return this.store.registrations.slice(start, end);
  }

  ngOnInit() { }

  deleteRegistration(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '300px',
      data: {
        title: 'Registrierung löschen',
        message: 'Möchten Sie diese Registrierung wirklich löschen?'
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.store.loadingRegistrationIds.add(id);

      this.backendService.deleteRegistration(id).subscribe({
        next: () => {
          const totalItems = this.store.registrations.length - 1;

          const maxPageIndex = Math.max(
            0,
            Math.ceil(totalItems / this.registrationPageSize) - 1
          );

          if (this.registrationPageIndex > maxPageIndex) {
            this.registrationPageIndex = maxPageIndex;
          }
        },
        error: () => {
          this.store.loadingRegistrationIds.delete(id);
        }
      });
    });
  }

  isRowLoading(id: string): boolean {
      return this.store.loadingRegistrationIds.has(id);
    }

  onCoursePageChange(event: PageEvent) {
    this.coursePageIndex = event.pageIndex;
  }

  onRegistrationPageChange(event: PageEvent) {
    this.registrationPageIndex = event.pageIndex;
  }

}
