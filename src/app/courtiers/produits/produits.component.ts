import { Component } from '@angular/core';
import { Produit } from '../../Model/produit.model';
import { CourtierService } from '../../Services/courtier/courtier.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'produits',
  imports: [AsyncPipe],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {


  listProduits: Observable<Produit[]> = new Observable<Produit[]>();

  constructor(private courtierService: CourtierService) { }


  async ngOnInit() {

    this.listProduits = this.courtierService.getListeDesProduits()


  }

}
