import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeckService } from '../services/deck.service';
import { PokemonGridComponent } from '../pokemon-grid/pokemon-grid.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-deck-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, PokemonGridComponent],
  templateUrl: './edit-deck-form.component.html',
  styleUrl: './edit-deck-form.component.scss'
})

export class EditDeckFormComponent {

  newDeckForm!: FormGroup;
  myDecks: any[] = [];
  currentDeck: any;
  showDeleteConfirmationDialog = false;
  routeSub: Subscription | undefined;

  constructor(private fb: FormBuilder, private deckService: DeckService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.currentDeck = this.deckService.findDeckById(params['id']);
      this.newDeckForm.controls['name'].setValue(this.currentDeck.name);
    });

  }

  toggleDeleteDeckDialog() {
    this.showDeleteConfirmationDialog = !this.showDeleteConfirmationDialog;
  }

  deleteDeck() {

    this.myDecks = this.deckService.deleteDeck(this.currentDeck.id);
    this.toggleDeleteDeckDialog();
    location.href = 'home';
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
