import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) {}

  getAllMovies(): Promise<movie[]> {
    return this.httpClient.get<movie[]>('./assets/dataset/movies.json').toPromise();
   }

}
