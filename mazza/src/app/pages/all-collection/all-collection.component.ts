import { Component } from '@angular/core';
import { DataGridComponent } from "../../layout/data-grid/data-grid.component";

@Component({
  standalone: true,
  templateUrl: './all-collection.component.html',
styleUrls: ['./all-collection.component.scss'],
  imports: [DataGridComponent]
})

// página componente par visualização do grid completo de cards
export class AllCollectionComponent {
  title = 'Consulta de todos os Pokemons';
  constructor() { }
}
