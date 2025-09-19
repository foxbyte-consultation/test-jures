import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Todo } from '@/types/todo';

const jsonPath = path.join(process.cwd(), 'data', 'todos.json');

// これらのヘルパー関数は共通化できるが、簡潔さのためにここに再度定義
async function getTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function saveTodos(todos: Todo[]): Promise<void> {
  const data = JSON.stringify(todos, null, 2);
  await fs.writeFile(jsonPath, data, 'utf-8');
}

// [PATCH] /api/todos/{id} - 特定のToDoを更新 (完了状態など)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const partialTodo = await request.json();

    const todos = await getTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    const updatedTodo = { ...todos[todoIndex], ...partialTodo };
    todos[todoIndex] = updatedTodo;

    await saveTodos(todos);
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating todo' }, { status: 500 });
  }
}

// [DELETE] /api/todos/{id} - 特定のToDoを削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const todos = await getTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    if (todos.length === filteredTodos.length) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    await saveTodos(filteredTodos);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting todo' }, { status: 500 });
  }
}
