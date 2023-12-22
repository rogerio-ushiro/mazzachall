import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgxButtonGroupModule, IgxFilterModule, IgxFilterOptions, IgxIconModule, IgxInputGroupModule, IgxListModule, IgxRippleModule } from 'igniteui-angular';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { Deck } from '../../../data/types/Deck';
import { ApiDataResourceService } from '../../../data/api-data-resource.service';
import { DeckService } from '../../../data/deck.service';
import { Card } from '../../../data/types/Card';

@Component({
    selector: 'app-card-list',
    standalone: true,
    imports: [IgxButtonGroupModule, IgxInputGroupModule, IgxIconModule, IgxListModule,
        IgxRippleModule, CommonModule, IgxFilterModule, FormsModule, LoadingIndicatorComponent],
    styleUrls: ['./card-list.component.scss'],
    templateUrl: './card-list.component.html'
})

export class CardListComponent implements OnInit {
    private currentDeck!: Deck;
    public searchCard: string | undefined;
    public cards: Card[] = [];

    public size = 'medium';

    constructor(private pokemonResourceService: ApiDataResourceService, private deckService: DeckService) {
        pokemonResourceService.content().subscribe(collection => { this.cards = collection })
    }

    ngOnInit(): void {
        this.currentDeck = this.deckService.getCurrentDeck();
    }

    @HostBinding('style.--ig-size')
    protected get sizeStyle() {
        return `var(--ig-size-${this.size})`;
    }

    addCard(cardId: string) {
        this.currentDeck = this.deckService.addCardToDeck(cardId)
    }

    get filterCards() {
        const fo = new IgxFilterOptions();
        fo.key = 'name';
        fo.inputValue = this.searchCard;
        return fo;
    }

    public mousedown(event: Event) {
        event.stopPropagation();
    }
}
