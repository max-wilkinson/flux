import { ExtensionContext, commands } from 'vscode';
import TimerService from './timer/timerService';
import { Widget, StatusBarCommandId } from './widget';

let timerService = new TimerService();

export function activate(context: ExtensionContext) {
  console.log('Congratulations, your extension "flux" is now active!');

  let command = commands.registerCommand(StatusBarCommandId, () => {
    if (timerService.hasStarted) {
      timerService.isPaused = !timerService.isPaused;
    } else {
      timerService.beginTimer();
    }
  });

  context.subscriptions.push(command);

  commands.registerCommand('extension.flux', () => {
    context.subscriptions.push(Widget.Instance.statusBarItem);
  });

  commands.registerCommand('extension.resetFlux', () => {
    timerService.resetTimer();
    Widget.Instance.statusBarItem.text = `$(watch) Click to Start Flux Timer`;
  });
}

export function deactivate() {}
