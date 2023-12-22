import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { PokemonResourceService } from './pokemon-resource.service';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private cache: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private pokemonResourceService: PokemonResourceService) {
    this.createDeck("Cards d'água");
    this.createDeck("Cards de fogo");
    this.createDeck("Cards de terra");
  }

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

  public deleteDeck(id: string): Deck[] {
    this.cache.next(this.getAllDecks().filter(e => e.id !== id));
    return this.getAllDecks();
  }

  public getAllDecks(): Deck[] {
    return this.cache.getValue();
  }

  public addCardToDeck(deckId: string, cardId: string): Deck {
    let decks: Deck[] = this.getAllDecks();
    const deckFound = decks.find(e => e.id == deckId) as Deck;
    const deckIndex = decks.findIndex(e => e.id == deckId);

    this.pokemonResourceService.content().subscribe(collection => {
      deckFound.cards.push(collection.find((e: any) => e.id == cardId))
    });
    decks[deckIndex] = deckFound;
    this.cache.next(decks);
    return deckFound;
  }

  public findDeckById(id: string): Deck {
    let decks: Deck[] = this.getAllDecks();
    return decks.find(e => e.id == id) as Deck;;
  }

  public findDeckByName(name: string) {
    let decks: Deck[] = this.getAllDecks();
    return decks.find(e => e.name == name);
  }

}

interface Deck {
  id: string
  name: string
  cards: string[]
}

class DuplicateDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateDataError";
  }
}