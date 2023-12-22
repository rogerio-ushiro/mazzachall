import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardListComponent } from '../../layout/card-list/card-list.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { DeckService } from '../../../data/deck.service';
import { DataGridComponent } from '../../layout/data-grid/data-grid.component';
import { Card } from '../../../data/types/Card';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-deck-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataGridComponent, CardListComponent, BreadcrumbComponent, RouterModule],
  templateUrl: './deck-view.component.html',
  styleUrl: './deck-view.component.scss'
})

export class DeckViewFormComponent {

  selectedCard: string | undefined;
  newDeckForm!: FormGroup;
  currentDeck: any;
  types: string[] = [];
  superTypes: string[] = [];

  constructor(private fb: FormBuilder, private deckService: DeckService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      try {
        this.currentDeck = this.deckService.setCurrentDeck(params['id']);
        this.newDeckForm.controls['name'].setValue(this.currentDeck.name);

        this.filterTypes().subscribe(({ types, superTypes }) => {
          this.types = Array.from(types); // Convert the Set to an array for logging
          this.superTypes = Array.from(superTypes); // Convert the Set to an array for logging
        });

      } catch (error) {
        this.router.navigate(["**"])
      }
    });

  }
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

  public visualize(img: string) {
    this.selectedCard = img;
  }

  public closeCard() {
    this.selectedCard = undefined;
  }

}
