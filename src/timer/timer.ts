import { duration, Duration } from 'moment';

export default class Timer {
  duration: Duration;

  constructor() {
    this.duration = duration();
  }

  setTimeRemaining(minutes: number) {
    this.duration = duration(minutes, 'minutes');
  }

  getTimeRemaining() {
    const timeRemaining = {
      total: this.duration.asMilliseconds(),
      minutes: this.getMinutes(),
      seconds: this.getSeconds()
    };

    this.duration.subtract(1, 'second');

    return timeRemaining;
  }

  private getMinutes() {
    const minutes = this.duration.hours() * 60 + this.duration.minutes();
    return minutes.toString().padStart(2, '0');
  }

  private getSeconds() {
    return this.duration
      .seconds()
      .toString()
      .padStart(2, '0');
  }
}
