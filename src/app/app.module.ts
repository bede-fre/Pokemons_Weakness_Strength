import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonService } from './pokemon.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    MessageComponent
  ],
  
  imports:      [ 
    BrowserModule,
    FormsModule
  ],

  bootstrap:    [
    AppComponent
 ],

  providers: [PokemonService, MessageService]
})
export class AppModule { }