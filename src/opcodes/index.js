const opcodes = {
    "LOAD": {
        args: [2] // LOAD A, 11
    },
    "ADD": {
        args: [2] // ADD A, 4
    },
    "SUB": {
        args: [2] // SUB A, 1
    },
    "MUL": {
        args: [2] // MUL A, 2
    },
    "DIV": {
        args: [2] // DIV A, 11
    },
    "MOD": {
        args: [2] // MOD A, 2
    },
    "POW": {
        args: [2] // POW A, 2
    },
    "UNM": {
        args: [2] // POW A, 11?
    },
    "CONCAT": {
        args: [3, "infinite"] // CONCAT A, B, C?, D?
    },
    "LEN": {
        args: [2] // LEN A, B?
    },
    "CALL": {
        args: [2]
    },
    "JMP": {
        args: [1] // JMP hi - jumps to label or num
    },
    "JEQ": {
        args: [3, 4] // JEQ A, 12, truepointer, falsepointer?
    },
    "LABEL": {
        args: [1] // LABEL hi - saves pc
    },
    "HALT": {
        args: [0]
    },
    names: []
}

for (const name of Object.entries(opcodes)) {
    opcodes.names.push(name)
}

module.exports = opcodes