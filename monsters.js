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
            //todo: cases 6 - 20+
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