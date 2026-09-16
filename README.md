# DCUT Tools

SPA с имитацией аутентификации и каруселью активов. Контент и терминология inspired by системой управления парком инструментов компании [DCUT](https://dcut.ru/).

Построено по **Feature-Sliced Design**.

## Стек

- React 19 + TypeScript (strict)
- Vite, Mantine, Embla Carousel
- Zustand, React Router
- Vitest + Testing Library

## Быстрый старт

```bash
npm install
npm run dev
```

**Demo-вход:** любой корректный email (например `user@dcut.ru`) + пароль от 3 символов.

## Скрипты

```bash
npm run dev       # локальная разработка
npm run build     # production-сборка
npm run preview   # preview сборки
npm test          # unit-тесты
```

## GitHub Pages

https://onlyzoran.github.io/dcut-tools/

## Функциональность

- `/login` - вход (email + пароль ≥ 3 символов)
- `/` - KPI-метрики и карусель активов DCUT
- CRUD слайдов: добавление, редактирование, удаление (модалки)
- Toggle статуса «На объекте» / «На складе»
- Светлая / тёмная тема (переключатель в шапке и на login)
- Карусель: 1 слайд на мобиле, 2 на десктопе
- Persist auth token и slides в `localStorage`

## Архитектура

Подробнее - [ARCHITECTURE.md](./ARCHITECTURE.md).
