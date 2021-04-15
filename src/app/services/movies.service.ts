import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movieAll: movie[];
  movieReturn: movie[];
  movie: movie;

  constructor(private httpClient: HttpClient) {}


  // recupera todo el json
  getAll(): Promise<movie[]> {
    return this.httpClient.get<movie[]>('./assets/dataset/movies.json').toPromise();
   }

  // genera un array con las películas que va mostrando
  async getRange(init, finish, param) {
    this.movieAll = await this.getAll();
    switch (param) {
      case 'title':
        this.movieAll = this.movieAll.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        this.movieAll = this.movieAll.sort((a, b) => a.year - b.year);
        break;
    }
    this.movieReturn = new Array;
    for (let show = init; show < finish; show++) {
      if (this.movieAll.length >= show) {
        this.movieReturn.push(this.movieAll[show]) 
      }
    }
    return this.movieReturn;
  }
}
