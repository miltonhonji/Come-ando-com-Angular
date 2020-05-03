import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    //Criando uma variável
    public todos: Todo[] = []; //[] (vázio)
    public title: String = 'Minhas Tarefas';

    constructor() {
      this.todos.push(new Todo(1, 'Passear com o cachorro', false));
      this.todos.push(new Todo(2, 'Ir ao supermercado', false));
      this.todos.push(new Todo(3, 'Cortar o cabelo', true));
      this.todos.push(new Todo(4, 'Limpar o quarto', false));
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
}
