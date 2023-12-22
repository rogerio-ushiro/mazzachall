import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardListComponent } from '../card-list/card-list.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DeckService } from '../../data/deck.service';
import { DataGridComponent } from '../data-grid/data-grid.component';

@Component({
  selector: 'app-edit-deck-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataGridComponent, CardListComponent, BreadcrumbComponent],
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
        this.currentDeck = this.deckService.setCurrentDeck(params['id']);
        this.newDeckForm.controls['name'].setValue(this.currentDeck.name);
      } catch (error) {
        this.router.navigate(["**"])
      }
    });

  }

  toggleDeleteDeckDialog() {
    this.showDeleteConfirmationDialog = !this.showDeleteConfirmationDialog;
  }

  deleteDeck() {
    this.myDecks = this.deckService.deleteDeck(this.currentDeck.id);
    this.toggleDeleteDeckDialog();
    this.router.navigate(['all-decks'])
  }

  onSubmit() {
    if (this.newDeckForm?.valid) {
      this.deckService.createDeck(this.newDeckForm.value.name);
      this.myDecks = this.deckService.getAllDecks();
      this.newDeckForm.reset();
    }
  }
}
