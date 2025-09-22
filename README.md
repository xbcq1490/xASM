![xAsmLogo](./docs/logo.png)

### **🔧 A simple assembly-inspired programming language and interpreter implemented in JavaScript**

xASM is a lightweight assembly-like language designed for learning and experimentation. It features a custom instruction set, register-based architecture, and a JavaScript interpreter that can execute xASM programs.

## Features

- **Assembly style syntax**: Familiar assembly-like instruction format with labels and jumps
- **Register based architecture**: Uses registers A, B, C, D, E for operations and data storage
- **Basic arithmetic**: Support for ADD, SUB, MUL, DIV, MOD, and POW operations
- **Control flow**: Jump instructions (JMP, JEQ) with label support for loops and conditionals
- **String perations (USELESS RIGHT NOW!)**: CONCAT for string concatenation and LEN for length operations
- **System Calls**: CALL instruction for output and system operations
- **Tiny and lightweight**: Pure JavaScript implementation with no external dependencies

## 📦 Installation

```
# Using git
git clone https://github.com/xbcq1490/xASM.git
cd xASM
npm install -g .

# Using npm
npm install -g xasm
```

## 🚀 Running Programs

```
# Run the included example
npm test
# Run with the cli tool
xasm ./path/to/file.xa
# Or run manually
node cli.js ./path/to/file.xa
```

## 📖 Language Reference

### Registers

xASM has ~~infinite~~ registers.
- Used for storing values, performing calculations, and passing parameters

### Instructions

#### Data loading
```
LOAD A, 42        ; Load immediate value 42 into register A

```

#### Arithmetic operations
```
ADD A, 5          ; Add 5 to register A
SUB A, 3          ; Subtract 3 from register A
MUL A, 2          ; Multiply register A by 2
DIV A, 4          ; Divide register A by 4
MOD A, 3          ; A = A modulo 3
POW A, 2          ; A = A raised to power of 2
UNM A, B          ; Unary minus operation
```

#### String operations (currently useless tbh)

```
CONCAT A, B, C    ; Concatenate all values, then store in A register
LEN A, B          ; Get length of value in B, store in A
```

#### Control Flow
```
LABEL loop        ; Define a label named 'loop'
JMP loop          ; Jump to label 'loop'
JEQ A, 0, end     ; Jump to 'end' if A equals 0
JEQ A, 5, true, false  ; Jump to 'true' if A equals 5, otherwise 'false'
```

#### System Operations
```
CALL C, A         ; System call, 0 = print, 1 = error
HALT              ; Stop program execution
```

### Comments
`; This is a comment - lines starting with semicolon are ignored`


## 📋 Example Programs

### Simple Counter

```
; Count from 1 to 10
LOAD A, 1
LOAD C, 0

LABEL loop
CALL C, A         ; Print current number
ADD A, 1          ; Increment counter
JEQ A, 11, end, loop  ; Continue if A < 11

LABEL end
HALT
```

## 🏗️ Architecture

The xASM interpreter consists of several components:

- **Parser** (`src/parser/`): Parses xASM source code into a tree.
- **Interpreter** (`src/interpreter/`): Executes the parsed instructions using a virtual machine
- **Opcodes** (`src/opcodes/`): Defines the instruction set and argument requirements
- **Registers** (`src/registers/`): Register template
- **Utils** (`src/utils/`): Utilities

## ⚠️ Requirements & Limitations

- **Node.js**: Requires Node.js 12.0 or higher
- **File Extension**: Uses `.xa` extension for xASM source files
- **No Memory Model**: Operations are register-based only
- **Limited I/O**: Only supports basic print output via CALL instruction

## 🔧 Error Handling

The interpreter provides basic error handling for:

- Invalid instruction syntax
- Missing opcodes
- Register access errors

```javascript
try {
    const vm = new interpreter(parsed.tree);
    vm.executeTree();
} catch (error) {
    console.error("Execution failed:", error, message);
}
```

## 🤝 Contributing

Contributions are welcome! This project was made as an experiment. Feel free to:

- Add new opcodes
- Improve the parser
- Enhance error handling
- Create more example programs
- Optimize the interpreter

Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the GPL-3.0-or-later License - see the LICENSE file for details.

## 🐛 Issues

If you encounter any issues or have feature requests, please file them on the [GitHub issues page](https://github.com/xbcq1490/xASM/issues).

**Made with ❤️ for "assemblers"**