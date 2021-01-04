
    class AudioController {
    constructor() {
        this.bgSounds = new Audio('assets/Audio/bgMusic.mp3');
        this.flipSounds = new Audio('assets/Audio/flipCardSound.mp3');
        this.matchSounds = new Audio('assets/Audio/matchedSound.mp3');
        this.victorySounds = new Audio('assets/Audio/victorySound.mp3');
        this.gameOverSounds = new Audio('assets/Audio/gameOverSound.mp3');
        this.bgSounds.volume = 0.5;
        this.bgSounds.loop = true;
    }

     startMusic() {
        this.victorySounds.pause();
        this.gameOverSounds.pause();
        this.bgSounds.play();
    }
    stopMusic() {
        this.matchSounds.pause();
        this.bgSounds.pause();
         this.victorySounds.pause();
         this.victorySounds.currentTime = 0;
        this.bgSounds.currentTime = 0;
    }
    flip() {
        this.flipSounds.play();
        this.matchSounds.pause();
    }
    match() {
        this.matchSounds.play();
    }
    victory() {
        this.stopMusic();
        this.victorySounds.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSounds.play();
    }
    
    
}


class MixOrMatch {

    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
  
 startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;  
     }


     startCountdown() {

        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

   gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }


    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

     hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }


    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

  checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }


    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }

     getCardType(card) {
        return card.getElementsByClassName('win-match')[0].src;
    }

     canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

    
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
      //   let audioController = new AudioController();
          audioController.startMusic();
        });
    });

    cards.forEach(card => {card.addEventListener('click', () => {
          game.flipCard(card);
    });
 }); 
}

/* 
window.addEventListener("play", function(evt)
{
    if(window.$_currentlyPlaying)
    {
        window.$_currentlyPlaying.pause();
    } 
    window.$_currentlyPlaying = evt.target;
}, true);
 */

/*  var previuosAudio;
document.addEventListener('play', function(e){
    if(previousAudio && previousAudio != e.target){
        previousAudio.pause();
    }
    previousAudio = e.target;
    console.log(play);
}, true);
 */

 