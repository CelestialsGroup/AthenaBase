import MonacoEditor from "@component/monaco-editor";
import { useTheme } from "@component/theme-provider";
import ThemeToggle from "@component/theme-provider/theme-toggle";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@shadcn/component/ui/resizable";
import React from "react";

const Page: React.FC = () => {
	const { theme } = useTheme();
	return <div className="w-screen h-screen flex flex-col">
		<div className="w-full p-6 flex justify-between items-center">
			<div>AthenaBase</div>
			<div>
				<ThemeToggle />
			</div>
		</div>
		<div className="flex-1">
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel minSize={25}>
					<MonacoEditor
						className="w-full h-full"
						language="sql"
						value="select * from auth_user"
						theme={theme}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel minSize={25}>
					<div className="w-full h-full flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
						您的结果将显示在此处
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	</div>;
};

export default Page;