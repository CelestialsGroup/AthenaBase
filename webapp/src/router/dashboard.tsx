import React from "react";

const Page: React.FC = () => {
	return <React.Fragment>
		<svg xmlns="http://www.w3.org/2000/svg" className="hidden">
			<symbol id="grid" viewBox="0 0 1152 48">
				{
					Array.from({ length: 24 }, (_, index) => index).map((idx) => <rect
						key={idx} strokeWidth="1" fill="none" rx="4" ry="4" style={{ stroke: "hsl(var(--muted))" }} className="bg-muted"
						x={(48 * idx + 3)} y="3" width="40" height="40"
					/>)
				}
			</symbol>
		</svg>
		<div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-muted/90 scrollbar-track-background/10">
			<svg width="1152" height="48">
				<use xlinkHref="#grid"></use>
			</svg>
		</div>
	</React.Fragment>;
};

export default Page;