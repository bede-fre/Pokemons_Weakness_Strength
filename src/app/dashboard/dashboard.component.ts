import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  topDashboardPokemons: Pokemon [] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();                                                             //Get Pokemons full list update in real time
  }

  getPokemons(): void {
    this.pokemonService.getPokemonsFullListFromServer()
      .subscribe(pokemons => this.topDashboardPokemons = pokemons.slice(3, 6));    //Show in dashboard 'Top' three pokemons id:3 to 6
  }
}