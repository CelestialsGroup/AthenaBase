import MonacoEditor from "@component/monaco-editor";
import notice from "@component/notice";
import api from "@internal/api";
import { editor } from "monaco-editor";
import React from "react";

interface QueryEditorProps {
	database: DataBase
	value: string
	onValueChange?: (value: string) => void
	onSelectedValueChange?: (value: string) => void
}

const QueryEditor: React.FC<QueryEditorProps> = (props) => {
	const [monaco, setMonaco] = React.useState<typeof import("monaco-editor") | null>(null);
	const [editor, setEditor] = React.useState<editor.IStandaloneCodeEditor | null>(null);

	const [tables, setTables] = React.useState<string[]>([]);

	React.useEffect(() => {
		api.database.table(props.database.id).then(resp => {
			setTables(resp.data.map(table => table.name));
		}).catch(
			reason => notice.toast.error(`${reason}`)
		);
	}, [props.database.id]);

	React.useEffect(() => {
		if (tables.length === 0 || !monaco || !editor) return;
		monaco.languages.registerCompletionItemProvider("sql", {
			provideCompletionItems: function (model, position) {
				const word = model.getWordUntilPosition(position);
				const suggestions = tables
					.filter(table => table.indexOf(word.word) >= 0)
					.map(table => ({
						label: table,
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: table,
						range: {
							startLineNumber: position.lineNumber,
							startColumn: word.startColumn,
							endLineNumber: position.lineNumber,
							endColumn: position.column
						}
					}));
				return { suggestions: suggestions };
			}
		});
	}, [tables, monaco, editor]);

	return <MonacoEditor
		className="flex-1 overflow-auto scrollbar-none h-full border rounded-lg"
		theme="dark" language="sql"
		value={props.value}
		onValueChange={(value) => props.onValueChange?.(value)}
		onSelectedValueChange={(value) => props.onSelectedValueChange?.(value)}
		onMount={(monaco, editor) => {
			setMonaco(monaco); setEditor(editor);
		}}
	/>;
};

export default QueryEditor;