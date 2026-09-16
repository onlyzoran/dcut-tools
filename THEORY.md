# Теоретическая часть

## Вопрос 1. Дженерики

**Вопрос:** Дженерики: определение, отличие от `any`, пример с ограничением.

Дженерик - параметр типа. Функция/тип пишется один раз, а конкретный тип подставляется при вызове. Компилятор при этом не теряет информацию о том, что пришло на вход.

`any` - это «выключить проверку». С ним можно передать что угодно, а снаружи уже не ясно, что вернули. Дженерик держит связь вход → выход.

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0]
}

firstItem([1, 2, 3])       // number | undefined
firstItem(['a', 'b'])      // string | undefined
```

Ограничение через `extends` - когда параметр типа должен уметь что-то конкретное:

```ts
function byId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}

// в проекте так можно искать слайд: byId(slides, id)
```

---

## Вопрос 2. `type` vs `interface`

**Вопрос:** `type` vs `interface`: различия, критерии выбора, `extends`.

По сути оба описывают форму объекта. Разница в возможностях:

- `type` умеет union (`A | B`), intersection (`A & B`), mapped types, alias для примитивов и tuple.
- `interface` умеет `extends` и declaration merging (можно дописать поля в другом месте файла/модуля). Union у `interface` нет; пересечение обычно через `extends A, B`, а не через `&`.

`extends` у `interface` - наследование формы:

```ts
interface WithId {
  id: string
}

interface SlideCardProps extends WithId {
  title: string
}
```

У `type` то же через пересечение:

```ts
type WithId = { id: string }
type SlideCardProps = WithId & { title: string }
```

В проекте модель `Slide` и DTO форм (`AddSlideFormValues`) - через `type`: объекты простые, без расширения извне. В store для создания/обновления используется `Omit<Slide, 'id'>`. `interface` оставил бы для публичного API библиотеки или когда нужно merging.

---

## Вопрос 3. Intersection и Union

**Вопрос:** Intersection и Union: разница, работа со свойствами, type guard.

Union - «или»: значение одного из вариантов.

Intersection - «и»: должны выполняться оба описания сразу.

```ts
type OnSite = { status: 'on-site'; objectName: string }
type InStorage = { status: 'storage'; shelf: string }
type AssetLocation = OnSite | InStorage

type Identified = { id: string }
type Timed = { updatedAt: number }
type StoredAsset = Identified & Timed // и id, и updatedAt
```

У union без сужения доступны только общие поля. Остальное - после проверки:

```ts
function label(location: AssetLocation): string {
  if (location.status === 'on-site') {
    return location.objectName
  }
  return location.shelf
}
```

Type guard - обычная функция с предикатом `x is Type`, чтобы TypeScript сузил тип в `if`:

```ts
function isOnSite(location: AssetLocation): location is OnSite {
  return location.status === 'on-site'
}

function handle(location: AssetLocation) {
  if (isOnSite(location)) {
    // location: OnSite
    console.log(location.objectName)
  } else {
    // location: InStorage
    console.log(location.shelf)
  }
}
```

---

## Вопрос 4. Разбор типа `KeysOfType`

**Вопрос:** Объяснить работу типа:

```ts
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
```

Сначала mapped type: по каждому ключу `K` из `T` решаем - подходит ли `T[K]` под `U`. Если да, в значение кладём сам ключ `K`, если нет - `never`.

Потом берём `[keyof T]` - собираем все эти значения в один union. `never` из union выпадает, остаются только нужные ключи.

На модели слайда из проекта:

```ts
type Slide = {
  id: string
  sku: string
  title: string
  annotation: string
  isChecked: boolean
}

type BooleanKeys = KeysOfType<Slide, boolean> // 'isChecked'
type StringKeys = KeysOfType<Slide, string>   // 'id' | 'sku' | 'title' | 'annotation'
```

Удобно, когда надо ограничить API: «сюда можно передать только boolean-поля» и т.п.

---

## Вопрос 5. Утилитарные типы

**Вопрос:** Утилитарные типы: `Partial`, `Pick`, `Omit`, `Record`, `Readonly`. Назначение, примеры.

Готовые трансформации типов. Ниже - на `Slide` из проекта.

`Partial<T>` - все поля опциональны. Для частичного апдейта:

```ts
type SlidePatch = Partial<Omit<Slide, 'id'>>
// можно передать только часть полей, например { isChecked: true }
```

В проекте `updateSlide` принимает полный `Omit<Slide, 'id'>` (все поля формы), а не `Partial`. `Partial` здесь - пример назначения утилиты.
`Pick<T, K>` - взять только указанные ключи. Для формы, где `id` ещё нет:

```ts
type AddSlideFields = Pick<Slide, 'title' | 'annotation' | 'isChecked'>
```

`Omit<T, K>` - наоборот, выкинуть ключи:

```ts
type NewSlideInput = Omit<Slide, 'id'>
// всё, кроме id: sku, title, annotation, isChecked
```

`Record<K, T>` - объект с заранее известным набором ключей:

```ts
type StatusLabel = Record<'on-site' | 'storage', string>
// { 'on-site': 'На объекте', 'storage': 'На складе' }
```

`Readonly<T>` - поля нельзя переприсвоить:

```ts
type FrozenSlide = Readonly<Slide>

const snapshot: FrozenSlide = slides[0]
// snapshot.isChecked = false // ошибка компиляции
```

Имеет смысл для конфигов и «замороженных» снимков данных, чтобы случайно не мутировать.
