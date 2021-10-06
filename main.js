window.onload = () => {
    let addRowButtons = document.querySelectorAll(".add-row");
    for (let button of addRowButtons){
        button.addEventListener("click", addRowClickHandler);
    }

}

function findParentWithClass(childElement, className) {
    let count = 0;
    let parentElement = childElement;
    while (!parentElement.classList.contains(className)) {
        count++;
        if (count > 100){
            return null;
        } 
        parentElement = parentElement.parentElement;
        
    }

    return parentElement;
}

function addRowClickHandler(e) {
    let parentTable = findParentWithClass(e.target, "container");
    buildRow(parentTable);
    updateXPThresholdsAndValues()
}

function buildRow(table){
    let row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `<div class="entity">
    <div class="inline-button decrease-actors">&lt;</div> <div class="actors"> 1 </div><div class="inline-button increase-actors">&gt;</div>
</div>
<div class="entity">
    <div class="inline-button decrease-level">&lt;</div> <div class="level"> 1 </div><div class="inline-button increase-level">&gt;</div>
</div>
<div class="entity">
    <div class="remove-row inline-button"> X </div>
</div>`
    table.children[table.children.length - 1].insertAdjacentElement("beforebegin", row);
    row.querySelector(".remove-row").addEventListener("click", removeRowClickHandler);

    row.querySelector(".decrease-actors").addEventListener("click", decreaseActorClickHandler);
    row.querySelector(".increase-actors").addEventListener("click", increaseActorClickHandler);
    row.querySelector(".decrease-level").addEventListener("click", decreaseLevelClickHandler);
    row.querySelector(".increase-level").addEventListener("click", increaseLevelClickHandler);

    

}

function removeRowClickHandler(e){
    let row = findParentWithClass(e.target, "row");
    row.parentElement.removeChild(row);
    updateXPThresholdsAndValues()

}

function decreaseActorClickHandler(e) {
    let entity = findParentWithClass(e.target, "entity");
    let actors = entity.querySelector(".actors");
    let numOfActors = parseInt(actors.innerHTML, 10);
    
    numOfActors--;
    if (numOfActors <= 0) {
        console.log("Cannot decrease count below 1");
        numOfActors = 1;
    }

    actors.innerHTML = numOfActors;
    updateXPThresholdsAndValues();
}

function increaseActorClickHandler(e) {
    let entity = findParentWithClass(e.target, "entity");
    let actors = entity.querySelector(".actors");
    let numOfActors = parseInt(actors.innerHTML, 10);
    
    numOfActors++;

    actors.innerHTML = numOfActors;
    updateXPThresholdsAndValues();
    
}

function decreaseLevelClickHandler(e) {
    let entity = findParentWithClass(e.target, "entity");
    let level = entity.querySelector(".level");
    let levelValue = level.innerHTML;
    
    let container = findParentWithClass(e.target, "container");
    if (container.classList.contains("monster")) {
        if (levelValue == 1) {
            levelValue = "1/2";
        } else if (levelValue.includes("/")) {
            switch (levelValue) {
                case "1/2":
                    levelValue = "1/4";
                    break;
                case "1/4":
                    levelValue = "1/8";
                    break;
                case "1/8":
                    levelValue = 0;
                    break;
            }
        } else {
            levelValue = parseInt(level.innerHTML, 10);
            levelValue--;
            if (levelValue < 0) {
                console.log("Cannot decrease level below challenge 0")
                levelValue = 0;
            }
        }
    } else {
        // party behaves differently
        levelValue = parseInt(level.innerHTML, 10)
        levelValue--;
        if (levelValue <= 0) {
            console.log("Cannot decrease level below 1");
            levelValue = 1;
        }
    }
    

    level.innerHTML = levelValue;
    updateXPThresholdsAndValues();
}

