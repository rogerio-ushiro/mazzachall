import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeckService } from '../services/deck.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-deck-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, RouterModule],
  templateUrl: './new-deck-form.component.html',
  styleUrl: './new-deck-form.component.scss'
})

export class NewDeckFormComponent {
  newDeckForm!: FormGroup;
  myDecks: any[] = [];

  constructor(private fb: FormBuilder, private deckService: DeckService) { }

  ngOnInit(): void {
    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.myDecks=this.deckService.getAllDecks();
  }

  onSubmit() {
    if (this.newDeckForm?.valid) {
      this.deckService.createDeck(this.newDeckForm.value.name);
      this.myDecks = this.deckService.getAllDecks();
      this.newDeckForm.reset();
      // console.log(this.deckService.getAllDecks());
    }
  }
}
