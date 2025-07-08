import { Component } from '@angular/core';
import { User } from '../../Model/user.model';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'profile',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      dossier: [null],
      login: [''],
      role: [null],
      rsociale: [''],
      portef: [''],
      email: [''],
      ordreext: [null]
    });

    // Example: pre-fill with data
    const user: User = {
      dossier: 1234,
      login: 'jdoe',
      role: 2,
      rsociale: 'Entreprise Demo',
      portef: 'Portefeuille A',
      email: 'jdoe@example.com',
      ordreext: 5
    };
    this.userForm.patchValue(user);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User form values:', this.userForm.value);
      // Call your service here
    }
  }

  onReset() {
    this.userForm.reset();
  }
}
