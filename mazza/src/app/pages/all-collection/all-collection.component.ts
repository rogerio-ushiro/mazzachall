import { Component } from '@angular/core';
import { DataGridComponent } from "../../layout/data-grid/data-grid.component";

@Component({
  selector: 'app-all-collection',
  standalone: true,
  templateUrl: './all-collection.component.html',
  styleUrls: ['./all-collection.component.scss'],
  imports: [DataGridComponent]
})

export class AllCollectionComponent {
  title = 'Consulta de todos os Pokemons';
  constructor() { }
}
