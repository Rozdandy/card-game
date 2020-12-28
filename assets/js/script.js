/* class AudioController {

    constructor() {
        this.bgSounds = document.getElementById('bgMusic');
		this.flipSounds = document.getElementById('flipSound');
        this.matchSounds = document.getElementById('matchSound');
        this.unmatchSounds = document.getElementById('unmatchedSound');
		this.victorySounds = document.getElementById('victorySound');
        this.gameOverSounds = document.getElementById('gameOverSound');
        this.bgSounds.volume = 0.5;
        this.bgSounds.loop = true;
    }
 */
    class AudioController {
    constructor() {
        this.bgSounds = new Audio('assets/audio/bgMusic.mp3');
        this.flipSounds = new Audio('assets/audio/flipCardSound.mp3');
        this.matchSounds = new Audio('assets/audio/matchedSound.mp3');
        this.victorySounds = new Audio('Assets/Audio/assets/audio/victorySound.mp3');
        this.gameOverSounds = new Audio('Assets/Audio/assets/audio/gameOverSound.mp3');
        this.bgSounds.volume = 0.5;
        this.bgSounds.loop = true;
    }

     startMusic() {
        this.bgSounds.play();
    }
    stopMusic() {
        this.bgSounds.pause();
        this.bgSounds.currentTime = 0;
    }
    flip() {
        this.flipSounds.play();
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
          let audioController = new AudioController();
          audioController.startMusic();
        });
    });

    cards.forEach(card => {card.addEventListener('click', () => {
          game.flipCard(card);
    });
 }); 
}


