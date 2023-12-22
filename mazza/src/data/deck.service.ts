import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ApiDataResourceService } from './api-data-resource.service';
import initialMockDeck from '../../src/assets/initialMockDeck.json';
import { Deck } from './types/Deck';
import { Card } from './types/Card';
import { DuplicateDataError } from './types/DuplicateDataError';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private cache: BehaviorSubject<any> = new BehaviorSubject(initialMockDeck);
  private currentDeck!: Deck;

  constructor(private pokemonResourceService: ApiDataResourceService) { }

  public createDeck(deckName: string): Observable<Deck> {
    let decks: Deck[] = this.getAllDecks();
    const existingDeck = this.findDeckByName(deckName);

    if (!existingDeck) {
      const newDeck: Deck = {
        id: uuidv4(),
        name: deckName,
        cards: [],
      };

      decks.push(newDeck);
      this.cache.next([...decks]);
      return of(newDeck);
    } else {
      return throwError(new DuplicateDataError(`Deck '${deckName}' already exists.`));
    }
  }

  public setCurrentDeck(deckId: string) {
    this.currentDeck = this.findDeckById(deckId);
    return this.currentDeck;
  }

  public getCurrentDeck() {
    return this.currentDeck;
  }

  public deleteDeck(id: string): Deck[] {
    this.cache.next(this.getAllDecks().filter(e => e.id !== id));
    return this.getAllDecks();
  }

  public getAllDecks(): Deck[] {
    return this.cache.getValue();
  }

  public findDeckById(id: string): Deck {
    let decks: Deck[] = this.getAllDecks();
    return decks.find(e => e.id == id) as Deck;;
  }

  public findDeckByName(name: string): Deck {
    let decks: Deck[] = this.getAllDecks();
    return decks.find(e => e.name == name) as Deck;
  }

  public saveDeckName(newName: string) {
    let decks: Deck[] = this.getAllDecks();
    const deckIndex = decks.findIndex(e => e.id == this.currentDeck.id);
    this.currentDeck.name = newName;
    decks[deckIndex] = this.currentDeck;
    this.cache.next(decks);
    return this.currentDeck;
  }

  public addCardToDeck(cardId: string): Deck {
    let decks: Deck[] = this.getAllDecks();
    const deckIndex = decks.findIndex(e => e.id == this.currentDeck.id);
    this.pokemonResourceService.content().subscribe(collection => {
      const newCard = collection.find((e: Card) => e.id == cardId);
      this.currentDeck.cards.push(newCard)
    });
    decks[deckIndex] = this.currentDeck;
    this.cache.next(decks);
    return this.currentDeck;
  }

  public removeCardFromDeck(cardId: string): Deck {
    let decks: Deck[] = this.getAllDecks();
    const deckIndex = decks.findIndex(e => e.id == this.currentDeck.id);
    this.currentDeck.cards = this.currentDeck.cards.filter((e: any) => e.id != cardId);
    decks[deckIndex] = this.currentDeck;
    this.cache.next(decks);
    return this.currentDeck;
  }


}
