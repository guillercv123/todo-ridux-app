import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo:Todo;

  chkcompletado:FormControl;
  chkInput:FormControl;
  editando:boolean = false;
  @ViewChild('inputFisico',{static:false}) txtInputFisico :ElementRef;

  constructor(private store:Store<AppState>) { 

  }


  ngOnInit():void{
    
    this.chkcompletado = new FormControl(this.todo.completado);
    this.chkInput =new FormControl(this.todo.texto,Validators.required);

    this.chkcompletado.valueChanges.subscribe(valor =>
      {
        this.store.dispatch(actions.toggle({id:this.todo.id}))
      })
  }

  editar(){
    this.editando = true;
    this.chkInput.setValue(this.todo.texto);
    setTimeout(()=>{
      this.txtInputFisico.nativeElement.select();
    },1)
  }

  TerminarEdicion(){
    this.editando = false;
    if (this.chkInput.invalid) { return;  }
    if (this.chkInput.value === this.todo.texto) { return;  }
    this.store.dispatch(actions.editar({id:this.todo.id,texto:this.chkInput.value}));
  }
  
  borrar(){
    this.store.dispatch(actions.borrar({id:this.todo.id}));
  }
}
