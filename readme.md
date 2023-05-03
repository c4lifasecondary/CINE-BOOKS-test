Hi,

1. 2. Так как в основном все прошлые проекты были защищены NDA, то прилагаю Вам, как пример тест-кейса и баг-репорта, ознакомиться с реальным багом, который был обнаружен в ходе выполнения задания по ссылке:

    https://docs.google.com/document/d/1M-EB4WW3U233XO4GdHpZ6yzr6Gr0EKLEo5MXu5_px-c/edit?usp=sharing

3. Automation task build with:
- js;
- cypress;
- cypress-real-events package;

To setup on your machine:
1. Pull, install node
2. Run `npm i`
3. Run `npx cypress open` to firstly setup cypress

In order to run with cypress dashboard you can use: `npm run open-test`.
If you want use commandline use: `npm run test`.

Path to file with tests: /cypress/e2e/spec.cy.js
Video of test run: /cypress/videos/
Can be enchanced with mochawesome or other test reporter if needed...

Notes:

В первом кейсе, который проверяет включение/выключение субтитров в плеере есть момент с тем, что субтитры появляются не на каждом слайде с видео. Данный код будет работать только для данного в примере видео. В случае, если видео на странице будет постоянно меняться, то кейс можно написать по-другому. 

Thank you for your time <3!