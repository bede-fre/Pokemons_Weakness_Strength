import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})

export class PokemonSearchComponent implements OnInit {
  pokemonsName$: Observable<Pokemon[]>;
  private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) { }

  // Push a search term into the observable stream.
  search(pokemonName: string): void {
    this.searchTerms.next(pokemonName);
  }

  ngOnInit(): void {
      this.pokemonsName$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((pokemonName: string) => this.pokemonService.searchPokemonNameOnServer(pokemonName)),
    );
  }
}