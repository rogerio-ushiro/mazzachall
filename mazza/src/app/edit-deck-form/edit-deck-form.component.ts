import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeckService } from '../services/deck.service';
import { PokemonGridComponent } from '../pokemon-grid/pokemon-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListSample4Component } from '../list-sample-4/list-sample-4.component';

@Component({
  selector: 'app-edit-deck-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, PokemonGridComponent, ListSample4Component],
  templateUrl: './edit-deck-form.component.html',
  styleUrl: './edit-deck-form.component.scss'
})

export class EditDeckFormComponent {

  newDeckForm!: FormGroup;
  myDecks: any[] = [];
  currentDeck: any;
  showDeleteConfirmationDialog = false;
  routeSub: Subscription | undefined;

  constructor(private fb: FormBuilder, private deckService: DeckService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      try {
        this.currentDeck = this.deckService.findDeckById(params['id']);
        this.newDeckForm.controls['name'].setValue(this.currentDeck.name);
      } catch (error) {
        this.router.navigate(["new-deck"])
      }
    });

  }

  toggleDeleteDeckDialog() {
    this.showDeleteConfirmationDialog = !this.showDeleteConfirmationDialog;
  }

  deleteDeck() {
    this.myDecks = this.deckService.deleteDeck(this.currentDeck.id);
    this.toggleDeleteDeckDialog();
    this.router.navigate(['new-deck'])
  }

  addCard(deckID: string) {
    this.deckService.addCardToDeck(deckID, "ex7-1")
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
