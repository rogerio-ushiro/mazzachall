import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnType, IgxButtonModule, IgxChipsModule, IgxGridComponent, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxPaginatorComponent, IgxRippleModule } from 'igniteui-angular';
import { allPokemonCards } from './localData';
import { PokemonResourceService } from '../services/pokemon-resource.service';
import { PokemonCard } from '../../models/PokemonCard';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.scss'],
  standalone: true,
  imports: [ NgIf, CommonModule, FormsModule, IgxGridComponent, IgxPaginatorComponent, IgxButtonModule, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxRippleModule, IgxChipsModule]

})
export class PokemonGridComponent implements OnInit {
  // public localData: PokemonCard[] = [];
  public data: any[] = [];
  title = 'pokemonGrid';

  @ViewChild('grid1', { static: true })
  public grid!: IgxGridComponent;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;

  constructor(private pokemonResourceService: PokemonResourceService) { }

  ngOnInit(): void {
    this.data = allPokemonCards.map((item, index) => ({ index: index, id: item.id, name: item.name, types: (item.types.join(", ")), supertype: item.supertype }));
  }

  public clearSearch() {
    this.searchText = '';
    this.grid.clearSearch();
  }

  public searchKeyDown(ev: any) {
    if (ev.key === 'Enter' || ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      this.grid.findPrev(this.searchText, this.caseSensitive, this.exactMatch);
    }
  }

  public updateSearch() {
    this.caseSensitive = !this.caseSensitive;
    this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }

  public updateExactSearch() {
    this.exactMatch = !this.exactMatch;
    this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }




  // public onColumnInit(column: ColumnType): void {
  //   if (column.field === 'RegistererDate') {
  //     column.formatter = (date => date.toLocaleDateString());
  //   }
  // }
}
