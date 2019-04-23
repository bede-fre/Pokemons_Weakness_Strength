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
  pokemonsFullList: Pokemon[]
  selectedPokemonStrengths: Pokemon[] = []
  pokemonSelectedIdAndName: string;
  isItWeaknessOrStrengthList: boolean = false;

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
  getSelectedPokemonStrengths(pokemonSelectedIdAndName): void {
    const pokemonIdActualDetailPage = +this.route.snapshot.paramMap.get('id');     //Get Id of the pokemon detail page you are on
    this.selectedPokemonStrengths = this.weaknessStrengthService.getSelectedPokemons(pokemonSelectedIdAndName, pokemonIdActualDetailPage, this.isItWeaknessOrStrengthList);
  }

  //Insert Pokemon name in visual input
  getPokemonNameStrength(event: any): void {
    this.pokemonSelectedIdAndName = this.weaknessStrengthService.getPokemonName(event);
  }

  //Clear all Pokemons from Strength List
  clear(): void {
    this.selectedPokemonStrengths = this.weaknessStrengthService.clearListSelectedPokemons(this.isItWeaknessOrStrengthList);
  }

  //Delete the pokemon selected from Strength List
  deleteSelectedPokemonStrength(pokemonToDelete): void {
    this.selectedPokemonStrengths = this.weaknessStrengthService.deleteSelectedPokemon(pokemonToDelete, this.isItWeaknessOrStrengthList);
  }
}