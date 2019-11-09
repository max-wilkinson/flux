import * as vscode from 'vscode';
import { Timer } from './timer';

const statusBarCommandId = 'extension.beginFluxTimer';
let statusBarItem: vscode.StatusBarItem;
let interval: NodeJS.Timeout;
let isPaused: boolean = false;
let hasStarted: boolean = false;
let fluxMinutes = 1;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "flux" is now active!');

  let command = vscode.commands.registerCommand(statusBarCommandId, () => {
    if (hasStarted) {
      return;
    }

    const timer = new Timer(fluxMinutes);
    const timeRemaining = timer.getTimeRemaining();
    updateTimerValue(timeRemaining);

    interval = setInterval(() => {
      if (!isPaused) {
        const timeRemaining = timer.getTimeRemaining();
        updateTimerValue(timeRemaining);
      }
    }, 1000);

    hasStarted = true;
    vscode.window.showInformationMessage('Your Flux Timer Has Started');
  });

  context.subscriptions.push(command);

  vscode.commands.registerCommand('extension.flux', () => {
    initializeStatusBarItem();
    context.subscriptions.push(statusBarItem);
  });
}

function initializeStatusBarItem() {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1
  );
  statusBarItem.text = `$(watch) Click to Start Flux Timer`;
  statusBarItem.command = statusBarCommandId;
  statusBarItem.show();
}

function updateTimerValue(timeRemaining: any) {
  if (timeRemaining.total < 0) {
    clearInterval(interval);
    hasStarted = false;
    vscode.window.showInformationMessage('Time to Take a Break');
  } else {
    statusBarItem.text = `$(watch) ${timeRemaining.minutes}:${timeRemaining.seconds}`;
  }
}

export function deactivate() {}
