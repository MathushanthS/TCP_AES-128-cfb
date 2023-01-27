import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { decriptData, encryptAES } from "./../service/LogService";

interface Post {
  userId: Number;
  body: String;
}

// Decrypt
const postLogData =  async (req: Request, res: Response, next: NextFunction) => {

  try {
    // const reply = await decriptData((data) => {
    //   console.log(`Received data: ${data}`);
    //   console.log("Reply :", data);
    //   return data.toString();
    // });
    const reply= await decriptData(/*body*/);
    console.log("After :", reply);
    return res.status(200).json({
        message: reply,
      });
  } catch (error) {
    console.log(error);
    throw new Error("");
  }
 
};


//encrypt
const postLogEncripData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body: string = req.body.body;
  //const data:string ="163410c0e4d047944213edca9059f37e"
  const reply = encryptAES(body);
  //const reply="decriptData(body)";

  return res.status(200).json({
    message: reply,
  });
};



export default { postLogData, postLogEncripData };
