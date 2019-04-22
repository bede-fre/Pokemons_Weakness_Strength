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
  pokemonsList: Pokemon[]
  selectedPokemonWeaknesses: Pokemon[] = []
  pokemonName: string;
  isItWeak: boolean = true;

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
  getSelectedPokemonWeaknesses(pokemon): void {
    const idPage = +this.route.snapshot.paramMap.get('id');
    this.selectedPokemonWeaknesses = this.weaknessStrengthService.getSelectedPokemons(pokemon, idPage, this.isItWeak);
  }

  //Insert Pokemon name in visual input
  getPokemonNameWeakness(event: any): void {
    this.pokemonName = this.weaknessStrengthService.getPokemonName(event);
  }

  //Clear all Pokemon Weaknesses
  clear(): void {
    this.selectedPokemonWeaknesses = this.weaknessStrengthService.clearListSelectedPokemons(this.isItWeak);
  }

  //Delete the pokemon selected
  deleteSelectedPokemonWeakness(pokemon): void {
    this.selectedPokemonWeaknesses = this.weaknessStrengthService.deleteSelectedPokemon(pokemon, this.isItWeak);
  }
}