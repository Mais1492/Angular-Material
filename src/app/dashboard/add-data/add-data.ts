import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss',
})
export class AddData {
  public store = inject(Store);
  public backend = inject(Backend);
  private fb = inject(FormBuilder);
  public signupForm: any;
  private snackBar = inject(MatSnackBar);
  
  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(31)]],
      birthdate: ['', Validators.required],
      courseId: ['', Validators.required],
      newsletter: [false]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;

      const requestBody = {
        ...formValue,
        birthdate: formValue.birthdate.toISOString().split('T')[0],
      }

      this.backend.addRegistration(requestBody);

      this.snackBar.open('Anmeldung erfolgreich!', 'Schließen', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      
      this.formDirective.resetForm({
        name: '',
        birthdate: null,
        courseId: '',
        newsletter: false,
      });
    }
  }
}
