import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable()

export class PokemonService {

  getPokemons(): Observable<Pokemon[]> {
    // TODO: send the message _after_ fetching the PokemonService
    this.messageService.add('PokemonService: fetched pokemons');
    return of(POKEMONS);
  }

  constructor(private messageService: MessageService) { }

}