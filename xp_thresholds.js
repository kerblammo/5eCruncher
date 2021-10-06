class ThresholdByLevel {
  constructor(level, easy, medium, hard, deadly) {
    this.level = level;
    this.easy = easy;
    this.medium = medium;
    this.hard = hard;
    this.deadly = deadly;
  }
}

class XPThresholds {
  constructor() {
    this.levels = [
      new ThresholdByLevel(1, 25, 50, 75, 100),
      new ThresholdByLevel(2, 50, 100, 150, 200),
      new ThresholdByLevel(3, 75, 150, 225, 400),
      new ThresholdByLevel(4, 125, 250, 375, 500),
      new ThresholdByLevel(5, 250, 500, 750, 1100),
      new ThresholdByLevel(6, 300, 600, 900, 1400),
      new ThresholdByLevel(7, 350, 750, 1100, 1700),
      new ThresholdByLevel(8, 450, 900, 1400, 2100),
      new ThresholdByLevel(9, 550, 1100, 1600, 2400),
      new ThresholdByLevel(10, 600, 1200, 1900, 2800),
      new ThresholdByLevel(11, 800, 1600, 2400, 3600),
      new ThresholdByLevel(12, 1000, 2000, 3000, 4500),
      new ThresholdByLevel(13, 1100, 2200, 3400, 5100),
      new ThresholdByLevel(14, 1250, 2500, 3800, 5700),
      new ThresholdByLevel(15, 1400, 2800, 4300, 6400),
      new ThresholdByLevel(16, 1600, 3200, 4800, 7200),
      new ThresholdByLevel(17, 2000, 3900, 5900, 8800),
      new ThresholdByLevel(18, 2100, 4200, 6300, 9500),
      new ThresholdByLevel(19, 2400, 4900, 7300, 10900),
      new ThresholdByLevel(20, 2800, 5700, 8500, 12700),
    ];
  }

  getThresholdsForLevel(level) {
    return this.levels[level - 1];
  }
}

XP_THRESHOLDS = new XPThresholds();
console.log(XP_THRESHOLDS);
