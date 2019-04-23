import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit {
  pokemonSelectByIdPage: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.getPokemon();                                                    //Get Pokemon in full list update in real time
  }

  getPokemon(): void {
    const idPokemonActualPage = +this.route.snapshot.paramMap.get('id');  //Get Id of the pokemon detail page you are on 
    this.pokemonService.getPokemonByIdFromServer(idPokemonActualPage)     //get pokemon on the server by its id 
      .subscribe(pokemon => this.pokemonSelectByIdPage = pokemon);
  }

  goBackToLastPageVisited(): void {
    this.location.back();
  }

  savePokemonName(): void {
    this.pokemonService.updatePokemonNameOnServer(this.pokemonSelectByIdPage) //Save name users input and update pokemon list on the server
      .subscribe(() => this.goBackToLastPageVisited());                         //Go back to last page visit
  }
}