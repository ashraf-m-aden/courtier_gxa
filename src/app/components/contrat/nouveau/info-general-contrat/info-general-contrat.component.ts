import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'info-general-contrat',
  imports: [],
  templateUrl: './info-general-contrat.component.html',
  styleUrl: './info-general-contrat.component.css'
})
export class InfoGeneralContratComponent {
@Input() isContrat=signal(true); // Indique si c'est un contrat ou une police
}
