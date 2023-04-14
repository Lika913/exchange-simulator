# Exchange-simulator
Простой симулятор биржи c клиент-серверной архитектурой. Клиент (торговый терминал) подключается к серверу по протоколу websocket и взаимодействует с его API. 
Back часть - это не полноценный сервер, она лишь имитирует его поведение, чтобы клиент отрабатывал в полной мере.

## Preview
![Image alt](https://github.com/Lika913/sources/raw/master/imgs/exchange-simulator.PNG)

Функционал, который клиент реализует:
* `есть возможность выбрать торговый инструмент (актив)`
* `есть возможность выбрать объем заявки`
* `отображаются актуальные цены на покупку и продажу выбранного инструмента в заданном объеме`
* `есть возможность отправить заявку на покупку или продажу`
* `есть возможность отменять активные заявки`
* `приходят уведомления об изменениях статуса заявок, ошибок соединения и т.д.`
* `отображаются позиции в терминале с актуальными данными`

## Tech stack
* <a href="https://www.typescriptlang.org/">typescript</a>
* <a href="https://ru.reactjs.org/">react</a>
* <a href="https://www.npmjs.com/package/jest-websocket-mock">jest-websocket-mock</a>

## To start the server part, go to the exchange-server-simulator folder and run:

* `npm i` - установит необходимые зависимости
* `npm start` - запустит симулятор сервера

## To start the trading terminal, go to the trading-terminal-client folder and run:

* `npm i` - также установит необходимые зависимости
* `npm start` - запустит клиента

### To run tests you need to run:
* `npm test`, после чего выбрать один из флагов для фильтра, например 
* `a` - запустит все тесты
