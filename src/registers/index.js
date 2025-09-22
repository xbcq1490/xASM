// literally the simplest register.

class register {
    constructor(name) {
        this.name = name
        this.value = 0;
    }

    getValue() {
        return this.value
    }

    setValue(value) {
        this.value = value
    }
}

module.exports = register