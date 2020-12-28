const express = require("express");
const config = require("./configs/config.json");
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter')

/*
REST API beadandó
A gyakjegyhez implementálni kell és beadni egy REST API-t is, szerver- és kliensprogrammal együtt.

A követelményeket Király Sándor tanár úr határozta meg:REST követelmények:
1. A REST API PHP-ben vagy Node.js-ben legyen. A kliens kódja C# legyen! (Esetleg JAVA.)
2. Az erőforrásokat (adatokat) egy adatbázisban kell tárolni. (Mindegy, hány táblás...)
3. A CRUD műveleteket kell implementálni az adatbázisban lévő adatokon.
4. A Create, Update és Delete műveleteket csak valamilyen azonosítás után lehessen igénybe venni.
5. A kliens program nem lehet  Console App.
*/

const app = express();

app.use(express.json());
app.use('/user',userRouter);
app.use('/book',bookRouter);

app.listen(config.port, () => {
    console.log("Server is running on port %s.", config.port);
});
