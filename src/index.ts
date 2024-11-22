import server from "./server/server";
import { PORT } from "./server/secret";

const startServer = () => {
    server.listen(PORT || 3333, () => {
      console.log("App rodando!");
      console.log(`Porta: ${PORT || 3333}`);
      if (process.env.NODE_ENV === "development") {
        console.log(`http://localhost:${PORT || 3333}`);
      }
    });
  };

startServer();
