import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})

export class PokemonsComponent implements OnInit {
  pokemonsFullList: Pokemon[]
  
  constructor(
    private pokemonService: PokemonService
    ) { }
 
  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemonsFullListFromServer()
      .subscribe(pokemons => this.pokemonsFullList = pokemons);
  }

  add(pokemonName: string): void {
    pokemonName = pokemonName.trim();
    if (!name) { return; }
    this.pokemonService.addPokemonOnServer({ pokemonName } as Pokemon)
      .subscribe(pokemon => this.pokemonsFullList.push(pokemon));
  }

  delete(pokemon: Pokemon): void {
    this.pokemonsFullList = this.pokemonsFullList.filter(p => p !== pokemon);
    this.pokemonService.deletePokemonFromServer(pokemon).subscribe();
  }
}