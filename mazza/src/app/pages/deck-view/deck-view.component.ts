import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardListComponent } from '../../layout/card-list/card-list.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { DeckService } from '../../../data/deck.service';
import { DataGridComponent } from '../../layout/data-grid/data-grid.component';
import { Card } from '../../../data/types/Card';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataGridComponent, CardListComponent, BreadcrumbComponent, RouterModule],
  templateUrl: './deck-view.component.html'
})

// página componente que lista todos os cards de um deck
export class DeckViewFormComponent {

  selectedCard: string | undefined;
  newDeckForm!: FormGroup;
  currentDeck: any;
  types: string[] = [];
  superTypes: string[] = [];

  constructor(private deckService: DeckService, private route: ActivatedRoute, private router: Router) { }

  // carrega deck para ser listado e se houver erros, 
  // inclusive erros de deck que não está mais em memoria, manda para a pagina de erro
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        this.currentDeck = this.deckService.setCurrentDeck(params['id']);

        this.filterTypes().subscribe(({ types, superTypes }) => {
          this.types = Array.from(types);
          this.superTypes = Array.from(superTypes);
        });

      } catch (error) {
        this.router.navigate(["**"])
      }
    });

  }

  // faz filtragem dos cards em supertype e type do cards
  private filterTypes(): Observable<{ types: Set<string>; superTypes: any }> {
    return new Observable<{ types: Set<string>; superTypes: Set<string> }>((observer) => {
      const typesResult = new Set<string>();
      const superTypesResult = new Set<string>();
      this.currentDeck.cards.forEach((e: Card) => {
        e.types.forEach((type) => {
          typesResult.add(type);
        });
        superTypesResult.add(e.supertype);
      });
      observer.next({ types: typesResult, superTypes: superTypesResult });
      observer.complete();
    });
  }

  // define o card que será visualizado em tamanho grande
  public visualize(img: string) {
    this.selectedCard = img;
  }

  // fecha o card que está selecionado
  public closeCard() {
    this.selectedCard = undefined;
  }

}
