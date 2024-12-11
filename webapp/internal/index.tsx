type Mode = "development" | "production"

export default {
	Mode: import.meta.env.MODE as Mode,
	Name: "AthenaBase",
	Version: "v0.0.0",
};