/* eslint-disable prettier/prettier */
type Todo = {
  id: number;
  title: string;
}
export class TodoDBModel {
public id: number = 0;
public title: string = '';

constructor(todo: Todo) {
  this.id = todo.id;
  this.title = todo.title;
}

}
