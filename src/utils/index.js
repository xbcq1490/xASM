const utils = {
    randomNumber: function(min, max) {
        const lo = Math.ceil(min);
		const hi = Math.floor(max);
		return Math.floor(Math.random() * (hi - lo + 1)) + lo;
    }
}