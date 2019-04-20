import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon';

import { PokemonService } from './pokemon.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' }
)

export class WeaknessStrengthService {
  selectedPokemon: Pokemon

  constructor(
    private pokemonService: PokemonService
  ) { }

  getClickedPokemon(pokemon): Observable<Pokemon> {
    return(pokemon);
  }

}