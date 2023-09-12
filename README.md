# Ydeas SPA

## Описание проекта

Проект представляет собой одностраничное веб-приложение для работы с сервисом Ydeas (https://github.com/diac/ydeas). Приложение позволяет пользователям предлагать свою бизнес-идею для рассмотрения экспертами, которые в последствии принимают решение о ее жизнеспособности. Пользователь вводит текстовое описание идеи и опционально загружает дополнительные материалы, связанные с идеей (PDF-документы, картинки). Другие пользователи системы имеют возможность просматривать все загруженные бизнес-идеи и голосовать за них оценками "Нравится" или "Не нравится". Пользователи-эксперты должны иметь возможность утвердить или отклонить бизнес-идею.

## Роли пользователей

1. Пользователь -- может предлагать свои идеи, просматривать все бизнес-идеи, созданные другими пользователями,
   оценивать бизнес-идеи, добавленные в систему
2. Эксперт -- может все то же, что и Пользователь, плюс имеет возможность утверждать или отклонять идеи.

## Особенности реализации

Проект реализован в виде одностраничного веб-приложения на React. Для аутентификации и авторизации пользователей используется Keycloak.

## Стек технологий

- React 18.2.0
- React DOM 18.2.0
- React Draft Wysiwyg 1.15.0
- React Router DOM 5.0.1
- React Bootstrap 2.8.0
- Keycloak JS 22.0.1
- Bootstrap 5.3.1
- Draft JS 0.11.7

## Требования к окружению

- NodeJS 18
- NPM 9.8.1

## Сборка и запуск проекта

### Настройка переменных среды

Перед запуском приложения необходимо определить следующие переменные среды:

- REACT_APP_YDEAS_API_HOST -- адрес хоста, на котором развернут шлюз сервиса Ydeas
- REACT_APP_KEYCLOAK_URL -- адрес хоста, на котором развернут Keycloak
- REACT_APP_KEYCLOAK_REALM -- имя рэлма Keycloak, в котором хранятся данные учетных записей пользователей сервиса Ydeas
- REACT_APP_KEYCLOAK_CLIENT_ID -- ID клиента Keycloak, под которым будут авторизовываться пользователи приложения
- REACT_APP_IDEAS_RATING_RESULTS_PER_PAGE -- количество результатов рейтинга идей, выводимых на одной странице

Для определения данных переменных среды, можно создать в корневой директории проекта файл .env.local. В качестве образца можно использовать файл .env.example.

### Запуск через NPM

Для запуска через NPM достаточно склонировать проект в некоторую директорию. Затем, из этой директории выполнить команду

```shell
npm start
```

В результате выполнения этой команды запустится локальный сервер приложения, и само приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

### Запуск через Docker Compose

Перед запуском приложения через Docker Compose также необходимо определить переменные среды по аналогии с запуском через NPM.
Для этого можно либо создать файл .env.local в корневой директории проекта, либо определить значения переменных среды в конфигурации соответствующего Docker-сервиса в файле docker-compose.yml.

Далее, для запуска приложения необходимо выполнить команду

```shell
docker compose up
```

## Взаимодействие с приложением

### Вход в сисиему

При открытии страницы с приложением, компонент Keycloak проверяет данные аутентификации пользователя. Если пользователь не аутентифицирован, приложение осуществляет редирект на страницу с формой входа Keycloak.

![Вход в систему](/img/1_keycloak_sign_in.png)

После удачной аутентификации, Keycloak перенаправит пользователя обратно на страницу с приложением.

### Экран "Рейтинг идей"

На данном экране отображаются каротчки с идеями, упорядоченные по убыванию рейтинга идей.
Одобренные и отклоненные идеи выделяются определенным стилем (зеленая рамка -- у одобренных, красная -- у отклоненных).
Для того, чтобы просмотреть полное содержание идеи, пользователь должен нажать на ссылку "Подробнее" -- в результате откроется экран "Просмотр идеи".

![Рейтинг идей](/img/2_ideas_rating.png)

### Экран "Просмотр идеи"

На данном экране отображается заголовок, содержание идеи и перечень прикрепленных к идее файлов.
На этом же экране находятся кнопки, с помощью которых пользователь может оценить идею ("Нравится" / "Не нравится").

![Просмотр идеи](/img/3_idea_view.png)

### Экран "Мои идеи"

На данном экране отображаются все идеи, принадлежащие пользователю. Пользователь может добавлять новые идеи, редактировать и удалять уже существующие.
![Мои идеи](/img/4_my_ideas.png)

### Экран "Добавление идеи"

На данном экране содержится форма создания новой идеи.
Описание идеи можно вводить и редактировать в формате rich-text с использованием WYSIWYG-редактора. Существует возможность стилизации текста (толщина и размер шрифта, курсив, заголовки, списки, картинки и т.п.).

![Добавление идеи](/img/5_add_idea.png)

### Экран "Редактирование идеи"

Данный экран аналогичен экрану "Добавление идеи".
![Редактирование идеи](/img/6_edit_idea.png)

Помимо редактирования заголовка и описания идеи, на данном экране предусмотрена возможность прикрепления файлов к идее:
![Прикрепленные файлы](/img/7_idea_attachments.png)

### Оценка идей

На экране "Просмотр идеи" доступна функция оценки идей.
Любой пользователь может поставить идее оценку "Нравится" или "Не нравится", что отразится на позиции идеи в рейтинге.
Пользователь-эксперт также может "Одобрить" или "Отклонить" идею.

![Оценка идей](/img/8_idea_vote.png)

## Контакты

email: nikolai.gladkikh.biz22@gmail.com
