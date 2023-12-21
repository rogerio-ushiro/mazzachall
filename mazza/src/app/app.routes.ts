import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { NewDeckFormComponent } from './new-deck-form/new-deck-form.component';
import { PokemonGridComponent } from './pokemon-grid/pokemon-grid.component';
import { EditDeckFormComponent } from './edit-deck-form/edit-deck-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'new-deck', component: NewDeckFormComponent, data: { text: 'Create Deck' } },
  { path: 'edit-deck/:id', component: EditDeckFormComponent },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'pokemon-grid', component: PokemonGridComponent, data: { text: 'pokemonGrid' } },
  { path: '**', component: PageNotFoundComponent }
]; 