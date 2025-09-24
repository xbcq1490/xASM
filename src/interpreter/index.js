const registers = require("../registers");

class interpreter {
	constructor(tree) {
		this.tree = tree;
		this.reservedCalls = {
			0: console.log,
			1: console.error,
		};
		this.resetInterpreter();
	}

	resetInterpreter() {
		this.registers = {};
		this.markers = {};
		this.pc = 0;
		this.running = true;
	}

	processLabels() {
		for (let i = 0; i < this.tree.length; i++) {
			const instr = this.tree[i];
			if (instr.opcode === "LABEL") {
				this.markers[instr.args[0]] = i; // save its address
			}
		}
	}

	getRegisterValueOrReturn(name) {
		if (this.registers[name]) {
			return this.registers[name].getValue();
		}
		if (typeof name === "string" && name.trim() !== "" && !isNaN(name)) {
			return parseInt(name, 10);
		}
		return name;
	}

	executeInstructon(instruction) {
		const opcode = instruction.opcode;
		const args = instruction.args;
		switch (opcode) {
			case "LOAD":
				let loadRegister;
				if (this.registers[args[0]]) {
					loadRegister = this.registers[args[0]];
				} else {
					loadRegister = new registers(args[0]);
					this.registers[args[0]] = loadRegister;
				}
				loadRegister.setValue(parseInt(args[1]));
				break;
			case "ADD":
				const addRegister = this.registers[args[0]];
				addRegister.setValue(addRegister.getValue() + parseInt(args[1]));
				break;
			case "SUB":
				const subRegister = this.registers[args[0]];
				subRegister.setValue(subRegister.getValue() - parseInt(args[1]));
				break;
			case "MUL":
				const mulRegister = this.registers[args[0]];
				mulRegister.setValue(mulRegister.getValue() * parseInt(args[1]));
				break;
			case "DIV":
				const divRegister = this.registers[args[0]];
				divRegister.setValue(divRegister.getValue() / parseInt(args[1]));
				break;
			case "MOD":
				const modRegister = this.registers[args[0]];
				modRegister.setValue(modRegister.getValue() % parseInt(args[1]));
				break;
			case "POW":
				const powRegister = this.registers[args[0]];
				powRegister.setValue(powRegister.getValue() ^ parseInt(args[1]));
				break;
			case "UNM":
				const unmRegister = this.registers[args[0]];
				unmRegister.setValue(-parseInt(args[1]));
				break;
			case "LEN":
				const lenRegister = this.registers[args[0]];
				lenRegister.setValue(parseInt(args[1].length));
				break;
			case "CONCAT":
				const concatRegister = this.registers[args[0]];
				let preparedArgs = [];
				for (let i = 0; i < args.length; i++) {
					preparedArgs.push(this.getRegisterValueOrReturn(args[i]));
				}
				concatRegister.setValue(preparedArgs.join(""));
				break;
			case "CALL":
				const fn = this.registers[args[0]] ? this.reservedCalls[this.registers[args[0]].getValue()] : this.reservedCalls[parseInt(args[0], 10)];

				let callArgs = args.slice(1).map((a) => this.getRegisterValueOrReturn(a));
				fn(...callArgs);
				break;
			case "JEQ": {
				// JEQ A, B, truelabel, falselabel?
				const left = this.getRegisterValueOrReturn(args[0]);
				const right = this.getRegisterValueOrReturn(args[1]);
				const trueLabel = args[2];
				const falseLabel = args[3];

				if (left === right) {
					if (trueLabel === undefined) {
					} else if (this.markers[trueLabel] !== undefined) {
						this.pc = this.markers[trueLabel];
						return; // took jump
					} else {
						throw Error("Unknown marker location: " + trueLabel);
					}
				} else {
					if (falseLabel !== undefined) {
						if (this.markers[falseLabel] !== undefined) {
							this.pc = this.markers[falseLabel];
							return; // jump taken
						} else {
							throw Error("Unknown marker location: " + falseLabel);
						}
					}
				}
				break;
			}
			case "JEQ":
				let jeqArgs = [];
				for (let i = 0; i < args.length - 2; i++) {
					jeqArgs.push(this.getRegisterValueOrReturn(args[i]));
				}
				if (jeqArgs[0] === jeqArgs[1]) {
					if (this.markers[args[3]]) {
						this.pc = this.markers[args[3]];
					} else {
						this.pc = this.markers[args[2]] || this.pc;
					}
				}
				return; // prevent pc += 1
			case "LABEL":
				this.markers[args[0]] = this.pc;
				break;
			case "HALT":
				this.running = false;
				break;

			default:
				throw Error("Unknown opcode!");
		}
		this.pc += 1;
	}

	executeTree() {
        this.processLabels();
		while (this.running && this.pc < this.tree.length) {
			this.executeInstructon(this.tree[this.pc]);
		}
	}
}

module.exports = interpreter;
