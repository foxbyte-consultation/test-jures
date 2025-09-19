import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Todo } from '@/types/todo';

// data/todos.jsonへのパスを解決
const jsonPath = path.join(process.cwd(), 'data', 'todos.json');

// ToDoリストを取得する関数
async function getTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // ファイルが存在しない場合は空の配列を返す
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// ToDoリストを保存する関数
async function saveTodos(todos: Todo[]): Promise<void> {
  const data = JSON.stringify(todos, null, 2);
  await fs.writeFile(jsonPath, data, 'utf-8');
}

// [GET] /api/todos - 全てのToDoを取得
export async function GET() {
  try {
    const todos = await getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading todos' }, { status: 500 });
  }
}

// [POST] /api/todos - 新しいToDoを作成
export async function POST(request: Request) {
  try {
    const { text, importance = 1 } = await request.json();

    if (!text) {
      return NextResponse.json({ message: 'Text is required' }, { status: 400 });
    }

    const todos = await getTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
      importance,
      isCompleted: false,
    };

    todos.push(newTodo);
    await saveTodos(todos);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating todo' }, { status: 500 });
  }
}
