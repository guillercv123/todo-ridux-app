import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarTodo, toggle, toggleAll} from './todo.actions';
 
export const estadoInicial : Todo[]=[];

 
const _todoReducer = createReducer(
    estadoInicial,
  on(crear, (state , {texto}) => [...state,new Todo(texto)] ),
  on(toggle,(state , {id}) => { 
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
            completado: !todo.completado
        }
      }else{
        return todo;
      }
   
    } )
  }),

  on(toggleAll,(state, {completado}) => { 
    return state.map( todo => {
        return {
          ...todo,
            completado: completado
        }
    } )
  }),

  on(limpiarTodo,(state) => { 
    return state.filter(todo => !todo.completado)
  }),
  on(editar,(state , {id,texto}) => { 
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
            texto:texto
        }
      }else{
        return todo;
      }
   
    } )
  }) ,
  on(borrar,(state , {id}) => state.filter(todo => todo.id !== id ) )

);

 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}