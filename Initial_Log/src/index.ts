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

// import { runFunctionA, runFunctionB, runFunctionC } from './helpers';
import { encryptAES, getAndPrintUserInput } from './controllers/ApiController';
import { decriptData } from './controllers/Decript';

// async function getDataFromAPIAndRunFunctions(): Promise<void> {
//     try {
      //const response = await fetch('API_URL');
      //const data = await response.json();
  
      // Run the functions in parallel
    //   const functionAResult = runFunctionA(data);
    //   const functionBResult = runFunctionB(data);
    //   const functionCResult = runFunctionC(data);
   // process.stdout.write("Please Choose: 1(encript) 2(Decript)");
    //const chunk:number = await process.stdin.read();
    // console.log(chunk)
    // if(chunk==1){
        process.stdout.write("Please enter your message: ");
    process.stdin.on('readable', () => {
        const message = process.stdin.read();
         if (message !== null) {
             const input = message.toString().trim();
           //  console.log(input)

             const secretKey="master"
              //getAndPrintUserInput(input);
              //encryptAES(input,secretKey)
             decriptData(input);
             process.stdin.end();
         }
     });
    // }
    // else if (chunk==2){

    // }

    // else{
    //     console.log("Give proper Input");
    // }
  
      // Wait for all the functions to complete
      //const [resultA, resultB, resultC] = await Promise.all([functionAResult, functionBResult, functionCResult]);
  
      // Do something with the results
     // console.log(resultA);
     // console.log(resultB);
     // console.log(resultC);
  
//     } catch (error) {
//       console.error(error);
//     }
//   }