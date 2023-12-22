import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardListComponent } from '../../layout/card-list/card-list.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { DeckService } from '../../../data/deck.service';
import { DataGridComponent } from '../../layout/data-grid/data-grid.component';

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

  public visualize(img: string) {
    this.selectedCard = img;
  }

  public closeCard() {
    this.selectedCard = undefined;
  }

}
