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
  pokemonsList: Pokemon[]
  selectedPokemons: Pokemon[] = []
  bol: boolean;

  constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemonsList = pokemons);
  }

  listSelectedPokemons(pokemon): void {
    this.selectedPokemons.push(pokemon);
  }

  clear(): void {
    this.selectedPokemons = [];
  }
  
  delete(): void {
    this.selectedPokemons.pop();
  }

  show(test: boolean): void {
    if (test == true) {
      this.getPokemons();
      this.bol = false;
    }
    else {
      this.pokemonsList = [];
      this.bol = true;
    }
  }
}