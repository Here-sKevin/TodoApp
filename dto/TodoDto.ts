/* eslint-disable prettier/prettier */
type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export class TodoDto {
  public id: number = 0;
  public title: string = '';

  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
  }

}
