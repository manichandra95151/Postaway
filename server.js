import server from "./index.js";
import { connectToDb } from "./src/config/db.js";

server.listen(8000, async () => {
  await connectToDb();
  console.log(`server is running at port 8000`);
});
