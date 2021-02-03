import { ActionReducerMap } from "@ngrx/store";
import { filtroValidos } from "./filtro/filtro.actions";
import { filtroReducer } from "./filtro/filtro.reducer";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from "./todos/todo.reducer";

export interface AppState{ 
    todos:Todo[]
    filtro:filtroValidos
}

export const appReduces:ActionReducerMap<AppState> = {

    todos: todoReducer,
    filtro: filtroReducer
}