import app from "./Config/express";
import { config } from "./Config/config";

/**
 * @Server Start Express server.
 * Listen on provided port, on all network interfaces.
 *
 */
const server = app.listen(config.port, () => {
  console.log(`> [Server] is running on port: ${config.port}`);
});

export default server;
