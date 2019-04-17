import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PokemonService } from './pokemon.service';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    MessageComponent,
    DashboardComponent
  ],
  
  imports:      [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],

  bootstrap:    [
    AppComponent
 ],

  providers: [
    PokemonService,
    MessageService
  ]
})

export class AppModule { }