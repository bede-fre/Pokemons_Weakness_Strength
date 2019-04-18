import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PokemonService } from './pokemon.service';
import { MessageService } from './message.service';
import { InMemoryDataService } from './in-memory-data.service';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonDetailWeaknessComponent } from './pokemon-detail-weakness/pokemon-detail-weakness.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    MessageComponent,
    DashboardComponent,
    PokemonSearchComponent,
    PokemonDetailWeaknessComponent
  ],
  
  imports:      [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],

  bootstrap:    [
    AppComponent
 ],

  providers: [
    PokemonService,
    MessageService,
    InMemoryDataService
  ]
})

export class AppModule { }