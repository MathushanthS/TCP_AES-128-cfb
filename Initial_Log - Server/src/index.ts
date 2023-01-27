import * as net from "net";
import * as fs from "fs";

var globalData: any = "";
const server = net.createServer((socket) => {
    // socket.on("data", (data: Buffer) => {
    socket.on("data", (data:Buffer) => {
        // check if the received data is a request for data
        if (data.toString() === "send data") {
            // send data to the client
            const data = fs.readFileSync("EncriptedData.txt");
            console.log(`Sent data: ${data}`);
            socket.write(data);
        } else {
          //  const base64Data = data.toString();
    const buffer = Buffer.from(data);
            console.log(`Received data: ${data}`);
            console.log(`Received buffer data: ${buffer}`);
           // console.log(`Received base64Data data: ${base64Data}`);
            socket.write("Echo: " + data);

            fs.writeFileSync("EncriptedData.txt", data);
        }
    });
    socket.on("end", () => {
        console.log("Client disconnected");
    });
    // socket.on('data', (data: Buffer) => {
    //   console.log(data);
    //   socket.end();
    // });
    // const base64Data = data.toString();
    // const buffer = Buffer.from(base64Data, 'base64');
});

server.listen(3000, "127.0.0.1");
console.log("Server listening on 127.0.0.1:3000");

// 02a1c8da7258b04261a4e77f543ae395
