import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';

import { PokemonService } from './pokemon.service';


@Injectable(
  { providedIn: 'root' }
)

export class WeaknessStrengthService {
  pokemonsList: Pokemon[] = []
  selectedPokemons: Pokemon[] =[]
  pokemonName: string;

  constructor(
    private pokemonService: PokemonService
  ) { }

  //Get the full list of pokemons
  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemonsList = pokemons);
  }

  //Get the list of selected pokemons
  getSelectedPokemons(pokemon, idPage): Pokemon[] {
    if (pokemon) {
      this.pokemonName = pokemon.trim();
      let tab = this.pokemonName.split('.', 2);
      let link = {
        id: parseInt(tab[0]),
        name: tab[1]
      }
      if (this.samePokemon(link.id) || (link.id == idPage))  //Block if you want to add the same pokemon or the pokemon
        return (this.selectedPokemons);                                      //your are on its details page
      else {
        this.selectedPokemons.push(link);                     //Add pokemon Weakness to its list
        this.selectedPokemons.sort(function (x, y) {          //Sort pokemon weaknesses list by id
          return x.id - y.id;
        });
      }
        return (this.selectedPokemons);
    }
    return ;
  }

  //Compare a Pokemon in the selected pokemons list
  samePokemon(pokemon): boolean {
      for (let cpt = 0 ; cpt < this.selectedPokemons.length ; cpt++)
        if (this.selectedPokemons[cpt].id == pokemon)
          return (true);
    return (false);
  }

  //Get Pokemon name from event
  getPokemonName(event: any): string {
    return (this.pokemonName = event.target.value);
  }

  //Clear pokemon's list selected
  clearListSelectedPokemons(): Pokemon[] {
    return (this.selectedPokemons = []);
  }

  //Delete the pokemon selected
  deleteSelectedPokemon(pokemon): Pokemon[] {
    if (this.selectedPokemons.length === 1)
      return (this.selectedPokemons = []);
    else {
      let cpt = this.arrayPositionName(pokemon);
      let deletEelement = this.selectedPokemons.splice(cpt, 1)
      return (this.selectedPokemons);
    }
  }

  //Return pokemon's array position 
  arrayPositionName(pokemon): number {
      for (let cpt = 0 ; cpt < this.selectedPokemons.length ; cpt++)
        if (this.selectedPokemons[cpt].id == pokemon.id)
        return (cpt);
  }
}