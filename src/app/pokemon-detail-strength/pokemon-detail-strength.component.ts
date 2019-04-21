import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail-strength',
  templateUrl: './pokemon-detail-strength.component.html',
  styleUrls: ['./pokemon-detail-strength.component.css']
})

export class PokemonDetailStrengthComponent implements OnInit {
  pokemonsList: Pokemon[] = []
  selectedPokemonStrengths: Pokemon[] = []
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
          this.selectedPokemonStrengths.push(link);                     //Add pokemon Weakness to its list
          this.selectedPokemonStrengths.sort(function (x, y) {          //Sort pokemon weaknesses list by id
            return x.id - y.id;
        });
      }
    }
  }

  //Compare a Pokemon in the selected pokemons list
  samePokemon(pokemon): boolean {
    for (let cpt = 0 ; cpt < this.selectedPokemonStrengths.length ; cpt++) {
      if (this.selectedPokemonStrengths[cpt].id == pokemon) {
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
    this.selectedPokemonStrengths = [];
  }

  //Delete the pokemon selected
  deleteSelectedPokemon(pokemon): void {
    if (this.selectedPokemonStrengths.length === 1)
      this.selectedPokemonStrengths = [];
    else {
      let cpt = this.arrayPositionName(pokemon);
      this.selectedPokemonStrengths.splice(cpt, 1);
    }
  }

  //Return pokemon's array position 
  arrayPositionName(pokemon): number {
      for (let cpt = 0 ; cpt < this.selectedPokemonStrengths.length ; cpt++)
        if (this.selectedPokemonStrengths[cpt].id == pokemon.id)
        return (cpt);
  }
}