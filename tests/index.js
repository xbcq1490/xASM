const xAsm = require("../src/index.js")
const source = require("fs").readFileSync("./examples/test.xa", "utf-8")

const xAsmVm = new xAsm(source)

xAsmVm.run()