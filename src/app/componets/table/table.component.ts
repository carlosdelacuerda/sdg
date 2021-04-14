import { Component, HostListener, OnInit } from '@angular/core';
import { movie } from 'src/app/interfaces/movie.interface';
import { MoviesService } from 'src/app/services/movies.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  arrMovies: movie[];
  start: number = 0;
  finish: number = 50;
  showGoUpButton: boolean;
  showScrollHeight:number;
  hideScrollHeight:number;
 
  constructor(private MoviesService: MoviesService) {
    this.showGoUpButton = false;
    this.showScrollHeight = 1200;
    this.hideScrollHeight = 400;
    this.addMovies();
  }
 
  ngOnInit() {
    
  }
 
  addMovies() {
    this.MoviesService.getRange(this.start, this.finish)
    .then(response => {
      this.arrMovies = response;
    })
    .catch(error => {
      console.log(error)
    })
  }

  onScroll() {
    this.finish = this.finish+12;
    this.addMovies();
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onChange(){
    this.MoviesService.order(this.start, this.finish)
    .then(response => {
      this.arrMovies = response;
    })
    .catch(error => {
      console.log(error)
    })
  }

}
