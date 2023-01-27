import { Request, Response, NextFunction } from "express";
import { decriptData, encryptDes } from "./../service/LogService";
import { decryptingService, encryptingService } from './../service/CleanCode';


const DecryptLogData = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const reply = await decryptingService();

    return res.status(200).json({
      message: reply,
    });

  }

  catch (error) {
    console.log(error);
    throw new Error("");
  }

};

const encryptLogData = async (req: Request, res: Response, next: NextFunction) => {
  let body: Uint8Array = req.body.body;

  try {
    // const reply = await encryptDes(body);
    const reply = await encryptingService(body);

    return res.status(200).json({
      message: reply,
    });
  }
  catch (error) {
    console.log(error);
    throw new Error("");
  }

};



export default { DecryptLogData, encryptLogData };
