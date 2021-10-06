class MonsterXPValues {
  getXPForChallengeRating(challenge) {
    let xp = 0;
    switch (challenge) {
      case "0":
        xp = 10;
        break;
      case "1/8":
        xp = 25;
        break;
      case "1/4":
        xp = 50;
        break;
      case "1/2":
        xp = 100;
        break;
      case "1":
        xp = 200;
        break;
      case "2":
        xp = 450;
        break;
      case "3":
        xp = 700;
        break;
      case "4":
        xp = 1100;
        break;
      case "5":
        xp = 1800;
        break;
      case "6":
        xp = 2300;
        break;
      case "7":
        xp = 2900;
        break;
      case "8":
        xp = 3900;
        break;
      case "9":
        xp = 5000;
        break;
      case "10":
        xp = 5900;
        break;
      case "11":
        xp = 7200;
        break;
      case "12":
        xp = 8400;
        break;
      case "13":
        xp = 10000;
        break;
      case "14":
        xp = 11500;
        break;
      case "15":
        xp = 13000;
        break;
      case "16":
        xp = 15000;
        break;
      case "17":
        xp = 1800;
        break;
      case "18":
        xp = 20000;
        break;
      case "19":
        xp = 22000;
        break;
      case "20":
        xp = 25000;
        break;
      case "21":
        xp = 33000;
        break;
      case "22":
        xp = 41000;
        break;
      case "23":
        xp = 50000;
        break;
      case "24":
        xp = 62000;
        break;
      case "25":
        xp = 75000;
        break;
      case "26":
        xp = 90000;
        break;
      case "27":
        xp = 105000;
        break;
      case "28":
        xp = 120000;
        break;
      case "29":
        xp = 135000;
        break;
      case "30":
        xp = 155000;
        break;
    }
    return xp;
  }

  getDifficultyMultiplier(numOfParty, numOfMonsters) {
    let multipliers = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
    let index;
    if (numOfMonsters == 1) {
      index = 1;
    } else if (numOfMonsters == 2) {
      index = 2;
    } else if (numOfMonsters >= 3 && numOfMonsters <= 6) {
      index = 3;
    } else if (numOfMonsters >= 7 && numOfMonsters <= 10) {
      index = 4;
    } else if (numOfMonsters >= 11 && numOfMonsters <= 14) {
      index = 5;
    } else {
      index = 6;
    }

    if (numOfParty < 3) {
      index++;
    } else if (numOfParty > 5) {
      index--;
    }

    return multipliers[index];
  }
}

let MONSTERS = new MonsterXPValues();
