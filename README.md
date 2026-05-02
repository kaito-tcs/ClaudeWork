# Claude Code Web Engineering Studio

Claude Code を本格的な Web エンジニアリングスタジオに変えるテンプレートです — **42 名の専門エージェント**、**66 のワークフローコマンド**、そして実際のプロダクトチームの動き方をそのまま反映した協調システムを提供します。

バックエンドは **Python（Django / FastAPI）**、フロントエンドは **JavaScript / TypeScript（React / Next.js）** に特化。さらに QA・セキュリティ・パフォーマンス・アクセシビリティ・DevOps まで一通りカバーします。

> [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) にインスパイアされています。階層構造は同じ、対象業種だけが違います。

---

## 何が含まれているか

- **42 名のエージェント** — 3 階層に編成（ビジョンを担う Director、ドメインを統括する Lead、現場で手を動かす Specialist）。
- **66 のスラッシュコマンド** — SDLC 全行程をカバー。`/start` や `/create-prd` から `/dev-story`、`/code-review`、`/security-audit`、`/deploy-checklist`、`/postmortem` まで揃っています。
- **フック & ガードレール** — pre-commit の lint/type/test、シークレットスキャン、セッション終了時の抜け検知（ギャップディテクション）。
- **チームオーケストレーション** — `/team-feature`、`/team-release`、`/team-security-review` といったコマンドが、1 つの成果物に対して複数エージェントを協調動作させます。
- **明文化された協調契約** — Question → Options → Decision → Draft → Approval。エージェントが黙って自律的にコードを書き換えることはありません。

---

## クイックスタート

```bash
git clone <this-repo> my-app && cd my-app
claude
> /start
```

`/start` が現在地（新規アイデア / 仕様だけある / 既存コードあり）を判定し、適切なワークフローに案内します。

---

## ディレクトリ構成

| パス | 役割 |
|---|---|
| `CLAUDE.md` | マスター設定。最初に読んでください。 |
| `.claude/agents/` | エージェント定義 42 ファイル（Markdown + YAML フロントマター）。 |
| `.claude/commands/` | スラッシュコマンドのワークフロー 66 ファイル。 |
| `.claude/hooks/` | バリデーションフック（pre-commit、pre-push、session-end など）。 |
| `.claude/settings.json` | モデル階層のデフォルト、フック設定、安全設定。 |
| `docs/AGENTS.md` | エージェント全名簿と使いどころ。 |
| `docs/SKILLS.md` | スラッシュコマンド一覧カタログ。 |
| `docs/WORKFLOWS.md` | エンドツーエンドのレシピ集（新規機能、ホットフィックス、リリースなど）。 |

---

## 階層構造（ハイライト）

### Tier 1 — Directors（model: opus）

| エージェント | 担当領域 |
|---|---|
| `product-director` | プロダクトビジョン、ユーザーストーリー、優先度（RICE） |
| `tech-director` | 技術スタック、横断アーキテクチャ、build vs buy、ADR 承認 |
| `engineering-manager` | スプリント計画、キャパシティ、リスク、横断調整 |

### Tier 2 — Department Leads（model: sonnet）

`lead-architect` / `lead-frontend-engineer` / `lead-backend-engineer` / `lead-qa-engineer` / `lead-security-engineer` / `lead-devops-engineer` / `lead-data-engineer` / `lead-ux-engineer`

### Tier 3 — Specialists

フロント（9）／バック（9）／QA・セキュリティ（7）／DevOps・プラットフォーム（4）／データ（2）の合計 31 名。詳細は [`docs/AGENTS.md`](./docs/AGENTS.md) を参照してください。

---

## 代表的なワークフロー

```bash
# 新規機能をゼロから作る
> /start
> /create-prd
> /create-spec
> /design-data-model
> /design-api
> /scaffold-fastapi
> /scaffold-nextjs
> /team-feature <story-id>
> /security-audit
> /deploy-checklist
```

```bash
# 本番障害対応
> /team-incident
> /incident-response
> /postmortem
```

```bash
# パフォーマンス改善
> /team-performance "INP > 500ms on /search"
```

その他のレシピは [`docs/WORKFLOWS.md`](./docs/WORKFLOWS.md) にまとめています。

---

## カスタマイズ

- **エージェントを編集**: `.claude/agents/<name>.md` を直接編集してチームの慣習に合わせる。
- **コマンドを編集**: `.claude/commands/<name>.md` でワークフローを変更可能。
- **モデル階層を固定**: `.claude/settings.json` で Director を Opus、Specialist を Haiku に固定するなど。
- **新しい職能を追加**: `agents/` に `.md` を 1 枚追加するだけで自動認識されます。

---

## ライセンス

MIT.
