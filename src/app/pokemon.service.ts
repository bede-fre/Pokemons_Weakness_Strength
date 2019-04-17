import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class PokemonService {
  constructor(private messageService: MessageService) { }

  getPokemons(): Observable<Pokemon[]> {
    // TODO: send the message _after_ fetching the pokemons
    this.messageService.add('PokemonService: fetched pokemons');
    return of(POKEMONS);
  }

  getPokemon(id: number): Observable<Pokemon> {
    // TODO: send the message _after_ fetching the pokemon
    this.messageService.add(`PokemonService: fetched pokemon id=${id}`);
    return of(POKEMONS.find(pokemon => pokemon.id === id));
  }
}