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
    this.getPokemonsServerList();
  }

  getPokemonsServerList(): void {
    this.pokemonService.getPokemonsFullListFromServer()
    .subscribe(pokemons => this.pokemonsFullList = pokemons);
  }

  addPokemonToFullList(name: string): void {
    name = name.trim();
    if (!name){return; }
    console.log(name);
    this.pokemonService.addPokemonOnserver({ name } as Pokemon)
      .subscribe(pokemonAddToFullList => this.pokemonsFullList.push(pokemonAddToFullList));
  }

  deletePokemonFromFullList(pokemonToDelete: Pokemon): void {
    this.pokemonsFullList = this.pokemonsFullList.filter(pokemonCompare => pokemonCompare !== pokemonToDelete);
    this.pokemonService.deletePokemonFromServer(pokemonToDelete).subscribe();
  }
}