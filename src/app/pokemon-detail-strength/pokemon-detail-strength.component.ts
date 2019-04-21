import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';
import { WeaknessStrengthService } from '../weakness-strength.service';

@Component({
  selector: 'app-pokemon-detail-strength',
  templateUrl: './pokemon-detail-strength.component.html',
  styleUrls: ['./pokemon-detail-strength.component.css']
})

export class PokemonDetailStrengthComponent implements OnInit {
  pokemonsList: Pokemon[] = []
  selectedPokemonStrengths: Pokemon[] = []
  pokemonName: string;

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
  getSelectedPokemonStrengths(pokemon): void {
    const idPage = +this.route.snapshot.paramMap.get('id');
    this.selectedPokemonStrengths = this.weaknessStrengthService.getSelectedPokemons(pokemon, idPage);
  }

  //Insert Pokemon name in visual input
  getPokemonNameStrength(event: any): void {
    this.pokemonName = this.weaknessStrengthService.getPokemonName(event);
  }

  //Clear all Pokemon Weaknesses
  clear(): void {
    this.selectedPokemonStrengths = this.weaknessStrengthService.clearListSelectedPokemons();
  }

  //Delete the pokemon selected
  deleteSelectedPokemonStrength(pokemon): void {
    this.selectedPokemonStrengths = this.weaknessStrengthService.deleteSelectedPokemon(pokemon);
  }
}