import * as vscode from 'vscode';
import TimerService from './timerService';
import { Widget, StatusBarCommandId } from './widget';

let timerService = new TimerService();

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "flux" is now active!');

  let command = vscode.commands.registerCommand(StatusBarCommandId, () => {
    if (timerService.hasStarted) {
      timerService.isPaused = !timerService.isPaused;
    } else {
      timerService.beginTimer();
    }
  });

  context.subscriptions.push(command);

  vscode.commands.registerCommand('extension.flux', () => {
    context.subscriptions.push(Widget.Instance.statusBarItem);
  });
}

export function deactivate() {}
