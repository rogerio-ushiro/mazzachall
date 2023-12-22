import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, UrlSegment } from '@angular/router';
import { DeckService } from '../../../data/deck.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  selectedCard: string | undefined;
  currentDeck: any;
  isEditPage: boolean = false;

  constructor(private deckService: DeckService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.url.subscribe(e => {
      this.isEditPage = e[0].path == "deck-edit"
    })


    this.route.params.subscribe(params => {
      this.currentDeck = this.deckService.setCurrentDeck(params['id']);
    });
  }

}