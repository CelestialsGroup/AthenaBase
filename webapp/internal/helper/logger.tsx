import datetime from "@internal/helper/datetime";
import internal from "@internal/index";

type Level = "debug" | "verbose" | "info" | "none"
export const LEVEL: Record<Level, number> = {
	debug: 1,
	verbose: 2,
	info: 3,
	none: 10
};
const COLOR_DEBUG = "#44b549";
const COLOR_INFO = "#009";

const lognull = () => { };

class Logger {
	private level: number = internal.Mode === "development" ? 1 : 3;
	private loggers = {
		debug: console.log.bind(console, "%c[debug]", `color: ${COLOR_DEBUG}`, datetime.strftime(new Date())),
		info: console.log.bind(console, "%c[info]", `color: ${COLOR_INFO}`, datetime.strftime(new Date())),
	};

	/**
	 * setLevel
	 */
	public setLevel(level: Level) { this.level = LEVEL[level]; }

	/**
	 * getLevel
	 */
	public getLevel(): Level {
		const reverseLevel = Object.entries(LEVEL).reduce(
			(acc, [key, value]) => {
				acc[value] = key as Level;
				return acc;
			}, {} as Record<number, Level>
		);
		return reverseLevel[this.level];
	}

	/**
	 * debug
	 */
	public get debug() {
		if (this.level > LEVEL.debug) return lognull;
		return this.loggers.debug;
	}

	/**
	 * info
	 */
	public get info() {
		if (this.level > LEVEL.info) return lognull;
		return this.loggers.info;
	}
}

const logger = new Logger();

export default logger;