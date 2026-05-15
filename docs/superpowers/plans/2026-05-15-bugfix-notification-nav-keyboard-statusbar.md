# Bug 修复实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 4 个实机测试 bug：提醒通知不工作、返回逻辑错误、输入法遮挡、状态栏频闪

**Architecture:** 5 个文件的精确修改，不改动架构。每次修改都是最小化变更。

**Tech Stack:** React + TypeScript + Dexie.js + Vite PWA

---

### Task 1: 修复提醒通知 — useItemActions 支持 reminderAt

**Files:**
- Modify: `src/hooks/useItemActions.ts:7-22`

- [ ] **Step 1: 给 addItem 添加 reminderAt 参数**

修改 `src/hooks/useItemActions.ts`，`addItem` 函数新增可选参数 `reminderAt`，并在新增条目时使用传入的值而不是硬编码 `null`：

```typescript
const addItem = useCallback(async (category: Category, title: string, note = '', reminderAt: Date | null = null) => {
    const count = await db.items.where('category').equals(category).count();
    await db.items.add({
      uuid: uuidv4(),
      category,
      title,
      note,
      isFavorite: false,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      reminderAt,
      notifiedAt: null,
      sortOrder: count,
    });
  }, []);
```

- [ ] **Step 2: 提交**

```bash
git add src/hooks/useItemActions.ts
git commit -m "fix: addItem 支持 reminderAt 参数"
```

---

### Task 2: 修复提醒通知 — AddItemModal 传递 reminderAt

**Files:**
- Modify: `src/components/Items/AddItemModal.tsx:27-35`

- [ ] **Step 1: 传递 reminderAt 给 addItem**

修改 `src/components/Items/AddItemModal.tsx` 的 `handleSubmit` 函数，将 `reminderAt` 传入 `addItem`：

```typescript
const handleSubmit = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addItem(
      category,
      trimmed,
      note.trim(),
      reminderAt ? new Date(reminderAt) : null,
    );
    setTitle('');
    setNote('');
    setReminderAt('');
    onClose();
  };
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Items/AddItemModal.tsx
git commit -m "fix: AddItemModal 传递 reminderAt 到 addItem"
```

---

### Task 3: 修复返回逻辑 — BottomNav replace 导航

**Files:**
- Modify: `src/components/Layout/BottomNav.tsx:44-48`

- [ ] **Step 1: NavLink 添加 replace 属性**

修改 `src/components/Layout/BottomNav.tsx`，给 `NavLink` 添加 `replace` 属性，使 tab 切换不产生浏览器历史记录：

```tsx
<NavLink
  key={tab.path}
  to={tab.path}
  replace
  className={({ isActive }) => `nav-tab ${isActive ? 'nav-tab-active' : ''}`}
>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Layout/BottomNav.tsx
git commit -m "fix: tab 切换使用 replace 避免历史堆叠"
```

---

### Task 4: 修复状态栏频闪 + 输入法遮挡 — Modal 组件

**Files:**
- Modify: `src/components/Common/Modal.tsx`
- Modify: `src/components/Common/Modal.css`

- [ ] **Step 1: 重写 Modal.tsx — 移除 body overflow hack，添加 visualViewport 支持**

用以下内容替换 `src/components/Common/Modal.tsx`：

```tsx
import { useEffect, useState, useRef, type ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollY = useRef(0);

  useEffect(() => {
    if (!open) return;

    scrollY.current = window.scrollY;

    const onResize = () => {
      if (window.visualViewport) {
        const offset = window.innerHeight - window.visualViewport.height;
        setKeyboardOffset(offset > 0 ? offset : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onResize);
      }
      setKeyboardOffset(0);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      style={{ paddingBottom: keyboardOffset > 0 ? keyboardOffset : undefined }}
      onClick={onClose}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header">{title}</div>}
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 更新 Modal.css — 添加 touch-action 防止背景滚动穿透**

修改 `src/components/Common/Modal.css`，给 `.modal-overlay` 添加 `touch-action: none` 来替代 body overflow hidden 方案：

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
  padding: var(--spacing-md);
  padding-bottom: max(var(--spacing-md), env(safe-area-inset-bottom));
  touch-action: none;
}
```

（在现有规则中添加 `touch-action: none;` 一行，其余不变）

- [ ] **Step 3: 提交**

```bash
git add src/components/Common/Modal.tsx src/components/Common/Modal.css
git commit -m "fix: 移除 body overflow hack 修复状态栏频闪，添加 visualViewport 支持修复键盘遮挡"
```

---

### Task 5: 构建验证

- [ ] **Step 1: 构建项目确保无编译错误**

```bash
npm run build
```

预期：构建成功，无 TypeScript 错误。

- [ ] **Step 2: 整体验证**

运行 `git log --oneline -5` 确认所有 commit 就位。
