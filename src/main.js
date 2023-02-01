const server = require("./server.js");
const CONFIG = require('./serve/config.js');


server.listen(CONFIG.SERVER_PORT,()=>{
  console.log("server is running on port: ",CONFIG.SERVER_PORT);
});
