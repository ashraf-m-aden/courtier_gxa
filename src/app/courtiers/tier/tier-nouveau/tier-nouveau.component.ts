import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { tierActions } from '../store/tier.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'tier-nouveau',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCardModule, MatInputModule,
    MatSelectModule,MatIcon,
    MatCheckboxModule,
    MatButtonModule,],
  templateUrl: './tier-nouveau.component.html',
  styleUrl: './tier-nouveau.component.scss'
})
export class TierNouveauComponent {

  tierForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tierForm = this.fb.group({
      typtiers: ['ddp', Validators.required],
      nattiers: [''],
      numdpp: [null],
      titre: [''],
      rsociale: [''],
      referenc: [''],
      connexe: [''],
      refext: [''],
      adr1: [''],
      adr2: [''],
      adr3: [''],
      codp: [''],
      ville: [''],
      codepays: [''],
      pays: [''],
      ntel: [''],
      nfax: [''],
      numemail: [''],
      memo: [''],
      ext: [''],
      images: [''],
      titnom: [''],
      gommette: [''],
      ole: [''],
      titrecou: [''],
      datdermo: [''],
      modifpar: [''],
      nbpercha: [null],
      const: [''],
      histo: [''],
      adrinsee: [false],
      adresse1: [''],
      adresse2: [''],
      adresse3: [''],
      grcok: [false],
      nonepur: [false],
      territory: [''],
      latitude: [null],
      longitude: [null],

    });
  }


  onSubmit() {
    console.log(this.tierForm.value);
  }
}
