import app from "./server";
import {port} from "./server";

(async () => {
  try {
    app.listen(port, () => {
      console.log(`🌽 Listening on http://localhost:${port}`);
    });
  } catch (e) {
    console.log('Error in connecting to database :', e);
  }
})();