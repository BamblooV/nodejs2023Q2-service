import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Dedicated to the guys who held first place throughout the course</h1>
    <pre>
      Если вы есть — будьте первыми,
      Первыми, кем бы вы ни были.
      Из песен — лучшими песнями,
      Из книг — настоящими книгами.

      Первыми будьте и только!
      Пенными, как моря.
      Лучше второго художника
      Первый маляр.

      Спросят вас оробело:
      «Кто же тогда останется,
      Если все будут первыми,
      Кто пойдёт в замыкающих?»

      А вы трусливых не слушайте,
      Вы их сдуйте как пену,
      Если вы есть — будьте лучшими,
      Если вы есть — будьте первыми!

      Если вы есть — попробуйте
      Горечь зелёных побегов,
      Примериваясь, потрогайте
      Великую ношу первых.

      Как самое неизбежное
      Взвалите её на плечи.
      Если вы есть — будьте первыми,
      Первым труднее и легче!
      ©Роберт Рождественский
      </pre>
    </body>
    </html>
    `;
  }
}
