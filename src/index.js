const parser = require("./parser");
const interpreter = require("./interpreter");

class xAsm {
    constructor(source) {
        this.source = source;
    }

    run() {
        const parsed = new parser(this.source).parse();
        const vm = new interpreter(parsed.tree);
        vm.executeTree();
    }
}

module.exports = xAsm;