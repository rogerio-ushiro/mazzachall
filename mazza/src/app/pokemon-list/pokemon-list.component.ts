import { Component, OnInit } from '@angular/core';
import { PokemonResourceService } from '../pokemon-resource.service';
import { PokemonCard } from '../../models/PokemonCard';
import { CommonModule } from '@angular/common';
import { PokemonApiResponse } from '../../models/PokemonApiResponse';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})

export class PokemonListComponent implements OnInit {
  cards: PokemonCard[] = [];
  isLoaded: boolean = false;

  constructor(private pokemonResourceService: PokemonResourceService) { }

  ngOnInit(): void {
    this.pokemonResourceService.getCards().subscribe((response: PokemonApiResponse) => {
      this.cards = response.data;
      this.isLoaded = true;
    });
  }

} 
