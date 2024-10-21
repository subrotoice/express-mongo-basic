const os = require("os");

const totalmem = os.totalmem();
const freemem = os.freemem();

console.log(totalmem);
console.log(freemem);
