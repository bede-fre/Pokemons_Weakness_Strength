import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail-weakness',
  templateUrl: './pokemon-detail-weakness.component.html',
  styleUrls: ['./pokemon-detail-weakness.component.css']
})

export class PokemonDetailWeaknessComponent implements OnInit {
  pokemonsList: Pokemon[] = []
  selectedPokemonWeaknesses: Pokemon[] = []
  pokemonName: string;
  bol: boolean;

  constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getPokemons();
  }

  //Get the full list of pokemons
  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemonsList = pokemons);
  }

  //Get the list of selected pokemons
  getSelectedPokemons(pokemon): void {
    if (pokemon) {
      const idPage = +this.route.snapshot.paramMap.get('id');
      this.pokemonName = pokemon.trim();
      let tab = this.pokemonName.split('.', 2);
      let link = {
        id: parseInt(tab[0]),
        name: tab[1]
      }
      if (this.samePokemon(link.id) || (link.id == idPage))     //Block if you want to add the same pokemon or the pokemon
        return ;                                                //your are on its details page
      else {
          this.selectedPokemonWeaknesses.push(link);                     //Add pokemon Weakness to its list
          this.selectedPokemonWeaknesses.sort(function (x, y) {          //Sort pokemon weaknesses list by id
            return x.id - y.id;
        });
      }
    }
  }

  //Compare a Pokemon in the selected pokemons list
  samePokemon(pokemon): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonWeaknesses.length ; cpt++) {
      if (this.selectedPokemonWeaknesses[cpt].id == pokemon) {
        return (true);
      }
    }
    return (false);
  }

  //Insert Pokemon name in visual input
  inputPokemonName(event: any): void {
    this.pokemonName = event.target.value;
  }

  //Clear all Pokemon Weaknesses
  clear(): void {
    this.selectedPokemonWeaknesses = [];
  }

  //Delete the pokemon selected
  deleteSelectedPokemon(pokemon): void {
    if (this.selectedPokemonWeaknesses.length === 1)
      this.selectedPokemonWeaknesses = [];
    else {
      let cpt = this.arrayPositionName(pokemon);
      this.selectedPokemonWeaknesses.splice(cpt, 1);
    }
  }

  //Return pokemon's array position 
  arrayPositionName(pokemon): number {
      for (let cpt = 0 ; cpt < this.selectedPokemonWeaknesses.length ; cpt++)
        if (this.selectedPokemonWeaknesses[cpt].id == pokemon.id)
        return (cpt);
  }
}