import { window, workspace } from 'vscode';
import { Widget } from '../widget';
import Timer from './timer';

let interval: NodeJS.Timeout;

export default class TimerService {
  timer: Timer;
  hasStarted: boolean = false;
  isPaused: boolean = false;

  constructor() {
    this.timer = new Timer();
  }

  beginTimer() {
    this.timer.setTimeRemaining(this.getConfiguredTime());
    this.updateTimerValue(this.timer.getTimeRemaining());

    interval = setInterval(() => {
      if (!this.isPaused) {
        const timeRemaining = this.timer.getTimeRemaining();
        this.updateTimerValue(timeRemaining);
      }
    }, 1000);

    this.hasStarted = true;
    window.showInformationMessage('Your Flux Timer Has Started');
  }

  resetTimer() {
    clearInterval(interval);
    this.hasStarted = false;
  }

  private endTimer() {
    this.resetTimer();
    window.showInformationMessage('Time to Take a Break');
    Widget.Instance.statusBarItem.text = `$(watch) 00:00 - Click to Restart Flux Timer`;
  }

  private updateTimerValue(timeRemaining: any) {
    if (timeRemaining.total < 0) {
      this.endTimer();
    } else {
      Widget.Instance.statusBarItem.text = `$(watch) ${timeRemaining.minutes}:${timeRemaining.seconds}`;
    }
  }

  private getConfiguredTime(): number {
    const rhythm = workspace.getConfiguration('flux').get('rhythm');
    switch (rhythm) {
      case 'Pomodoro':
        return 25;
      case 'Desktime':
        return 52;
      case 'Ultradian':
        return 90;
      default:
        return 25;
    }
  }
}
