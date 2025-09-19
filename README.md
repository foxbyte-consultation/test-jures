# オシャレで可愛いToDoアプリ コーディング規約

にゃんこ！このプロジェクトへようこそ！
このドキュメントは、「オシャレで可愛いToDoアプリ」を開発するためのコーディング規約です。
世界一可愛くて使いやすいアプリを作るため、ここに書かれているルールを守って、楽しく開発を進めていきましょう！

## 💖 基本方針 (Basic Policies)

1.  **可愛いは正義！(Cuteness is Justice!)**: このアプリにおいて、最も重要な価値基準は「可愛いこと」です。機能性と可愛さが両立しない場合は、可愛さを優先する選択を検討します。
2.  **思いやりのあるコードを (Write Compassionate Code)**: 未来の自分、そして他の開発者が見たときに、すぐに理解できるような、読みやすく、思いやりのあるコードを書きましょう。
3.  **楽しむことを忘れずに (Don't Forget to Have Fun!)**: 楽しくコーディングすることが、最高のアプリを生み出す秘訣です！

---

## ✍️ 命名規則 (Naming Conventions)

一貫性のある命名は、コードの可読性を大幅に向上させます。以下の規則を厳守してください。**省略形は原則禁止**です。

### ファイルとディレクトリ (Files and Directories)

-   **形式**: `kebab-case`（例: `todo-list.tsx`, `api-client`）
-   **コンポーネントファイル**: `PascalCase`（例: `TodoList.tsx`, `Button.tsx`）
-   **Next.jsの規約**: `pages`, `app` ディレクトリ以下のファイル名はNext.jsの規約に従います (`[id].tsx`, `layout.tsx`など)。

### コンポーネント (Components)

-   **形式**: `PascalCase`
-   **命名**: そのコンポーネントが何であるかを表す具体的な名前にします。（例: `TodoItem`, `UserInputForm`）

### 変数と関数 (Variables and Functions)

-   **形式**: `camelCase`
-   **変数 (Variables)**:
    -   単一のデータを示す場合は、単数形の名詞を使用します。（例: `const todoItem = ...`）
    -   複数のデータを格納する配列やリストの場合は、複数形の名詞を使用します。（例: `const todoList = [...]`）
    -   Boolean型の変数は、`is` `has` `should` などを接頭辞として状態がわかるようにします。（例: `const isCompleted = false;`）
-   **関数 (Functions)**:
    -   何をする関数なのかが明確にわかる動詞から始めます。（例: `function createTodo()`, `function getTodoList()`）

### イベントハンドラ (Event Handlers)

-   **禁止**: `handle` という接頭辞の使用は**禁止**します。（例: `handleClick`, `handleChange` はNG）
-   **推奨**: `on` + `要素名` + `イベント名` の形式で、より具体的に記述します。
    -   例: `function onButtonClick()`, `function onTodoItemHover()`
    -   Propsとして渡す場合も同様です: `<Button onButtonClick={...} />`

### 型定義 (Type Definitions)

-   **Interface**: `PascalCase` で、`I` のような接頭辞はつけません。（例: `interface TodoItem { ... }`）
-   **Type**: `PascalCase`。（例: `type TodoStatus = 'active' | 'completed';`）

### CSSクラス (CSS Classes)

-   CSS Modulesを使用するため、ローカルスコープになります。
-   **形式**: `camelCase`（例: `styles.todoItem`, `styles.completedText`）

---

## 🎨 コーディングスタイル (Coding Style)

### TypeScript

-   `any` の使用は原則禁止します。どうしても必要な場合は、その理由をコメントに明記してください。
-   型推論が可能な場合は型を明記せず、TypeScriptの力を最大限に活用しましょう。
-   PropsやAPIのレスポンスなど、外部との境界になる部分には必ず型を定義します。

### React / Next.js

-   **コンポーネントの分割**: Atomic Designの考え方を意識し、適切にコンポーネントを分割します。
    -   `src/components/atoms`: これ以上分割できない最小単位のコンポーネント
    -   `src/components/molecules`: atomsを組み合わせた小さな機能単位
    -   `src/components/organisms`: moleculesを組み合わせた、より具体的なUIパーツ
    -   `src/components/templates`: ページ全体のレイアウト
    -   `src/app`: Next.jsのルーティングに対応するページコンポーネント
-   **Propsの渡し方**: 親から子へ、一方通行で渡します（One-way data flow）。
-   **状態管理**: まずはReactの標準フック（`useState`, `useReducer`）を検討します。複雑化する場合は、Context APIなどを検討します。

---

## 🚀 API連携 (API Integration)

-   Next.jsのAPI Routes (`src/pages/api`) を使用します。
-   APIリクエストのロジックは、コンポーネントから分離し、専用の関数として実装することを検討します。（例: `src/lib/apiClient.ts`）
-   APIのレスポンスデータには、必ず型を定義して利用します。

---

## 🌿 Git利用ルール (Git Usage Rules)

### ブランチ (Branches)

-   `main`: 本番用のブランチ。直接のコミットは禁止。
-   `develop`: 開発用のメインブランチ。
-   `feat/issue-name`: 機能追加用のブランチ。（例: `feat/add-todo-button`）
-   `fix/issue-name`: バグ修正用のブランチ。（例: `fix/todo-item-color`）

### コミットメッセージ (Commit Messages)

-   以下の形式で、分かりやすく記述します。
    -   `feat: 新しいToDo追加機能を実装`
    -   `fix: ToDo完了時のスタイル崩れを修正`
    -   `docs: READMEの命名規則を更新`
    -   `style: ボタンの角を丸くして可愛さをアップ`
    -   `refactor: TodoListコンポーネントの可読性を向上`
    -   `test: ToDoItemコンポーネントのテストコードを追加`

---

この規約は、プロジェクトの成長に合わせて更新されることがあります。
何か提案があれば、ぜひチームで話し合いましょう！

それでは、最高のアプリ開発を楽しんでくださいね！ 💖
