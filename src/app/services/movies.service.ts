import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<movie[]> {
    return this.httpClient.get<movie[]>('./assets/dataset/movies.json').toPromise();
   }

  async getRange(init, finish) {
    let movieAll = await this.getAll();
    let movieReturn = new Array;
    for (let step = init; step < finish; step++) {
      if (movieAll.length >= step) {
        movieReturn.push(movieAll[step]) 
      }
    }
    return movieReturn;
  }

}
