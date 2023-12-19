import { Component } from '@angular/core';
import { DeckFormComponent } from '../deck-form/deck-form.component';

@Component({
  selector: 'app-new-deck-form',
  standalone: true,
  imports: [DeckFormComponent],
  templateUrl: './new-deck-form.component.html',
  styleUrl: './new-deck-form.component.scss'
})

export class NewDeckFormComponent {

}