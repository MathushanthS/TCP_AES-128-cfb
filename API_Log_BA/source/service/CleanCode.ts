import * as crypto from 'crypto';
import * as net from 'net';

const key = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);

const host = "localhost";
const port = 3000;

// const byteArray = new Uint8Array([1, 2, 3, 4, 5]);

export function encryptingService(data: Uint8Array)
        {
            const cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
            let encrypted = cipher.update(Buffer.from(data));
            encrypted = Buffer.concat([encrypted, cipher.final()]);
          
          
          
            console.log("SendData :", encrypted)/////////////////////////////////////////////////////////////////////////////////////////
          
          
            // TCP/IP Communication
                  const client = new net.Socket();
                  client.connect(port, host, () => {
                    client.write(encrypted);
                    client.end();
                  });

                  return encrypted;
        }


export async function decryptingService(): Promise<Uint8Array> {

    const client = new net.Socket();
    client.connect(3000, '127.0.0.1', () => {
        client.write('send data');
    });
    return new Promise(async (resolve) => {
        client.on('data', async (data) => {         
            const decipher = crypto.createDecipheriv('aes-128-cfb', key, iv);
      let decrypted = decipher.update(data);
            // decrypted += decipher.final('utf8');
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            console.log("decrypted :",decrypted)
            resolve(decrypted);
        });
    });

  }
  