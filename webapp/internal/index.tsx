type Mode = "development" | "production"

const getMode = (): Mode => import.meta.env.MODE as Mode;

export default {
	getMode
};