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
  showScrollHeight: number;
  hideScrollHeight: number;
  myOrder: string;
  selectedOption: string;
  selectedOrder: string;
 
  constructor(private MoviesService: MoviesService) {
    this.showGoUpButton = false;
    this.showScrollHeight = 1200;
    this.hideScrollHeight = 400;
  }
 
  ngOnInit() {
    this.addMovies();
  }
 
  // añade peliculas
  addMovies() {
    if (this.selectedOrder == null) {
      this.selectedOrder = 'title';
    }
    this.MoviesService.getRange(this.start, this.finish, this.selectedOrder)
    .then(response => {
      this.arrMovies = response;
    })
    .catch(error => {
      console.log(error)
    })
  }

  // cuando baja el scroll para añadir nuevas películas
  onScroll() {
    this.finish = this.finish+20;
    this.addMovies();
  }

  // boton "to top" para ir al inicio del listado de películas
  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // detecta el cambio de scroll para mostrar u ocultar el botón "to top"
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

  // Recoge los cambios de estado del select para ordenar las peliculas
  onChange(){
    this.selectedOrder = this.selectedOption;
    this.arrMovies.splice(0,this.arrMovies.length);
    this.addMovies();
  }

}