function increaseLevelClickHandler(e) {
    let entity = findParentWithClass(e.target, "entity");
    let level = entity.querySelector(".level");
    let levelValue = parseInt(level.innerHTML, 10);
    
    levelValue++;

    let container = findParentWithClass(e.target, "container");
    if (container.classList.contains("party")){
        if (levelValue >= 20) {
            console.log("Cannot increase level above 20");
            console.log("Does not currently support epic levels.")
            levelValue = 20;
        }
    }  else {
        if (levelValue >= 30) {
            console.log("Cannot increase challenge above 30");
            levelValue = 30;
        }
    }

    level.innerHTML = levelValue;
    updateXPThresholdsAndValues()
}

function updateXPThresholdsAndValues() {
    // thresholds
    let thresholds = updateXPThresholds();

    // monster xp and difficulty
    let xp = calculateMonsterXP();
    updateMonsterDifficulty(xp, thresholds);
    document.querySelector("#xp-reward").innerHTML = `XP Reward: ${xp}xp`
}

function updateMonsterDifficulty(xp, thresholds) {
    let partyMembers = document.querySelectorAll(".party .actors");
    let partyMemberCount = 0;
    for (let partyMember of partyMembers) {
        partyMemberCount += parseInt(partyMember.innerHTML, 10);
    }

    let monsters = document.querySelectorAll(".monster .actors");
    let monsterCount = 0;
    for (let monster of monsters) {
        monsterCount += parseInt(monster.innerHTML, 10);
    }

    let multiplier = MONSTERS.getDifficultyMultiplier(partyMemberCount, monsterCount);
    let difficultyValue = xp * multiplier;

    let difficulty;
    if (difficultyValue < thresholds["easy"]) {
        difficulty = "Trivial";
    } else if (difficultyValue < thresholds["medium"]) {
        difficulty = "Easy";
    } else if (difficultyValue < thresholds["hard"]) {
        difficulty = "Medium";
    } else if (difficultyValue < thresholds["deadly"]){
        difficulty = "Hard";
    } else {
        difficulty = "Deadly";
    }

    let difficultyString = `Difficulty: ${difficulty} (${difficultyValue}xp)`;
    document.querySelector("#difficulty-rating").innerHTML =  difficultyString;


}

function updateXPThresholds() {
    let easy = document.querySelector("#easy");
    let medium = document.querySelector("#medium");
    let hard = document.querySelector("#hard");
    let deadly = document.querySelector("#deadly");

    let easyValue = 0;
    let mediumValue = 0;
    let hardValue = 0;
    let deadlyValue = 0;

    let rows = document.querySelectorAll(".party .row");
    for (let i = 1; i < rows.length - 1; i++) {
        // skip the first and last rows because they don't have data
        let row = rows[i]
        let actors = parseInt(row.querySelector(".actors").innerHTML, 10);
        for (let j = 0; j < actors; j++) {
            let level = parseInt(row.querySelector(".level").innerHTML, 10);
            let thresholdsForLevel = XP_THRESHOLDS.getThresholdsForLevel(level);
            easyValue += thresholdsForLevel.easy;
            mediumValue += thresholdsForLevel.medium;
            hardValue += thresholdsForLevel.hard;
            deadlyValue += thresholdsForLevel.deadly;
        }
    }

    easy.innerHTML = `Easy: ${easyValue}xp`;
    medium.innerHTML = `Medium: ${mediumValue}xp`;
    hard.innerHTML = `Hard: ${hardValue}xp`;
    deadly.innerHTML = `Deadly: ${deadlyValue}xp`;

    let thresholds = {
        "easy": easyValue,
        "medium": mediumValue,
        "hard": hardValue,
        "deadly": deadlyValue
    };
    return thresholds;
}


function calculateMonsterXP() {
    let xp = 0;
    let rows = document.querySelectorAll(".monster .row");
    for (let i = 1; i < rows.length - 1; i++) {
        // skip the first and last rows because they don't have data
        let row = rows[i]
        let actors = parseInt(row.querySelector(".actors").innerHTML, 10);
        for (let j = 0; j < actors; j++) {
            let level = row.querySelector(".level").innerHTML;
            xp += MONSTERS.getXPForChallengeRating(level);
        }
    }

    return xp;
}

