import * as moment from 'moment';

export class Timer {
  duration: moment.Duration;

  constructor(minutes: number) {
    this.duration = moment.duration(minutes, 'minutes');
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
