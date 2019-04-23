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
  pokemonsFullList: Pokemon[]
  selectedPokemonWeaknesses: Pokemon[] = []
  pokemonSelectedIdAndName: string;
  isItWeaknessOrStrengthList: boolean = true;

  constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService,
      private weaknessStrengthService: WeaknessStrengthService
  ) { }

  ngOnInit() {
    this.getPokemonsServerList();
  }

  //Get the full list of pokemons
  getPokemonsServerList(): void {
    this.pokemonService.getPokemonsFullListFromServer()
      .subscribe(pokemons => this.pokemonsFullList = pokemons);
  }

  //Get the list of selected pokemons
  getSelectedPokemonWeaknesses(pokemonSelectedIdAndName): void {
    const pokemonIdActualDetailPage = +this.route.snapshot.paramMap.get('id');         //Get Id of the pokemon detail page you are on
    this.selectedPokemonWeaknesses = this.weaknessStrengthService.getSelectedPokemons(pokemonSelectedIdAndName, pokemonIdActualDetailPage, this.isItWeaknessOrStrengthList);
  }

  //Insert Pokemon name in visual input
  getPokemonNameWeakness(event: any): void {
    this.pokemonSelectedIdAndName = this.weaknessStrengthService.getPokemonName(event);
  }

  //Clear all Pokemons from Weakness List
  clear(): void {
    this.selectedPokemonWeaknesses = this.weaknessStrengthService.clearListSelectedPokemons(this.isItWeaknessOrStrengthList);
  }

  //Delete the pokemon selected from Weakness List
  deleteSelectedPokemonWeakness(pokemonToDelete): void {
    this.selectedPokemonWeaknesses = this.weaknessStrengthService.deleteSelectedPokemon(pokemonToDelete, this.isItWeaknessOrStrengthList);
  }
}