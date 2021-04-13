import { Component, OnInit } from '@angular/core';
import { movie } from 'src/app/interfaces/movie.interface';
import { MoviesService } from 'src/app/services/movies.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  arrMovies: movie[]

  constructor(private MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.MoviesService.getAllMovies()
    .then(response => {
      this.arrMovies = response;
    })
    .catch(error => {
      console.log(error)
    })
  }

}
