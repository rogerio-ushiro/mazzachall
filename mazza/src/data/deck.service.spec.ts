import { TestBed } from '@angular/core/testing';
import { DeckService } from './deck.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DeckService', () => {
  let service: DeckService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeckService],
    });

    service = TestBed.inject(DeckService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('the service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new deck', () => {
    const deckName = 'Test Deck';
    const createdDeck = service.createDeck(deckName);

    const decks = service.getAllDecks();
    expect(decks.some(deck => deck.name === deckName)).toBeTruthy();
  });

  it('should delete a deck', () => {
    const deckId = 'some-unique-id';
    const initialDecks = service.getAllDecks();

    service.createDeck('Deck to delete');

    service.deleteDeck(deckId);

    const updatedDecks = service.getAllDecks();
    expect(updatedDecks.length).toBe(initialDecks.length);
    expect(updatedDecks.some(deck => deck.id === deckId)).toBeFalsy();
  });

});
