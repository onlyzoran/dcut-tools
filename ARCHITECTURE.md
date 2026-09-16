# Architecture

SPA построено по **Feature-Sliced Design** и вдохновлено продуктами учёта парка инструментов [DCUT](https://dcut.ru/).

## Слои FSD

```
app → pages → widgets → features → entities → shared
```

| Слой | Ответственность |
|------|-----------------|
| `app` | Провайдеры (Mantine, session), роутинг, guards |
| `pages` | Страницы login / home |
| `widgets` | Header, KPI-метрики (`AssetsStats`), карусель |
| `features` | Login, logout, theme toggle, add / edit / delete слайдов |
| `entities` | Session, Slide (Zustand stores) |
| `shared` | Theme (DCUT blue), utils, constants, validation |

Импорты идут только **сверху вниз**. `entities` не импортирует `features`.

## Auth flow

1. `LoginForm` → `useSessionStore.login()` → token в `localStorage`
2. `ProtectedRoute` / `GuestRoute` читают token из store
3. `SessionProvider` вызывает `initFromStorage()` при mount (восстановление после F5)
4. `LogoutButton` → `logout()` → redirect на `/login`

## State management

**Zustand** - для session и slides. Лёгкий store без boilerplate, достаточный для SPA без серверного кэша.

Слайды персистятся в `localStorage` (`slides_data`). Стартовый набор - 5 активов DCUT.

## UI notes

- Primary color - фирменный синий DCUT (`#0085dc`)
- Карусель Embla: `slidesToScroll` 1 (mobile) / 2 (desktop ≥48em)
- Редактирование и удаление - иконки на карточке слайда

## Что сознательно не реализовано

- Реальный backend API (auth - имитация)
- TanStack Query (нет async data fetching)
- RBAC / роли (admin, механик)
- RFID/QR-идентификация активов
- Фильтрация слайдов (при 5 элементах в карусели избыточна)

Эти пункты выходят за рамки тестового задания, но архитектура позволяет добавить `shared/api` слой без рефакторинга FSD.
