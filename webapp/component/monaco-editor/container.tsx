import React from "react";

interface MonacoContainerProps {
	className?: string
	style?: React.CSSProperties
	onResize?: () => void;
}

const MonacoContainer = React.forwardRef<
	HTMLDivElement, MonacoContainerProps
>(({ className, style, onResize }, ref) => {
	const local = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const element = ref ? (ref as React.RefObject<HTMLDivElement>).current : local.current;
		if (!element || !onResize) { return; }
		const resizeObserver = new ResizeObserver(() => { onResize(); });
		resizeObserver.observe(element);
		return () => resizeObserver.disconnect();
	}, [ref, onResize]);

	React.useEffect(() => {
		const windowResize = () => { onResize?.(); };
		window.addEventListener("resize", windowResize);
		windowResize();
		return () => window.removeEventListener("resize", windowResize);
	}, [onResize]);

	return <div ref={ref || local} style={{ ...style }} className={className || ""}></div>;
});

export default MonacoContainer;