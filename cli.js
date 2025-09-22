#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function printHelp() {
	console.log(`xASM cli
    
Usage: cli.js <path-to-source.xa>
    
Options:
  -h, --help    Show this help message
`);
}

const argv = process.argv.slice(2);
if (argv.length === 0 || argv.includes("-h") || argv.includes("--help")) {
	printHelp();
	process.exit(argv.length === 0 ? 0 : 0);
}

const inputPath = argv[0];
const resolved = path.resolve(process.cwd(), inputPath);

if (!fs.existsSync(resolved)) {
	console.error(`File not found! ${resolved}`);
	return;
}

let source;
try {
	source = fs.readFileSync(resolved, "utf-8");
} catch (err) {
	console.error(`Failed to read file: ${err.message}`);
	process.exit(3);
}

let xAsm = require("./src/index.js");

try {
	const vm = new xAsm(source);
	if (typeof vm.run !== "function") {
		console.error("VM did not return a `.run()` function.");
		process.exit(5);
	}
	vm.run();
} catch (err) {
	console.error("Error while running VM:", err.stack || err.message || err);
	process.exit(6);
}
