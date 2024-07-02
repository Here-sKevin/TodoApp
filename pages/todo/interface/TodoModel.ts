/* eslint-disable prettier/prettier */
import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

export type TodoType = {
    id: number;
    title: string;
    //userId: number;
}
export class TodoModel {
  public id: number = 0;
  public title: string = '';
  //public userId: number = 0;

  /*constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
  }*/

  public toModel(todo: TodoModel) {
    return {
        id: todo.id,
        title: todo.title
    }
  }
}

const schemaTodoModel = object<TodoModel>({
    title: string().required('Obrigatorio')
}).compile();

export const useTodoModel = () => useForm(
    TodoModel,
    {
        validate: (form) => schemaTodoModel.validate(form),
        validateOnlyAfterFirstSubmit: true
    }
);