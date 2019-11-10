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
      minutes: this.duration
        .minutes()
        .toString()
        .padStart(2, '0'),
      seconds: this.duration
        .seconds()
        .toString()
        .padStart(2, '0')
    };

    this.duration.subtract(1, 'second');

    return timeRemaining;
  }
}
