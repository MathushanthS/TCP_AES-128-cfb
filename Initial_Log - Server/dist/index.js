"use strict";
// import * as express from "express";
// class App {
//   constructor() {
//     this.app = express.default();
//   }
//   //TODO: What is public app: express.Application
//   public app: express.Application;
// }
// const app = new App().app;
// const port = 4040;
// app.listen(port, function() {
//   console.log('Express server listening on port ' + port);
// });
function getAndPrintUserInput() {
    process.stdout.write("Please enter your message: ");
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            const input = chunk.toString().trim();
            console.log(`You entered: ${input}`);
            process.stdin.end();
        }
    });
}
