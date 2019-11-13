import Timer from '../../timer/timer';

describe('Timer', () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });

  it('should have a default duration of 0', () => {
    expect(timer.duration.asMilliseconds()).toEqual(0);
  });

  describe('setTimeRemaining', () => {
    it('should update the duration', () => {
      timer.setTimeRemaining(3);
      expect(timer.duration.asMilliseconds()).toEqual(180000);
    });
  });

  describe('getTimeRemaining', () => {
    it('should get the total time as milliseconds', () => {
      timer.setTimeRemaining(7);
      expect(timer.getTimeRemaining().total).toEqual(420000);
    });

    it('should get the minutes as padded string', () => {
      timer.setTimeRemaining(7);
      expect(timer.getTimeRemaining().minutes).toEqual('07');
    });

    it('should get the seconds as padded string', () => {
      timer.setTimeRemaining(7);
      expect(timer.getTimeRemaining().seconds).toEqual('00');
    });

    it('should subtract a second', () => {
      timer.setTimeRemaining(7);
      timer.getTimeRemaining();
      const updatedTime = timer.getTimeRemaining();
      expect(updatedTime.minutes).toEqual('06');
      expect(updatedTime.seconds).toEqual('59');
    });
  });
});
