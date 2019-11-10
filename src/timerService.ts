import { window } from 'vscode';
import { Widget } from './widget';
import Timer from './timer';

const fluxMinutes: number = 1;
let interval: NodeJS.Timeout;

export default class TimerService {
  timer: Timer;
  hasStarted: boolean = false;
  isPaused: boolean = false;

  constructor() {
    this.timer = new Timer();
  }

  beginTimer() {
    this.timer.setTimeRemaining(fluxMinutes);
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

  private endTimer() {
    clearInterval(interval);
    this.hasStarted = false;
    window.showInformationMessage('Time to Take a Break');
  }

  updateTimerValue(timeRemaining: any) {
    if (timeRemaining.total < 0) {
      this.endTimer();
    } else {
      Widget.Instance.statusBarItem.text = `$(watch) ${timeRemaining.minutes}:${timeRemaining.seconds}`;
    }
  }
}
