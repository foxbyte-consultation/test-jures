'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';
import TodoInput from '@/components/molecules/TodoInput';
import TodoItem from '@/components/molecules/TodoItem';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // APIからToDoリストを取得する
  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data: Todo[] = await response.json();
      setTodoList(data);
    } catch (error) {
      console.error(error);
      // ここでエラーUIを表示することもできる
    }
  }, []);

  // マウント時にToDoリストを取得
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ToDoを追加する
  const onTodoAdd = async (text: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo: Todo = await response.json();
      setTodoList((prevList) => [...prevList, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  // ToDoの完了状態を切り替える
  const onTodoToggleComplete = async (id: string) => {
    const todo = todoList.find((item) => item.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo: Todo = await response.json();
      setTodoList((prevList) =>
        prevList.map((item) => (item.id === id ? updatedTodo : item))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ToDoを削除する (この関数をTodoItemに渡す)
  const onTodoDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodoList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ToDoの重要度を変更する
  const onTodoImportanceChange = async (id: string, importance: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ importance }),
      });
      if (!response.ok) {
        throw new Error('Failed to update importance');
      }
      const updatedTodo: Todo = await response.json();
      setTodoList((prevList) =>
        prevList.map((item) => (item.id === id ? updatedTodo : item))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>にゃんこToDoリスト 🐈</h1>
      <TodoInput onAdd={onTodoAdd} />
      <div className={styles.list}>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todoItem={todo}
            onToggleComplete={onTodoToggleComplete}
            onDelete={onTodoDelete}
            onImportanceChange={onTodoImportanceChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
