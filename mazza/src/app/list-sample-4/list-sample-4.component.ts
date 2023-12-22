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
    private currentDeck: Deck | undefined;
    public searchCard: string | undefined;
    public cards = [{
        "id": "hgss4-1",
        "name": "Aggron",
        "supertype": "Pokémon",
        "subtypes": [
            "Stage 2"
        ],
        "hp": "140",
        "types": [
            "Metal"
        ],
        "evolvesFrom": "Lairon",
        "attacks": [
            {
                "name": "Second Strike",
                "cost": [
                    "Metal",
                    "Metal",
                    "Colorless"
                ],
                "convertedEnergyCost": 3,
                "damage": "40",
                "text": "If the Defending Pokémon already has any damage counters on it, this attack does 40 damage plus 40 more damage."
            },
            {
                "name": "Guard Claw",
                "cost": [
                    "Metal",
                    "Metal",
                    "Colorless",
                    "Colorless"
                ],
                "convertedEnergyCost": 4,
                "damage": "60",
                "text": "During your opponent's next turn, any damage done to Aggron by attacks is reduced by 20 (after applying Weakness and Resistance)."
            }
        ],
        "weaknesses": [
            {
                "type": "Fire",
                "value": "×2"
            }
        ],
        "resistances": [
            {
                "type": "Psychic",
                "value": "-20"
            }
        ],
        "retreatCost": [
            "Colorless",
            "Colorless",
            "Colorless",
            "Colorless"
        ],
        "convertedRetreatCost": 4,
        "set": {
            "id": "hgss4",
            "name": "HS—Triumphant",
            "series": "HeartGold & SoulSilver",
            "printedTotal": 102,
            "total": 103,
            "legalities": {
                "unlimited": "Legal"
            },
            "ptcgoCode": "TM",
            "releaseDate": "2010/11/03",
            "updatedAt": "2018/03/04 10:35:00",
            "images": {
                "symbol": "https://images.pokemontcg.io/hgss4/symbol.png",
                "logo": "https://images.pokemontcg.io/hgss4/logo.png"
            }
        },
        "number": "1",
        "artist": "Kagemaru Himeno",
        "rarity": "Rare Holo",
        "flavorText": "You can tell its age by the length of its iron horns. It claims an entire mountain as its territory.",
        "nationalPokedexNumbers": [
            306
        ],
        "legalities": {
            "unlimited": "Legal"
        },
        "images": {
            "small": "https://images.pokemontcg.io/hgss4/1.png",
            "large": "https://images.pokemontcg.io/hgss4/1_hires.png"
        },
        "tcgplayer": {
            "url": "https://prices.pokemontcg.io/tcgplayer/hgss4-1",
            "updatedAt": "2023/12/20",
            "prices": {
                "holofoil": {
                    "low": 1.33,
                    "mid": 1.86,
                    "high": 5.1,
                    "market": 1.65,
                    "directLow": null
                },
                "reverseHolofoil": {
                    "low": 1.99,
                    "mid": 3.78,
                    "high": 6.24,
                    "market": 4.8,
                    "directLow": 2.42
                }
            }
        },
        "cardmarket": {
            "url": "https://prices.pokemontcg.io/cardmarket/hgss4-1",
            "updatedAt": "2023/12/20",
            "prices": {
                "averageSellPrice": 3.99,
                "lowPrice": 0.4,
                "trendPrice": 4.19,
                "germanProLow": 0,
                "suggestedPrice": 0,
                "reverseHoloSell": 1.13,
                "reverseHoloLow": 0.7,
                "reverseHoloTrend": 2.47,
                "lowPriceExPlus": 1,
                "avg1": 3.99,
                "avg7": 6.67,
                "avg30": 3.58,
                "reverseHoloAvg1": 1,
                "reverseHoloAvg7": 2.63,
                "reverseHoloAvg30": 3.02
            }
        }
    },];

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
