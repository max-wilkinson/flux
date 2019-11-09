export class Timer {
  endTime: Date;

  constructor(minutes: number) {
    this.endTime = new Date(new Date().getTime() + minutes * 60000);
  }

  getTimeRemaining() {
    let t = this.endTime.getTime() - new Date().getTime();
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);

    return {
      total: t,
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }
}
