import { Component, OnInit } from '@angular/core';
import { movie } from 'src/app/interfaces/movie.interface';
import { MoviesService } from 'src/app/services/movies.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  linesToWrite: Array<any>;
  finishPage = 100;
  actualPage: number;
  arrMovies: movie[];
  start: number = 0;
  finish: number = 20;
 
  constructor(private MoviesService: MoviesService) {
    this.actualPage = 1;
  }
 
  ngOnInit() {
    this.linesToWrite = new Array<any>();
    this.add40lines();
  }
 
  add40lines() {
    this.MoviesService.getRange(this.start, this.finish)
    .then(response => {
      this.arrMovies = response;
    })
    .catch(error => {
      console.log(error)
    })
    
    // const line = 'Another new line -- ';
    // let lineCounter = this.linesToWrite.length;
    // for (let i = 0; i < 40; i ++) {
    //   this.linesToWrite.push(line + lineCounter);
    //   lineCounter ++;
    // }
  }

  onScroll() {
    this.finish = this.finish+20;
    this.add40lines();
  }

}
