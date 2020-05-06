import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { threadId } from 'worker_threads';

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

      //Carregando a aplicação
      this.load();
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
      //chamando o método save
      this.save();

    }

    //Marcado Feito
    markAsDone(todo: Todo) {
      //Chamando o done do todo.model.ts
      //setando para verdadeiro.
      todo.done = true;
      //Chamando o save
      this.save();
    }

    //Marcado Refazer
    markAsUndone(todo: Todo) {
      //Chamando o done do todo.model.ts
      //Setando para false
      todo.done = false;
      //Chamando o save
      this.save();
    }

    //Save
    save() {
      //Este método transforma o JSON em uma string.
      const data = JSON.stringify(this.todos);
      localStorage.setItem('todos', data);
    }

    //Load para mostrar os nomes
    load() {
      //campo string para os dados
      const data = localStorage.getItem('todos');
      //Convertendo para JSON
      //Sempre usando PARSE
      if(data){
        this.todos = JSON.parse(data);
      } else {
        this.todos = [];
      }
    }
}
