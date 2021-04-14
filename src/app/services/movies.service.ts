import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movieAll: movie[];

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<movie[]> {
    return this.httpClient.get<movie[]>('./assets/dataset/movies.json').toPromise();
   }

  async getRange(init, finish) {
    this.movieAll = await this.getAll();
    let movieReturn = new Array;
    for (let show = init; show < finish; show++) {
      if (this.movieAll.length >= show) {
        movieReturn.push(this.movieAll[show]) 
      }
    }
    return movieReturn;
  }

  async order (init, finish) {
    alert();
    this.movieAll = [];
    this.movieAll = await this.getAll();
    this.movieAll = this.movieAll.sort((a, b) => a.title.localeCompare(b.title));
    let movieReturn = new Array;
    for (let show = init; show < finish; show++) {
      if (this.movieAll.length >= show) {
        movieReturn.push(this.movieAll[show]) 
      }
    }
    return movieReturn;
  }

}
