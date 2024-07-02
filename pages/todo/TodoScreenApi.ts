/* eslint-disable prettier/prettier */
import { eq } from "drizzle-orm";
import { db } from "../../shared/database/hooks/useDb";
import { todos } from "../../shared/database/schema";
import { TodoModel } from "./interface/TodoModel";


class TodoScreenApi {
    public createTodo(item: TodoModel) {
        return db.insert(todos).values({
            title: item.title
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
        return db.select().from(todos)
    }
}

export default new TodoScreenApi();