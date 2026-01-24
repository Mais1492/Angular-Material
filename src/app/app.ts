import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { Store } from './shared/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoadingSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public store = inject(Store);

  consoleAnything() {
    console.log('Button clicked!');
  }
}
