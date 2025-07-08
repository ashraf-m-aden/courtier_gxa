import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'nouveau',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './nouveau.component.html',
  styleUrl: './nouveau.component.css'
})
export class NouveauQuittanceComponent {
 form: FormGroup;
  // Exemple de "contrats trouvés par recherche police"
  contratsTrouves = [
    { id: 1, police: 'POL-001', nom: 'Contrat Auto' },
    { id: 2, police: 'POL-002', nom: 'Contrat Santé' }
  ];
  recherchePolice = ""
  contratSelectionne: any = null;
  affichageSelection = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      quittances: this.fb.array([])
    });
  }

  get quittances() {
    return this.form.get('quittances') as FormArray;
  }

  rechercherContrat() {
    const police = this.form.value.recherchePolice;
    // ici tu fais ton appel API pour chercher les contrats
    // Pour la démo on affiche la liste simulée
    this.affichageSelection = true;
  }

  selectionnerContrat(contrat: any) {
    this.contratSelectionne = contrat;
    this.affichageSelection = false;
    // Ajoute une première ligne de quittance vide
    this.ajouterQuittance();
  }

  ajouterQuittance() {
    const qForm = this.fb.group({
      totquit: [0, Validators.required],
      pnette: [0, Validators.required],
      comm: [0],
      taxe: [0]
    });
    this.quittances.push(qForm);
  }

  supprimerQuittance(index: number) {
    this.quittances.removeAt(index);
  }



  enregistrer() {
    console.log('Données soumises:', this.form.value);
    // Ici tu envoies les données au backend
  }
}
