import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { Risa } from '../../../../Model/risque.model';

@Component({
  selector: 'details-risque-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './risque-contrat.component.html',
  styleUrl: './risque-contrat.component.css'
})
export class DetailsRisqueContratComponent {
  @Input() contratDetails = signal<any>(null);
  rique: Risa[] = []


  conducteurs: any[] = [];

  conducteursDisponibles = [
    {
      id: 1,
      titre: 'M.',
      nomPrenom: 'Ali Mohamed',
      age: 32,
      dateB: '2015-06-01',
      numeroPermis: 'ABC12345',
      permisDelivrePar: 'Préfecture Djibouti'
    },
    {
      id: 2,
      titre: 'Mme',
      nomPrenom: 'Fatouma Ibrahim',
      age: 28,
      dateB: '2018-09-20',
      numeroPermis: 'XYZ78910',
      permisDelivrePar: 'Préfecture Balbala'
    }
  ];
  conducteurSelectionne: any = null;
  constructor(private fb: FormBuilder, private courtierService: CourtierService) {
    effect(() => {
      courtierService.getRisque(this.contratDetails().Contrat, this.contratDetails().Piece).subscribe({
        next: (data: Risa[]) => {
          this.rique = data
        }
      })

    })
  }


  ajouterConducteurDepuisSelect() {
    if (this.conducteurSelectionne) {
      const existe = this.conducteurs.some(c => { return c.id == this.conducteurSelectionne.id });
      if (!existe) {
        this.conducteurs.push(this.conducteurSelectionne);
        console.log(this.conducteurSelectionne.id);
      }
    }
    this.conducteurSelectionne = null;
  }

  supprimerConducteur(index: number) {
    this.conducteurs.splice(index, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['conducteurSelectionne']) {
      console.log(this.conducteurSelectionne)
    }
  }

}


