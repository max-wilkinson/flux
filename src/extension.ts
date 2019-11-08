import * as vscode from 'vscode';

const statusBarCommandId = 'extension.beginFluxTimer';
let statusBarItem: vscode.StatusBarItem;
let interval: NodeJS.Timeout;
let isPaused: boolean = false;
let hasStarted: boolean = false;
let fluxMinutes = 25;
let deadline: Date;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "flux" is now active!');

  let command = vscode.commands.registerCommand(statusBarCommandId, () => {
    if (hasStarted) {
      return;
    }

    deadline = new Date(new Date().getTime() + fluxMinutes * 60000);
    updateTimerValue();

    interval = setInterval(() => {
      if (!isPaused) {
        updateTimerValue();
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

function updateTimerValue() {
  const timeRemaining = getTimeRemaining(deadline);

  if (timeRemaining.total < 0) {
    clearInterval(interval);
    hasStarted = false;
    vscode.window.showInformationMessage('Time to take a break');
  } else {
    statusBarItem.text = `$(watch) ${timeRemaining.minutes}:${timeRemaining.seconds}`;
  }
}

function getTimeRemaining(endTime: any) {
  let t = Date.parse(endTime) - Date.parse(new Date().toString());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);

  return {
    total: t,
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  };
}

export function deactivate() {}
