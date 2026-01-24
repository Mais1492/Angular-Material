import { Injectable } from '@angular/core';
import { RegistrationDto } from './Interfaces/Registration';
import { Course } from './Interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class Store {
  public courses: Course[] = [];
  public registrations: RegistrationDto[] = [];
  public isLoading = true;
  public loadingRegistrationIds = new Set<string>();
}
