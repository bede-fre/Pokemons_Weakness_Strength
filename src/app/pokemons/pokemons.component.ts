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
    this.getPokemonsServerList();                                   //Get Pokemons full list update in real time
  }
  
  getPokemonsServerList(): void {
    this.pokemonService.getPokemonsFullListFromServer()
    .subscribe(pokemons => this.pokemonsFullList = pokemons);
  }

  //Add new pokemon to the full server list
  addPokemonToFullList(name: string): void {
    name = name.trim();                                             //Delete whitespaces
    if (!name){return; }                                            //Nothing done if there nothing in name 
    this.pokemonService.addPokemonOnserver({ name } as Pokemon)
      .subscribe(pokemonAddToFullList => this.pokemonsFullList.push(pokemonAddToFullList));
  }

  //Delete a selected pokemon from full server list
  deletePokemonFromFullList(pokemonToDelete: Pokemon): void {
    this.pokemonsFullList = this.pokemonsFullList.filter(pokemonCompare => pokemonCompare !== pokemonToDelete);
    this.pokemonService.deletePokemonFromServer(pokemonToDelete).subscribe();
  }
}