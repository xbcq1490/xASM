const opcodes = require("../opcodes");

class Parser {
	constructor(source) {
		if (typeof source !== "string") {
			throw TypeError("Source needs to be a string!");
		}
		this.source = source;
		this.tree = [];
	}

	parse() {
		const lines = this.source.split("\n");

		for (let rawLine of lines) {
			let line = rawLine.split(";")[0].trim();
			if (line === "") continue; // skip empty lines
			const [opcode, ...rest] = line.split(/\s+/);
			const args = rest
				.join(" ")
				.split(",")
				.map((a) => a.trim())
				.filter((a) => a !== "");
			if (!opcodes[opcode]) {
				const keys = Object.keys(opcodes).filter((k) => k !== "names");
				const suggestion = keys.find((k) => k.startsWith(opcode[0])) || keys[0];
				throw Error(`Unknown opcode "${opcode}". Did you mean "${suggestion}"?`);
			}

			const opDef = opcodes[opcode];
			const validCounts = opDef.args;
			if (!validCounts.includes(args.length) && !(validCounts.includes("infinite") && args.length >= validCounts[0])) {
				throw TypeError(`Invalid number of arguments for ${opcode}. Got ${args.length}, expected ${validCounts}`);
			}

			this.tree.push({ opcode, args });
		}

		return this;
	}
}

module.exports = Parser;
