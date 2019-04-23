import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon';

@Injectable(
  { providedIn: 'root' }
)

export class WeaknessStrengthService {
  selectedPokemonsWeaknesses: Pokemon[] = []
  selectedPokemonsStrengths: Pokemon[] = []
  pokemonIdandName: string;

  constructor() { }

  //Get the list of selected pokemons
  getSelectedPokemons(pokemonSelectedIdAndName, idPage, isItWeaknessOrStrengthList): Pokemon[] {
    if (pokemonSelectedIdAndName) {                                                        //if pokemon exist so you can continue the code else tou stop
      this.pokemonIdandName = pokemonSelectedIdAndName.trim();                             //get rid of whitespace
      let splitedPokemonIdandName = this.pokemonIdandName.split('.', 2);  //split the id and the name 
      let pokemonSelected = {                                                 //we place id an name inside a pokemon class
        id: parseInt(splitedPokemonIdandName[0]),
        name: splitedPokemonIdandName[1]
      }
      if (isItWeaknessOrStrengthList == true)                                               //we do the code below only if it's the pokemon weakness list
        return (this.returnWeaknessPokemonList(pokemonSelected, idPage));
      else if (isItWeaknessOrStrengthList == false)                                         //we do the code below only if it's the pokemon strength list
        return (this.returnStrengthPokemonList(pokemonSelected, idPage));
    }
    return ;
  }

  //return the pokemon Weaknesses List
  returnWeaknessPokemonList(pokemonSelected, idActualPage): Pokemon[] {
    if (this.comparePokemonWeaknessList(pokemonSelected.id) || pokemonSelected.id == idActualPage || this.weaknessChoices(pokemonSelected.id))
      return (this.selectedPokemonsWeaknesses);                      //Block if you want to add the same pokemon Weakness or the pokemon
    else {                                                           //you are on its details page
      this.selectedPokemonsWeaknesses.push(pokemonSelected);                 //Add pokemon Weakness to its list
      this.selectedPokemonsWeaknesses.sort(function (x, y) {         //Sort pokemon weaknesses list by id
        return x.id - y.id;
      });
    }
    return (this.selectedPokemonsWeaknesses);                         //Return pokemon weakness list
  }

  //Compare a Pokemon in the selected pokemons list
  comparePokemonWeaknessList(pokemonId): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonsWeaknesses.length ; cpt++)  //Loop on list of pokemon
      if (this.selectedPokemonsWeaknesses[cpt].id == pokemonId)               //If you find the pokemon id inpu in the pokemon weakness list
        return (true);                                                        //do the code below
    return (false);
  }

  //return the pokemon Strengths List
  returnStrengthPokemonList(pokemonSelected, idActualPage): Pokemon[] {   
    if (this.comparePokemonStrengthList(pokemonSelected.id) || pokemonSelected.id == idActualPage || this.strengthChoices(pokemonSelected.id))    
      return (this.selectedPokemonsStrengths);                       //Block if you want to add the same pokemon Strength or the pokemon
    else {                                                           //you are on its details page
      this.selectedPokemonsStrengths.push(pokemonSelected);                  //Add pokemon Strength to its list
      this.selectedPokemonsStrengths.sort(function (x, y) {          //Sort pokemon Strengths list by id
        return x.id - y.id;
      });
    }
  return (this.selectedPokemonsStrengths);                            //Return pokemon strength list
  }


  //Compare a Pokemon in the selected pokemons list
  comparePokemonStrengthList(pokemonId): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonsStrengths.length ; cpt++)  //Loop on list of pokemon
      if (this.selectedPokemonsStrengths[cpt].id == pokemonId)               //If you find the pokemon id inpu in the pokemon strength list
        return (true);                                                       //do the code below
    return (false);
  }

  //Return Pokemon based on id input
  weaknessChoices(pokemonId): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonsStrengths.length ; cpt++)     //Loop on list of pokemon strength choices
        if (this.selectedPokemonsStrengths[cpt].id == pokemonId)                //if you find the id input on the list 
          return (true);                                                        //you won't be able to add this pokemon to weakness choices
    return (false);
  }

   strengthChoices(pokemonId): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonsWeaknesses.length ; cpt++)    //Loop on list of pokemon weakness choices
        if (this.selectedPokemonsWeaknesses[cpt].id == pokemonId)               //if you find the id input on the list
          return (true);                                                        //you won't be able to add this pokemon to strength choices
    return (false);
  }

  //Get Pokemon name from event
  getPokemonName(event: any): string {
    return (this.pokemonIdandName = event.target.value);
  }

  //Clear pokemon's list selected
  clearListSelectedPokemons(isItWeaknessOrStrengthList): Pokemon[] {
    if (isItWeaknessOrStrengthList == true)                                                        //Depending of the input, basically if you are
      return (this.selectedPokemonsWeaknesses = []);                             //on pokemon strength or weakness list
    else                                                                         //you will clear the one or the other
      return (this.selectedPokemonsStrengths = []);
  }

  //Delete the pokemon selected
  deleteSelectedPokemon(pokemon, isItWeaknessOrStrengthList): Pokemon[] {
    if (this.selectedPokemonsWeaknesses.length === 1 && isItWeaknessOrStrengthList == true)
      return (this.selectedPokemonsWeaknesses = []);
    else if (this.selectedPokemonsStrengths.length === 1 && isItWeaknessOrStrengthList == false)
      return (this.selectedPokemonsStrengths = []);
    else {
      if (isItWeaknessOrStrengthList == true) {
        let cptW = this.arrayPositionName(pokemon, isItWeaknessOrStrengthList);
        let deleteElementW = this.selectedPokemonsWeaknesses.splice(cptW, 1)
        return (this.selectedPokemonsWeaknesses);
      }
      else {
        let cptS = this.arrayPositionName(pokemon, isItWeaknessOrStrengthList);
        let deleteElementS = this.selectedPokemonsStrengths.splice(cptS, 1)
        return (this.selectedPokemonsStrengths);
      }
    }
  }

  //Return pokemon's array position 
  arrayPositionName(pokemon, isItWeaknessOrStrengthList): number {
    if (isItWeaknessOrStrengthList == true) {
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