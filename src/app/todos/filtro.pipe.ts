import { Pipe, PipeTransform } from '@angular/core';
import { filtroValidos } from '../filtro/filtro.actions';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todo:Todo[],filtro:filtroValidos): Todo[] {

    switch(filtro){
      case 'completados':
        return todo.filter( todo=> todo.completado);
      case 'pendientes':
        return todo.filter( todo=> !todo.completado);
      default:
        return todo;
    }
  }

}
