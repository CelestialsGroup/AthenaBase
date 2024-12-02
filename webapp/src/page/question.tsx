import MonacoEditor from "@component/monaco-editor";
import ThemeToggle from "@component/theme-provider/theme-toggle";
import { DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { Button } from "@shadcn/component/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@shadcn/component/ui/resizable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/component/ui/select";
import { Separator } from "@shadcn/component/ui/separator";
import React from "react";

const Page: React.FC = () => {
	const [showEditor, setShowEditor] = React.useState<boolean>(true);
	return <div className="w-screen h-screen flex flex-col">
		<div className="w-full p-2 pt-6 flex justify-between items-center">
			<div>AthenaBase</div>
			<div>
				<ThemeToggle />
			</div>
		</div>
		<div className="flex-1 flex flex-col p-2">
			<div className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
				<div>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Database" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Postgres</SelectItem>
							<SelectItem value="2">MySQL</SelectItem>
							<SelectItem value="3">MySQl-TiDB</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Button variant="ghost" size="icon" onClick={() => setShowEditor(se => !se)}>
						{showEditor ? <DrawingPinFilledIcon /> : <DrawingPinIcon />}
					</Button>
				</div>
			</div>
			<Separator className="my-1" />
			<ResizablePanelGroup direction="vertical" className="flex-1">
				<ResizablePanel minSize={25} className={!showEditor ? "hidden" : ""}>
					<MonacoEditor
						className="w-full h-full border rounded-lg overflow-hidden"
						language="sql"
						value="select * from auth_user"
						theme="dark"
					/>
				</ResizablePanel>
				<ResizableHandle withHandle className={!showEditor ? "hidden" : ""} />
				<ResizablePanel minSize={25} className="flex justify-center items-center">
					您的结果将显示在此处
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	</div>;
};

export default Page;