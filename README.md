[![Tests for sprint 13](https://github.com/Olga07122007/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Olga07122007/express-mesto-gha/actions/workflows/tests-13-sprint.yml)
[![Tests for sprint 14](https://github.com/Olga07122007/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Olga07122007/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
  

# Бэкенд проекта Mesto  
Проект выполнен с помощью платформы Node.js с использование фреймверка Express.js.  
В проекте испльзуется база данных MongoDB (доступна по адресу "mongodb://localhost:27017/mestodb").  
  
Реализованы API:  

1. Создание пользователя, обновление данных пользователя. Получение данных о всех пользователях, зарегистрированных на данном сайте.  
А также получение данных о конкретном пользователе по его _id.  
  
2. Создание и удаление карточки. Постановка и удаление лайка карточки. Получение всех карточек сайта.  
  
  

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
