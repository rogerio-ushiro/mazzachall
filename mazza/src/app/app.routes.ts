import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { NewDeckFormComponent } from './new-deck-form/new-deck-form.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, data: { text: 'Home' } },
	{ path: 'new-deck', component: NewDeckFormComponent, data: { text: 'new deck form' } },
	{ path: 'error', component: UncaughtErrorComponent },
	{ path: '**', component: PageNotFoundComponent } // must always be last
];
	