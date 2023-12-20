import { Component } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonGridComponent } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonListComponent, PokemonGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  title = 'Meus baralhos';
  constructor() { }
}
