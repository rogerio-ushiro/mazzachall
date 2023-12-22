import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardListComponent } from '../../layout/card-list/card-list.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { DeckService } from '../../../data/deck.service';
import { DataGridComponent } from '../../layout/data-grid/data-grid.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataGridComponent, CardListComponent, BreadcrumbComponent],
  templateUrl: './deck-edit.component.html'
})

// página componente responsável pela edição de um determinado deck
export class DeckEditComponent {

  newDeckForm!: FormGroup;
  myDecks: any[] = [];
  currentDeck: any;
  showDeleteConfirmationDialog = false;
  routeSub: Subscription | undefined;

  constructor(private fb: FormBuilder, private deckService: DeckService, private route: ActivatedRoute, private router: Router) { }

  // carrega informações do deck e adiciona o nome do deck no input para atualização do nome do deck
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

  // remove card do baralho
  removeCard(cardId: string) {
    this.currentDeck = this.deckService.removeCardFromDeck(cardId);
  }

  // habilita e desabilita caixa de dialogo de confirmação de delete
  toggleDeleteDeckDialog() {
    this.showDeleteConfirmationDialog = !this.showDeleteConfirmationDialog;
  }

  // chama o service para fazer a deleção do baralho
  deleteDeck() {
    this.myDecks = this.deckService.deleteDeck(this.currentDeck.id);
    this.toggleDeleteDeckDialog();
    this.router.navigate(['all-decks'])
  }

  // atualiza o nome do deck
  onSubmit() {
    if (this.newDeckForm?.valid) {
      this.currentDeck = this.deckService.saveDeckName(this.newDeckForm.value.name);
    }
  }
}
