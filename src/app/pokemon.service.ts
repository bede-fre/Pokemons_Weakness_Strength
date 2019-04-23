import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
  { providedIn: 'root' }
)

export class PokemonService {
  private pokemonsUrl = 'api/pokemons'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  /** GET pokemons from the server */
  getPokemonsFullListFromServer(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl)
      .pipe(
        tap(_ => this.logMessageDisplay('fetched pokemons')),
        catchError(this.handleError<Pokemon[]>('getPokemons', []))
    );
  }

  /** GET pokemon by id. Return `undefined` when id not found */
  getPokemonNo404<Data>(pokemonId: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/?id=${pokemonId}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(pokemons => pokemons[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.logMessageDisplay(`${outcome} pokemon id=${pokemonId}`);
        }),
        catchError(this.handleError<Pokemon>(`getPokemon id=${pokemonId}`))
      );
  }

  /** GET pokemon by id. Will 404 if id not found */
  getPokemonByIdFromServer(pokemonId: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${pokemonId}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.logMessageDisplay(`fetched pokemon id=${pokemonId}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${pokemonId}`))
    );
  }

  /* GET pokemons whose name contains search term */
  searchPokemonNameOnServer(pokemonName: string): Observable<Pokemon[]> {
    if (!pokemonName.trim()) {
      // if not search pokemonName, return empty pokemon array.
      return of([]);
    }
   return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${pokemonName}`).pipe(
      tap(_ => this.logMessageDisplay(`found pokemons matching "${pokemonName}"`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new pokemon to the server */
  addPokemonOnserver (pokemonToAdd: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonsUrl, pokemonToAdd, httpOptions).pipe(
      tap((newPokemon: Pokemon) => this.logMessageDisplay(`added pokemon w/ id=${newPokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  /** DELETE: delete the pokemon from the server */
  deletePokemonFromServer (pokemonToDelete: Pokemon | number): Observable<Pokemon> {
    const id = typeof pokemonToDelete === 'number' ? pokemonToDelete : pokemonToDelete.id;
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.logMessageDisplay(`deleted pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }

  /** PUT: update the pokemon on the server */
  updatePokemonNameOnServer (pokemonToUpdate: Pokemon): Observable<any> {
    return this.http.put(this.pokemonsUrl, pokemonToUpdate, httpOptions).pipe(
      tap(_ => this.logMessageDisplay(`updated pokemon id=${pokemonToUpdate.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.logMessageDisplay(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** Log a PokemonService message with the MessageService */
  private logMessageDisplay(messageToAdd: string) {
    this.messageService.addMessage(`PokemonService: ${messageToAdd}`);
  }
}