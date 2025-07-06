import { Component, Input, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'info-general-contrat',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './info-general-contrat.component.html',
  styleUrl: './info-general-contrat.component.css'
})
export class InfoGeneralContratComponent {
@Input() isContrat=signal(true); // Indique si c'est un contrat ou une police
@Input() isEdit=signal(true); // Indique si c'est un contrat ou une police
@Input() formGroup!:FormGroup;

intitule = ""
constructor(){
  console.log(this.formGroup);
}


ngOnChanges(): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  console.log(this.formGroup.value);
  this.intitule = this.formGroup.value.intitule
}
}
