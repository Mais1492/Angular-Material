import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  buttonText = input<string>('Click Me');
  buttonClicked = output<void>();

  onClick() {
    this.buttonClicked.emit();
  }
}
