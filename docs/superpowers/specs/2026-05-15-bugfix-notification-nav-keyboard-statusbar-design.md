# Bug 修复：通知、返回逻辑、输入法遮挡、状态栏频闪

日期：2026-05-15

## 概述

实机测试发现的 4 个 bug 修复。

## Bug 1 — 提醒通知不工作

**根因**：`useItemActions.addItem()` 硬编码 `reminderAt: null`，`AddItemModal` 未传递提醒时间。

**修复**：
- `useItemActions.ts`：`addItem` 新增可选参数 `reminderAt?: Date | null`，默认 `null`
- `AddItemModal.tsx`：调用 `addItem` 时传入 `reminderAt` 值

## Bug 2 — 返回逻辑错误

**根因**：`BottomNav` 中 `NavLink` 默认 push 到 history，tab 切换堆叠历史记录。

**修复**：`BottomNav.tsx`：给 `NavLink` 添加 `replace` 属性。

## Bug 3 — 输入法遮住添加页面

**根因**：`Modal` 使用 `align-items: flex-end` 固定在底部，键盘弹起时不动。

**修复**：`Modal.tsx` 中使用 `visualViewport` API 监听键盘高度，动态调整 modal 底部偏移。

## Bug 4 — 状态栏频闪

**根因**：`Modal` 打开时设置 `document.body.style.overflow = 'hidden'`，移动端触发 viewport 重算。

**修复**：移除 body overflow 操作，改用 `touch-action: none` + `position: fixed` 防止背景滚动。

## 涉及文件

- `src/hooks/useItemActions.ts`
- `src/components/Items/AddItemModal.tsx`
- `src/components/Layout/BottomNav.tsx`
- `src/components/Common/Modal.tsx`
- `src/components/Common/Modal.css`
