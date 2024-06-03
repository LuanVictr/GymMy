import dotenv from "dotenv";
import app from "./app";
import https from "https";
import fs from 'fs';
import path from "path";

dotenv.config();

const port = process.env.PORT ?? 3001;

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'cert-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);

sslServer.listen(port, () => console.log(`Server online on port ${port}`));
