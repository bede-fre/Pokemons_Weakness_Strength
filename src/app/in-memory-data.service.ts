import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pokemons = [
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'Ivysaur' },
      { id: 3, name: 'Venusaur' },
      { id: 4, name: 'Charmander' },
      { id: 5, name: 'Charmeleon' },
      { id: 6, name: 'Charizard' },
      { id: 7, name: 'Squirtle' },
      { id: 8, name: 'Warturtle' },
      { id: 9, name: 'Blastoise' }
    ];
    return {pokemons};
  }

  // Overrides the genId method to ensure that a pokemon always has an id.
  // If the pokemons array is empty,
  // the method below returns the initial number (11).
  // if the pokemons array is not empty, the method below returns the highest
  // pokemon id + 1.

  genId(pokemons: Pokemon[]): number {
    return pokemons.length > 0 ? Math.max(...pokemons.map(pokemon => pokemon.id)) + 1 : 1;
  }
}