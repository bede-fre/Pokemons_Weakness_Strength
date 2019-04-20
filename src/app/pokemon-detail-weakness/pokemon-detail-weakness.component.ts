import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';
import { WeaknessStrengthService } from '../weakness-strength.service';

@Component({
  selector: 'app-pokemon-detail-weakness',
  templateUrl: './pokemon-detail-weakness.component.html',
  styleUrls: ['./pokemon-detail-weakness.component.css']
})

export class PokemonDetailWeaknessComponent implements OnInit {
  pokemonsList: Pokemon[] = []
  selectedPokemons: Pokemon[] = []
  bol: boolean;
  pokemonName: string;
  link: Pokemon
  tab: Array<string> = []

  constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService,
      private weaknessStrengthService: WeaknessStrengthService
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
      this.pokemonName = pokemon;
      this.pokemonName = this.pokemonName.trim();
      this.tab = this.pokemonName.split('.', 2);
      this.link = {
        id: parseInt(this.tab[0]),
        name: this.tab[1]
      }
      if (this.samePokemon(this.link.id)) {
        return ;
      }

      else {
          this.selectedPokemons.push(this.link);            //Add pokemon Weakness to its list
          this.selectedPokemons.sort(function (x, y) {      //Sort pokemon weaknesses list by id
            return x.id - y.id;
        });
      }
    }
  }

    //
  samePokemon(pokemon): boolean {
    for (var cpt = 0 ; cpt < this.selectedPokemons.length ; cpt++) {
      if (this.selectedPokemons[cpt].id == pokemon) {
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
    this.selectedPokemons = [];
  }

  //Delete the pokemon selected
  deleteSelectedPokemon(pokemon): void {
    if (this.selectedPokemons.length === 1)
      this.selectedPokemons = [];
    else {
      var cpt = this.arrayPositionName(pokemon);
      this.selectedPokemons.splice(cpt, 1);
    }
  }

  //Return pokemon's array position 
  arrayPositionName(pokemon): number {
      console.log(pokemon.id);
      for (var cpt = 0 ; cpt < this.selectedPokemons.length ; cpt++) {
      if (this.selectedPokemons[cpt].id == pokemon.id) {
        return (cpt);
      }
    }
  }
}