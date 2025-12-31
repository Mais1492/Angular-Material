import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(), 
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
  provideNativeDateAdapter()],
});
