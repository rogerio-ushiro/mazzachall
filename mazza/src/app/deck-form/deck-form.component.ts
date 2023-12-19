import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-deck-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.scss'
})

export class DeckFormComponent implements OnInit {
  newDeckForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newDeckForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.newDeckForm?.valid) {
      console.log(this.newDeckForm.value);
    }
  }
}


