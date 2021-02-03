import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';
import * as actionsTodo from 'src/app/todos/todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual:actions.filtroValidos = 'todos';
  filtros:actions.filtroValidos[]=['todos','pendientes','completados'];
  pendiente:number;

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    // this.store.select('filtro').subscribe(
    //    filtro => {
    //       this.filtroActual = filtro
    //    }
    // )
  this.store.subscribe( state => {
    this.filtroActual = state.filtro;
    this.pendiente = state.todos.filter(todo => !todo.completado).length;
  }
  )

  }

  cambiarFiltro(filtro:actions.filtroValidos){

    this.store.dispatch(actions.setFiltro({filtro:filtro}));

  }

  limpiarComletados(){
    this.store.dispatch(actionsTodo.limpiarTodo())
  }

}
