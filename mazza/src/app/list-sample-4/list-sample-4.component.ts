import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgxButtonGroupModule, IgxFilterModule, IgxFilterOptions, IgxIconModule, IgxInputGroupModule, IgxListModule, IgxRippleModule } from 'igniteui-angular';
import { PokemonResourceService } from '../services/pokemon-resource.service';
import { DeckService } from '../services/deck.service';
import { Deck } from '../../models/Deck';

@Component({
    selector: 'app-contact-list2',
    standalone: true,
    imports: [IgxButtonGroupModule, IgxInputGroupModule, IgxIconModule, IgxListModule,
        IgxRippleModule, CommonModule, IgxFilterModule, FormsModule],
    styleUrls: ['./list-sample-4.component.scss'],
    templateUrl: './list-sample-4.component.html'
})

export class ListSample4Component implements OnInit {
    private currentDeck!: Deck;
    public searchCard: string | undefined;
    public cards = [];

    public size = 'medium';

    constructor(private pokemonResourceService: PokemonResourceService, private deckService: DeckService) {
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
