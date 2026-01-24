import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data',
  imports: [
    DatePipe, 
    LoadingSpinner, 
    MatPaginatorModule
  ],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  public store = inject(Store);
  private backendService = inject(Backend);


  pageSize = 5;
  pageIndex = 0;

  get pagedRegistrations() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.store.registrations.slice(start, end);
}

  ngOnInit() {}

  deleteRegistration(id: string) {
  this.store.loadingRegistrationIds.add(id);

  this.backendService.deleteRegistration(id).subscribe({
    next: () => {
      const totalItems = this.store.registrations.length - 1;

      const maxPageIndex = Math.max(
        0,
        Math.ceil(totalItems / this.pageSize) - 1
      );

      if (this.pageIndex > maxPageIndex) {
        this.pageIndex = maxPageIndex;
      }
    },
    error: () => {
      this.store.loadingRegistrationIds.delete(id);
    }
  });
}

  isRowLoading(id: string): boolean {
    return this.store.loadingRegistrationIds.has(id);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
