import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgxButtonGroupModule, IgxFilterModule, IgxFilterOptions, IgxIconModule, IgxInputGroupModule, IgxListModule, IgxRippleModule } from 'igniteui-angular';
import { PokemonResourceService } from '../services/pokemon-resource.service';

@Component({
    selector: 'app-contact-list2',
    standalone: true,
    imports: [IgxButtonGroupModule, IgxInputGroupModule, IgxIconModule, IgxListModule,
        IgxRippleModule, CommonModule, IgxFilterModule, FormsModule],
    styleUrls: ['./list-sample-4.component.scss'],
    templateUrl: './list-sample-4.component.html'
})

export class ListSample4Component {
    public searchCard: string | undefined;
    public cards = [];

    public size = 'medium';

    constructor(private pokemonResourceService: PokemonResourceService) {
        pokemonResourceService.content().subscribe(collection => { this.cards = collection })
    }

    @HostBinding('style.--ig-size')
    protected get sizeStyle() {
        return `var(--ig-size-${this.size})`;
    }

    public toggleFavorite(contact: any, event: Event) {
        event.stopPropagation();
        contact.isFavorite = !contact.isFavorite;
    }

    get filterContacts() {
        const fo = new IgxFilterOptions();
        fo.key = 'name';
        fo.inputValue = this.searchCard;
        return fo;
    }

    public mousedown(event: Event) {
        event.stopPropagation();
    }
}
