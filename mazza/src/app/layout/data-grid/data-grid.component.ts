import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxButtonModule, IgxChipsModule, IgxGridComponent, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxPaginatorComponent, IgxRippleModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { ApiDataResourceService } from '../../../data/api-data-resource.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  standalone: true,
  imports: [LoadingIndicatorComponent, CommonModule, FormsModule, IgxGridComponent, IgxPaginatorComponent, IgxButtonModule, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxRippleModule, IgxChipsModule]

})
export class DataGridComponent implements OnInit {
  public data: any[] = [];
  title = 'pokemonGrid';
  showGrid = false;

  @ViewChild('grid1', { static: true })
  public grid!: IgxGridComponent;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;

  constructor(private pokemonResourceService: ApiDataResourceService) { }

  ngOnInit(): void {
    this.pokemonResourceService.content().subscribe(collection => {
      this.showGrid = true;
      this.data = collection.map((card: any, index: number) => ({ index: index, id: card.id, name: card.name, types: (card.types.join(", ")), supertype: card.supertype }));
    })
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
