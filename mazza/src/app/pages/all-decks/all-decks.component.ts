import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeckService } from '../../../data/deck.service';

@Component({
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, RouterModule],
  templateUrl: './all-decks.component.html'
})

// (Home) pagina componente que lista todos os decks em memória
export class AllDecksComponent {
  newDeckForm!: FormGroup;
  myDecks: any[] = [];

  constructor(private fb: FormBuilder, private deckService: DeckService) { }

  // faz carregamento de todos os decks em memória
  ngOnInit(): void {
    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.myDecks = this.deckService.getAllDecks();
  }

  // cria um novo deck a partir do nome enviado no input
  onSubmit() {
    if (this.newDeckForm?.valid) {
      this.deckService.createDeck(this.newDeckForm.value.name);
      this.myDecks = this.deckService.getAllDecks();
      this.newDeckForm.reset();
    }
  }
}
