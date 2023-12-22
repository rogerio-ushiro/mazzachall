import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeckService } from '../../data/deck.service';

@Component({
  selector: 'app-new-deck-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, RouterModule],
  templateUrl: './all-decks.component.html',
  styleUrl: './all-decks.component.scss'
})

export class AllDecksComponent {
  newDeckForm!: FormGroup;
  myDecks: any[] = [];

  constructor(private fb: FormBuilder, private deckService: DeckService) { }

  ngOnInit(): void {
    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.myDecks = this.deckService.getAllDecks();
  }

  onSubmit() {
    if (this.newDeckForm?.valid) {
      this.deckService.createDeck(this.newDeckForm.value.name);
      this.myDecks = this.deckService.getAllDecks();
      this.newDeckForm.reset();
    }
  }
}
