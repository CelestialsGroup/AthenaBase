class DateTime {
	/**
	 * strftime
	 */
	public strftime(value: Date, format: string = "%Y-%m-%d %H:%M:%S") {
		const replacements: { [key: string]: string } = {
			"%Y": value.getFullYear().toString(), // 4-digit year
			"%m": ("0" + (value.getMonth() + 1)).slice(-2), // 2-digit month (01-12)
			"%d": ("0" + value.getDate()).slice(-2), // 2-digit day (01-31)
			"%H": ("0" + value.getHours()).slice(-2), // 2-digit hour (00-23)
			"%M": ("0" + value.getMinutes()).slice(-2), // 2-digit minute (00-59)
			"%S": ("0" + value.getSeconds()).slice(-2), // 2-digit second (00-59)
			"%f": ("000000" + value.getMilliseconds() * 1000).slice(-6), // microseconds (0-999999)
			"%a": value.toLocaleString("en-US", { weekday: "short" }), // Abbreviated weekday (Mon, Tue, etc.)
			"%A": value.toLocaleString("en-US", { weekday: "long" }), // Full weekday name (Monday, Tuesday, etc.)
			"%b": value.toLocaleString("en-US", { month: "short" }), // Abbreviated month name (Jan, Feb, etc.)
			"%B": value.toLocaleString("en-US", { month: "long" }), // Full month name (January, February, etc.)
			"%p": value.getHours() < 12 ? "AM" : "PM", // AM/PM
			"%I": ("0" + (value.getHours() % 12 || 12)).slice(-2), // 12-hour clock (01-12)
			"%j": Math.floor(
				(value.getTime() - new Date(value.getFullYear(), 0, 0).getTime()) / 86400000
			).toString(), // Day of year (001-366)
			"%U": (
				"0" + Math.floor((value.getTime() - new Date(value.getFullYear(), 0, 1).getTime()) / 604800000)
			).slice(-2), // Week number (00-53)
			"%W": (
				"0" + Math.floor(((value.getTime() - new Date(value.getFullYear(), 0, 1).getTime()) / 604800000) - 1)
			).slice(-2) // Week number, starting on Monday (00-53)
		};
		return format.replace(/%[a-zA-Z]/g, (match) => replacements[match] || match);
	}
}

const datetime = new DateTime();

export default datetime;