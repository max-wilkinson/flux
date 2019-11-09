import * as vscode from 'vscode';

export const StatusBarCommandId = 'extension.beginFluxTimer';

export class Widget {
  private static instance: Widget;

  statusBarItem: vscode.StatusBarItem;

  private constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      1
    );
    this.statusBarItem.text = `$(watch) Click to Start Flux Timer`;
    this.statusBarItem.command = StatusBarCommandId;
    this.statusBarItem.show();
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }
}
