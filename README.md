# npm-functions-boilerplate

Используйте для простых `ts-библиотек`. Для библиотек с `react`, стилями, картинками и т.д.
используйте [react-component-boilerplate](https://github.com/Zerfo/react-component-boilerplate).

Если же хотите использовать `javascript`, то после того как скачали репозиторий, нужно перейти на другую ветку,
сделать это можно с помощью команды `git checkout javascript`.

## Оглавление

- [**Стек**](#stack)
- [**Работа с проектом**](#work_with_project)
- [**Структура проекта**](#project_files)
- [**Качество и ci**](#quality)
- [**Алиасы**](#alias)
- [**Версии зависимостей**](#deps)
- [**Исключение зависимостей из исходного кода**](#external)
- [**Как разрабатывать и тестировать?**](#dev)
- [**История изменений**](#changes)

<a name="stack"></a>

## Стек

[typescript](https://www.typescriptlang.org/) + [rollup](https://rollupjs.org/guide/en/) + [jest](https://jestjs.io/ru/)

<a name="work_with_project"></a>

## Работа с проектом

Перед работой с проектом убедитесь что у вас установленны: `node v18` & `npm v9`. Если это не так, установите их вручную
или используйте [nvm](https://github.com/nvm-sh/nvm), а именно команду `nvm use`.

Шаг | Команда
------------ | -------------
Клонируем | `git clone https://github.com/Zerfo/npm-functions-boilerplate.git`
Ставим зависимости | `npm ci`

Дополнительно:

1. Изменить в файле `package.json` поля `url`, `name`, `description`, `version`
2. Изменить на свое усмотрение файл `readme.md`
3. Включить eslint в настройках вашей ide
4. Удалить файлы-примеры: `createId`, `minus`, `plus`
5. Удалить тестовую зависимость `lodash` (была оставлена в качестве наглядности tree-shaking)

<a name="project_files"></a>

## Структура проекта (включая некоторые авто-сгенерированные файлы)

```
.
├── dist                          # результат работы rollup
├── src                           # исходный код npm-модуля
│   ├── ...                       # ваш код
│   └── index.ts                  # точка входа в npm-модуль
├── .eslintignore                 # игнор-файл для линтинга ts
├── .eslintrc.json                # конфиг eslint
├── .gitignore                    # игнор-файл, файлы и папки прописанные тут не попадут в репозиторий
├── .npmrc                        # конфиг npm
├── .nvmrc                        # конфиг nvm
├── .prettierrc                   # конфиг prettier
├── jest.config.json              # конфиг jest
├── package.json                  # версия, зависимости, скрипты и другая дополнительная информация по проекту
├── package-lock.json             # lock-файл для зависимостей
├── README.md                     # документация
├── rollup.config.mjs             # конфиг prod сборки
└── tsconfig.json                 # ts-конфиг
```

<a name="quality"></a>

## Качество и ci

Тип | Инструмент
------------ | -------------
eslint | [eslint-plugin](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
unit-тесты | [jest](https://jestjs.io/)

<a name="deps"></a>

## Версии зависимостей

Чтобы избежать дублирования `production` зависимостей, это те, которые вы устанавливаете в поле `dependencies` в файле
`package.json`, нужно указывать их версию через крышку, например: `"lodash": "^4.17.21"`. Для `devDependencies` это не
обязательно, их можно хардкодить. Если вы делаете npm-модуль для `dev` предназначения, например плагин для `webpack`,
то `dependencies` можно хардкодить, так как они не повлияют на `production`.

<a name="alias"></a>

## Алиасы

Иногда релятивные импорты выглядят ужасно, например так:

```javascript
import batman from '../../../batman';
```

В таких случаях хочется сделать импорт красивее, а поддержку кодовой базы проще, например так:

```javascript
import batman from 'batman';
```

Для этого нужно:

1) открыть файл `tsconfig.json`
2) в поле `compilerOptions.paths` прописать алиас

Модуль `src/plus` можно использовать в качестве примера.

```json
{
  "compilerOptions": {
    "paths": {
      "plus": [
        "src/plus/index.ts"
      ]
    }
  }
}
```

<a name="external"></a>

## Исключение зависимостей из исходного кода

Перед публикацией в `nexus` вашего `npm-модуля` - соберите локально сборку (`npm run build`) и посмотрите,
нет ли лишних файлов в папке `dist`. Если увидите что-то кроме вашего исходного кода, например зависимости,
то вам нужно дополнительно прописать их в поле `external` в файле `rollup.config.mjs`.

Как пример, если вы используете `classnames`, но он не был автоматически исключен из финальной сборки, произошло
это скорее всего из-за того что вы используете импорт `classnames/bind`, пример ниже решает данную проблему:

```js
external: ['classnames/bind']
```

<a name="dev"></a>

## Как разрабатывать и тестировать?

Обычно для простых пакетов, содержащих только функции, витрин для разработки не поднимают. Работоспособность проверяется: 

1) путем unit-тестов
2) путем тестирования на хост проекте с помощью [yalc](https://github.com/wclr/yalc)

Гайд по `yalc`:

1) устанавливаем `yalc` глобально
2) заходим в `npm-модуль` который хотите тестировать
3) собираем prod сборку (`npm run build`)
4) пишем `yalc publish`
5) заходим в хост-проект в котором будем тестировать
6) пишем `yalc add name_of_my_npm`, где `name_of_my_npm` - название вашего `npm-модуля` в `package.json`

апдейты:

1) меняем исходный код
2) собираем prod сборку (`npm run build`)
3) пишем `yalc publish`
4) заходим в хост-проект в котором будем тестировать
5) пишем `yalc update`

удаление:

1) заходим в хост-проект из которого нужно удалить тест билиотеки
2) пишем `yalc remove —all`

<a name="changes"></a>

## История изменений

- 1.0.0 - **29 Июня 2023** Релиз npm-component-boilerplate ([**@Zerfo**](https://github.com/Zerfo) in [**3c95bb1**](https://github.com/Zerfo/npm-functions-boilerplate/commit/3c95bb1f1e608f93b7d35dfba336ae1c25a27762))