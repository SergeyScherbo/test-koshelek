const formatNumber = (n, digits) => {
	n = Number(n);

	if (n < 1) {
		return lessThanOne(n);
	}

	if (n < 1000) {
		return lessThanThousand(n);
	}

	var si = [
		{ value: 1, symbol: "" },
		{ value: 1E3, symbol: "K" },
		{ value: 1E6, symbol: "M" },
		{ value: 1E9, symbol: "B" },
		{ value: 1E12, symbol: "T" },
		{ value: 1E15, symbol: "Q" }
	];

	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

	for (let i = si.length - 1; i > 0; i--) {
		if (n >= si[i].value) {
			return "$" + (n / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
		}
	}
}

const lessThanOne = n => {
	return "$" + n.toFixed(8);
}

const lessThanThousand = n => {
	return "$" + n.toFixed(2);
}

export { formatNumber };