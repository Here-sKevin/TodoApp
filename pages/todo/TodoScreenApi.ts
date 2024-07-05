/* eslint-disable prettier/prettier */
import { eq } from "drizzle-orm";
import { db } from "../../shared/database/hooks/useDb";
import { todos } from "../../shared/database/schema";
import { TodoModel } from "./interface/TodoModel";
import { AuthenticationUser } from "../../shared/authentication/Authentication";


class TodoScreenApi {
    public createTodo(item: TodoModel, user: AuthenticationUser) {
        return db.insert(todos).values({
            title: item.title,
            userId: user.id,
            completed: false
        }).returning();
    }
    public deleteTodo(item: TodoModel) {
        return db.delete(todos).where(eq(todos.id, item.id))
    }
    public updateTodo(item: TodoModel) {
        return db.update(todos).set({
            title: item.title
        })
        .where(eq(todos.id, item.id))
    }
    public getTodos() {
        console.log('getTodos');
        return db.select().from(todos)
    }
    public getMyTodos(user: AuthenticationUser) {
        console.log('getMyTodos');
        console.log('User: ', user);
        return db.select().from(todos).where(eq(todos.userId, user.id))
    }
    public setCompleted(item: TodoModel) {
        return db.update(todos).set({
            completed: !item.completed
        })
        .where(eq(todos.id, item.id))
    }
}

export default new TodoScreenApi();