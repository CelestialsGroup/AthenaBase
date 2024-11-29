/* eslint-disable react-hooks/exhaustive-deps */
import MonacoContainer from "@component/monaco-editor/container";
import React from "react";

type Theme = "dark" | "light";
import type { editor } from "monaco-editor";

interface MonacoEditorProps {
	className?: string;
	style?: React.CSSProperties;
	language: string;
	value: string;
	theme?: Theme;
	readOnly?: boolean;
	onValueChange?: (value: string) => void;
	onSelectedValueChange?: (value: string) => void;
	onMount?: (monaco: typeof import("monaco-editor"), editor: editor.IStandaloneCodeEditor) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
	const container = React.useRef<HTMLDivElement>(null);

	const [monaco, setMonaco] = React.useState<typeof import("monaco-editor") | null>(null);
	const [editor, setEditor] = React.useState<editor.IStandaloneCodeEditor | null>(null);
	const beforeMountRef = React.useRef<(monaco: typeof import("monaco-editor")) => void | null>(null);

	// Load Monaco
	React.useEffect(() => {
		const load = async () => {
			if (typeof MonacoEnvironment == "undefined") { await import("./worker"); }
			import("monaco-editor").then(
				(monaco_editor_api) => {
					beforeMountRef.current?.(monaco_editor_api);
					setMonaco(monaco_editor_api);
				}
			).catch(
				(error) => console.error("Monaco initialization: error:", error)
			);
		};
		load();
		return () => { };
	}, []);

	// Create Editor
	React.useEffect(() => {
		if (!container.current || !monaco || editor) { return; }
		const monacoEditor = monaco.editor.create(
			container.current,
			{
				language: props.language,
				value: props.value,
				theme: `vs-${props.theme || "dark"}`,
				readOnly: props.readOnly || false
			},
		);
		setEditor(monacoEditor);
		return () => { monacoEditor.dispose(); setEditor(null); };
	}, [monaco, container.current]);

	// Mount
	React.useEffect(() => {
		if (!props.onMount || !monaco || !editor) { return; }
		props.onMount(monaco, editor);
		return () => { };
	}, [monaco, editor]);

	// Value Change
	React.useEffect(() => {
		if (!editor) return;
		const value = editor.getValue();
		if (value === props.value) return;
		editor.setValue(props.value);
		return () => { };
	}, [editor, props.value]);

	// Language Change
	React.useEffect(() => {
		if (!editor || !monaco) return;

		const model = editor.getModel();
		if (!model) return;
		const language = model.getLanguageId();
		if (language === props.language) return;
		monaco.editor.setModelLanguage(model, props.language);

		return () => { };
	}, [editor, monaco, props.language]);

	// Theme Change
	React.useEffect(() => {
		if (!monaco) return;
		monaco.editor.setTheme(`vs-${props.theme || "dark"}`);
		return () => { };
	}, [monaco, props.theme]);

	// Model Content Change
	React.useEffect(() => {
		if (!editor) return;

		const subscription = editor.onDidChangeModelContent(() => {
			const value = editor.getValue();
			props.onValueChange?.(value);
		});

		return () => subscription.dispose();
	}, [editor, props.onValueChange]);

	// Cursor Selection Change
	React.useEffect(() => {
		if (!editor) return;

		const subscription = editor.onDidChangeCursorSelection(({ selection }) => {
			const value = editor.getModel()?.getValueInRange(selection) || "";
			props.onSelectedValueChange?.(value);
		});

		return () => subscription.dispose();
	}, [editor, props.onSelectedValueChange]);

	return <MonacoContainer
		style={{ ...props.style }}
		className={props.className || ""}
		ref={container}
		onResize={() => editor?.layout()}
	/>;
};

export default MonacoEditor;