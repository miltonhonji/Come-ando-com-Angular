import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root', // <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    //Criando uma variável
    public todos: Todo[] = []; //[] (vázio)
    public title: String = 'Minhas Tarefas';
    public form: FormGroup;

    //FormBuilder terpa que ser privado.
    constructor(private fb: FormBuilder) {
      //Criando um grupo para o FormBuilder
      this.form = this.fb.group({
        //Nome do input
        title: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])]
      });
    }

    add() {
      const title = this.form.controls['title'].value;
      const id = this.todos.length + 1;
      this.todos.push(new Todo(id, title, false));
      this.save();
      this.clear();
    }

    clear() {
      this.form.reset();
    }
    //Remover uma tarefa
    remove(todo: Todo) {

      //Capturando o indice do todo.
      const index = this.todos.indexOf(todo);

      //Verificação de segurança
      //== igual e !== diferente.
      if (index !== -1) {
        //Splice um método para adicionar ou remover um item de um array
        // e retonrar os itens removidos.
        //Ele pega a quantidade o índice que ele quer deletar um registro.
        //this refere a variáveis acima.
        this.todos.splice(index, 1);
      }

    }

    //Marcado Feito
    markAsDone(todo: Todo) {
      //Chamando o done do todo.model.ts
      //setando para verdadeiro.
      todo.done = true;
    }

    //Marcado Refazer
    markAsUndone(todo: Todo) {
      //Chamando o done do todo.model.ts
      //Setando para false
      todo.done = false;
    }

    //Save
    save() {
      //Este método transforma o JSON em uma string.
      const data = JSON.stringify(this.todos);
      localStorage.setItem('todos', data);
    }
}
