import { Routes } from '@angular/router';
import { AllDecksComponent } from './pages/all-decks/all-decks.component';
import { AllCollectionComponent } from './pages/all-collection/all-collection.component';
import { DeckEditComponent } from './pages/deck-edit/deck-edit.component';
import { UncaughtErrorComponent } from './layout/error-routing/error/uncaught-error.component';
import { PageNotFoundComponent } from './layout/error-routing/not-found/not-found.component';
import { DeckViewFormComponent } from './pages/deck-view/deck-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/all-decks', pathMatch: 'full' },
  { path: 'all-decks', component: AllDecksComponent, data: { text: '1. Seus Baralhos' } },
  { path: 'all-collection', component: AllCollectionComponent, data: { text: '2. Consulta de Pokemons' } },
  { path: 'deck-view/:id', component: DeckViewFormComponent },
  { path: 'deck-edit/:id', component: DeckEditComponent },
  { path: 'error', component: UncaughtErrorComponent },
  { path: '**', component: PageNotFoundComponent }
]; 