import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class PokemonService {
  private pokemonsUrl = 'api/pokemons'; // URL to web api

  constructor(
    private http:HttpClient,
    private messageService: MessageService) { }

    /** GET pokemons from the server */
  getPokemons (): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl)
      .pipe(
        tap(_ => this.log('fetched pokemons')),
        catchError(this.handleError<Pokemon[]>('getPokemons', []))
    );
  }

  /** GET pokemon by id. Will 404 if id not found */
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  /* GET pokemons whose name contains search term */
  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
   return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }

  /** POST: add a new pokemon to the server */
  addPokemon (pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap((newPokemon: Pokemon) => this.log(`added hero w/ id=${newPokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  /** DELETE: delete the pokemon from the server */
  deletePokemon (pokemon: Pokemon | number): Observable<Pokemon> {
    const id = typeof pokemon === 'number' ? pokemon : pokemon.id;
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
      );
  }

  /** PUT: update the pokemon on the server */
  updatePokemon (pokemon: Pokemon): Observable<any> {
    return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
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
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }
}