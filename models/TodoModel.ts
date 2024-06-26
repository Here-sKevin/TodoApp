/* eslint-disable prettier/prettier */
import { useForm } from '@resourge/react-form';
import { number, object, string } from '@resourge/schema';

type Todo = {
    id: number;
    title: string;
}
export class TodoModel {
  public id: number = 0;
  public title: string = '';

  /*constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
  }*/

  public toModel(todo: Todo) {
    return {
        id: todo.id,
        title: todo.title
    }
  }
}

const schemaTodoModel = object<TodoModel>({
    id: number().required('Obrigatorio'),
    title: string().required('Obrigatorio')
}).compile();

export const useTodoModel = () => useForm(
    TodoModel,
    {
        validate: (form) => schemaTodoModel.validate(form),
        validateOnlyAfterFirstSubmit: true
    }
);