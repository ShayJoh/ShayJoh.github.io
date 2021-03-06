function getRandomInt(min, max) {      
  // Create byte array and fill with 1 random number
  var byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);

  var range = max - min + 1;
  var max_range = 256;
  if (byteArray[0] >= Math.floor(max_range / range) * range)
      return getRandomInt(min, max);
  return min + (byteArray[0] % range);
}

let health = document.getElementById('health');
health.max = getRandomInt(50,150);
health.value = health.max;

let score = 0

let damage = document.getElementById('damage');
damage.innerHTML = "Smash that goblin!!";

list = ['./assets/damage1.png','./assets/damage2.png','./assets/damage3.png','./assets/damage4.png','./assets/damage5.png','./assets/damage6.jpg','./assets/damage7.png','./assets/damage8.png','./assets/damage9.png','./assets/damage10.png','./assets/damage11.png']

//Function to animate dice roll
function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);
  let timer = setInterval(function() {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
        clearInterval(timer);
    }
  }, stepTime);
}



/*
const dice = {
  sides: 20,
  roll: function () {
    const randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

let defHealth = {
  sides: 100,
  roll: function () {
    const randomNumber = Math.floor(Math.random() * this.sides) + 51;
    return randomNumber;
  }
}
*/

 //Prints dice roll to the page
function printNumber(number) {
  animateValue("placeholder", 0, number, 300);
}

function changeImage(imgName) {
  image = document.getElementById('goblinimage')
  image.src = imgName;
}

let button = document.getElementById('button');

button.onclick = function() {
  let result = getRandomInt(1,20);
  health.value -= result; //update Health with damage caused
  indexImage = Math.floor(Math.random() * list.length); //determine indexes and supply 1 random image index
  changeImage(list[indexImage]); //replaces the Goblin image with the random image
  button.disabled = true;
  const playAgain = document.getElementById('playAgain');
  playAgain.style.display = "none";

  //Update health, and change the goblin image back
  if (health.value >= 1) {
    log.innerHTML = "HP: " + health.value;
    damage.innerHTML = "You strike for " + result + " damage!"; //declare damage
    printNumber(result);
    setTimeout(function(){
      button.disabled = false;
      changeImage('./assets/goblin-appear.jpg')
    },300); // Damage image is replaced by Goblin image after a specified time
  } else if (health.value <= 0){ //Goblin HP has been reduced to 0.
    health.value = 0; //force health to display as 0 to avoid negative integers being displayed (such as having 2 HP, and then being hit for 18 damage)
    log.innerHTML = "IT IS DEAD";
    placeholder.innerHTML = "";
    damage.innerHTML = result + " DAMAGE! The Goblin is DESTROYED!";
    changeImage("./assets/goblin-dead.png"); //replace image with a gravestone
    playAgain.disabled = false;
    playAgain.style.display = 'block';
    console.log('game end')
    score += 1
    playerScore.innerHTML = "Goblins Defeated: " + score
  }
};

playAgain.onclick = function() {
  changeImage('./assets/goblin-appear.jpg');
  health.max = getRandomInt(50, 300);
  health.value = health.max;
  log.innerHTML = " ";
  damage.innerHTML = "A NEW CHALLENGER ARISES!";
  button.disabled = false;
  playAgain.disabled = true;
};

