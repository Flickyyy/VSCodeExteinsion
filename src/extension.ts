import { randomInt } from 'crypto';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "iwilldoittomorrow" is now active!');

	let jokes: string[] = ["глухой слышал, как", "немой расказывал, что", "слепой увидел, как", "хромой быстро-быстро бежал",
					"Штирлиц стрелял вслепую. Слепая испугалась и побежала скачками, но качки быстро отстали",
					"Штирлиц всю ночь топил камин. На утро камин утонул",
					"Штирлиц стоял над картой мира. Его неудержимо рвало на родину",
					"Штирлиц долго смотрел в одну точку. Потом в другую. \"Двоеточие!\" - наконец-то смекнул Штирлиц"];
	let disposable = vscode.commands.registerCommand('iwilldoittomorrow.getajoke', () => {
		vscode.window.showInformationMessage(jokes[randomInt(0, jokes.length)]);
	});
	//something like a return value
	context.subscriptions.push(disposable);

	//Anyway i cac do like:
	//context.subscriptions.push(
	//	vscode.commands.registerCommand("CommandName", function)
	//);

	let todo: string[] = [
		
	];

	context.subscriptions.push(
		vscode.commands.registerCommand("iwilldoittomorrow.addtodo", async () => {
			// Get the active text editor
			const editor = vscode.window.activeTextEditor;
			//let document = editor.document;
			//const documentText = document.getText();

			let todo_query = await vscode.window.showInputBox({
				placeHolder: "Todo query",
				prompt: "Write a name of your task and some info about that",
				value: 'Task #'
			});
			if (editor) {
				todo_query += ' [line: ' + String(editor.selection.active.line) + ' file:' + editor.document.fileName + ']';
			}

			if(todo_query === ''){
				console.log(todo_query);
				vscode.window.showErrorMessage('A todo_query is mandatory to execute this action');
			}
			
			if(todo_query !== undefined){
				todo.push(todo_query);
				console.log('todo list: ', todo);
			}
			
		})
	);


	
	context.subscriptions.push(
		vscode.commands.registerCommand('iwilldoittomorrow.donetodo', async () => {
			const task = await vscode.window.showQuickPick(todo);
			if (task !== undefined) {
				//Check if user really want to delete a task
				const response = await vscode.window.showInformationMessage("Are you sure you have done this task? ^_^", "YES", "NO");
				if (response !== undefined && response === 'YES') {
					console.log(task, "have been done");
					const index = todo.indexOf(task, 0);
					if (index > -1) {
						todo.splice(index, 1);
					}
				}
			}
		})
	);
	
}


export function deactivate() {}
