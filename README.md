## Тестовое задание для компании SmartWorld http://smartworld.team/
При первой загрузке с вероятность 10% может произойти ошибка загрузки данных, это сделано специально, просто обновите страницу.
Первая загрузка будет длиться 1500 милисекунд, это сделано для имитации загрузки данных с сервера, как и вероятность ошибки.

Затем приложение делает авто-сохранение данных в localStorage каждые 10 секунд.
Авто-сохранения можно отключить, сохраниться вручную или очистить localStorage с помощью соответствующих кнопок в шапке приложения справа.

Все данные хранятся в массиве todoLists - это массив: список списков, а его элементы это объекты, у которых есть todos - это массивы: списки дел.
