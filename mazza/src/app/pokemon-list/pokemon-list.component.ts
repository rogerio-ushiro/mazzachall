import { Component, OnInit } from '@angular/core';
import { PokemonResourceService } from '../services/pokemon-resource.service';
import { PokemonCard } from '../../models/PokemonCard';
import { CommonModule } from '@angular/common';
import { PokemonApiResponse } from '../../models/PokemonApiResponse';
import { DeckService } from '../services/deck.service';
import { Observable, forkJoin } from 'rxjs';

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
  myDecks: number[] = [];

  constructor(private pokemonResourceService: PokemonResourceService, private deckService: DeckService) { }

  ngOnInit(): void {

    this.deckService.createDeck("deck01");
    this.deckService.createDeck("deck02");
    this.deckService.createDeck("deck03");

    this.pokemonResourceService.content().subscribe((response: PokemonApiResponse) => {
      console.log(response.data);
      this.cards = response.data;
      this.isLoaded = true;
    });

    this.pokemonResourceService.getCard("hgss4-1").subscribe(res => console.log(res));

  }

} 
