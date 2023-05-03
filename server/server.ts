import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './router';
const app = express();
 export const port = 4200;


app.use(cors());
app.use(express.json());
app.use(router);

// (async () => {
//   try {
//     app.listen(port, () => {
//       console.log(`🌽 Listening on http://localhost:${port}`);
//     });
//   } catch (e) {
//     console.log('Error in connecting to database :', e);
//   }
// })();

export default app;
