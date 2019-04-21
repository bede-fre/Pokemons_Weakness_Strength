import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon';

@Injectable(
  { providedIn: 'root' }
)

export class WeaknessStrengthService {
  selectedPokemonsWeaknesses: Pokemon[] = []
  selectedPokemonsStrengths: Pokemon[] = []
  selectedPokemons: Pokemon[] = []
  pokemonName: string;

  constructor() { }

  //Get the list of selected pokemons
  getSelectedPokemons(pokemon, idPage, isItWeak): Pokemon[] {
    if (pokemon) {
      this.pokemonName = pokemon.trim();
      let tab = this.pokemonName.split('.', 2);
      let link = {
        id: parseInt(tab[0]),
        name: tab[1]
      }
      if (isItWeak == true) {
        if (this.samePokemon(link.id, isItWeak) || link.id == idPage || this.weaknessChoices(link.id))    
        //Block if you want to add the same pokemon or the pokemon
          return (this.selectedPokemonsWeaknesses);                       //your are on its details page
        else {
          this.selectedPokemonsWeaknesses.push(link);                     //Add pokemon Weakness to its list
          this.selectedPokemonsWeaknesses.sort(function (x, y) {          //Sort pokemon weaknesses list by id
            return x.id - y.id;
          });
        }
          return (this.selectedPokemonsWeaknesses);
      }
      else if (isItWeak == false) {
        if (this.samePokemon(link.id, isItWeak) || link.id == idPage || this.strengthChoices(link.id))    //Block if you want to add the same pokemon or the pokemon
          return (this.selectedPokemonsStrengths);                       //your are on its details page
        else {
          this.selectedPokemonsStrengths.push(link);                     //Add pokemon Weakness to its list
          this.selectedPokemonsStrengths.sort(function (x, y) {          //Sort pokemon weaknesses list by id
            return x.id - y.id;
          });
        }
          return (this.selectedPokemonsStrengths);
      }
    }
    return ;
  }

  //Compare a Pokemon in the selected pokemons list
  samePokemon(pokemonId, isItWeak): boolean {
    if (isItWeak == true) {
      for (let cpt = 0 ; cpt < this.selectedPokemonsWeaknesses.length ; cpt++)
        if (this.selectedPokemonsWeaknesses[cpt].id == pokemonId)
          return (true);
    }
    else if (isItWeak == false) {
      for (let cpt = 0 ; cpt < this.selectedPokemonsStrengths.length ; cpt++)
        if (this.selectedPokemonsStrengths[cpt].id == pokemonId)
          return (true);
    }
    return (false);
  }

  weaknessChoices(pokemonId): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonsStrengths.length ; cpt++)
        if (this.selectedPokemonsStrengths[cpt].id == pokemonId)
          return (true);
    return (false);
  }

   strengthChoices(pokemonId): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonsWeaknesses.length ; cpt++)
        if (this.selectedPokemonsWeaknesses[cpt].id == pokemonId)
          return (true);
    return (false);
  }

  //Get Pokemon name from event
  getPokemonName(event: any): string {
    return (this.pokemonName = event.target.value);
  }

  //Clear pokemon's list selected
  clearListSelectedPokemons(isItWeak): Pokemon[] {
    if (isItWeak == true)
      return (this.selectedPokemonsWeaknesses = []);
    else
      return (this.selectedPokemonsStrengths = []);
  }

  //Delete the pokemon selected
  deleteSelectedPokemon(pokemon, isItWeak): Pokemon[] {
    if (this.selectedPokemonsWeaknesses.length === 1 && isItWeak == true)
      return (this.selectedPokemonsWeaknesses = []);
    else if (this.selectedPokemonsStrengths.length === 1 && isItWeak == false)
      return (this.selectedPokemonsStrengths = []);
    else {
      if (isItWeak == true) {
        let cptW = this.arrayPositionName(pokemon, isItWeak);
        let deleteElementW = this.selectedPokemonsWeaknesses.splice(cptW, 1)
        return (this.selectedPokemonsWeaknesses);
      }
      else {
        let cptS = this.arrayPositionName(pokemon, isItWeak);
        let deleteElementS = this.selectedPokemonsStrengths.splice(cptS, 1)
        return (this.selectedPokemonsStrengths);
      }
    }
  }

  //Return pokemon's array position 
  arrayPositionName(pokemon, isItWeak): number {
    if (isItWeak == true) {
      for (let cpt = 0 ; cpt < this.selectedPokemonsWeaknesses.length ; cpt++)
        if (this.selectedPokemonsWeaknesses[cpt].id == pokemon.id)
          return (cpt);
    }
    else {
      for (let cpt = 0 ; cpt < this.selectedPokemonsStrengths.length ; cpt++)
        if (this.selectedPokemonsStrengths[cpt].id == pokemon.id)
          return (cpt);
    }
  }
}