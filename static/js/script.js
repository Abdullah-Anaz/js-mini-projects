//Mini Project 1
function ageInDays(){
    const birthYear = prompt("What year were you born... Good friend?")
    const _ageInDays = (2022 - birthYear) * 365;
    const textAnswer = `You are ${_ageInDays} days`;
    document.getElementById('ageInDays').innerHTML = textAnswer;
}

function reset(){
    document.getElementById('ageInDays').innerHTML = "";
}

//Mini Project 2
function generateCat(){
    const image = document.createElement('img');
    const div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Mini Project 3
function rpsGame(yourChoice){
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissors': 0, 'rock': 1, 'paper': 0.5},
        'scissors': {'scissors': 0.5, 'rock': 0, 'paper': 1}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice]

    return yourScore;
}

function finalMessage(results){
    switch(results){
        case 0:
            return {'message': 'You Lost!', 'color': 'red'}
        
        case 0.5:
            return {'message': 'You Tied!', 'color': 'yellow'}

        case 1:
            return {'message': 'You Won!', 'color': 'green'}
    }
}

function rpsFontEnd(humanChoice, computerChoice, message){
    const imagesDatabases = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    } 

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    const humanDiv = document.createElement('div');
    const botDiv = document.createElement('div');
    const messageDiv = document.createElement('div');

    humanDiv.innerHTML = `<img src='${imagesDatabases[humanChoice]}' height=150px width=150px style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'/>`;
    botDiv.innerHTML = `<img src='${imagesDatabases[computerChoice]}' height=150px width=150px style='box-shadow: 0px 10px 50px rgba(243,38,24,1)' />`;
    messageDiv.innerHTML = `<h1 style='color: ${message['color']}; font-size: 60px; padding: 30px; -webkit-text-stroke: 1px black;'> ${message['message']} </h1>`;
    
    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
}

//Mini Project 4
const all_buttons = document.getElementsByTagName('button');
let copyAllButtons = [];

for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonColor){
    if(buttonColor.value === 'red'){
        buttonsRed();
    }else if (buttonColor.value === 'green'){
        buttonsGreen();
    }else if (buttonColor.value === 'reset'){
        buttonsColorReset();
    }else if (buttonColor.value === 'random'){
        buttonsColorRandom();
    }
}

function buttonsRed(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsColorRandom(){
    for(let i = 0; i < all_buttons.length; i++){
        let randomNumber =  Math.floor(Math.random() * all_buttons.length);
        let randomColor = copyAllButtons[randomNumber]; 
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(randomColor);
    }
}

//Mini Project 5
let blackJackGame= {
    'you': {
        'scoreSpan': '#your-blackjack-result',
        'div': '#your-box', 
        'score': 0
    },

    'dealer': {
        'scoreSpan': '#dealer-blackjack-result',
        'div': '#dealer-box', 
        'score': 0
    },

    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],

    'cardsMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'Q': 10,
        'J': 10,
        'A': [1,11]
    },

    'wins': 0,
    'losses': 0,
    'draws': 0
}

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitButton = document.querySelector("#blackjack-hit-button");
const standButton = document.querySelector("#blackjack-stand-button");
const dealButton = document.querySelector("#blackjack-deal-button"); 

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

hitButton.addEventListener('click', blackjackHit);
standButton.addEventListener('click', dealerLogic);
dealButton.addEventListener('click', blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    standButton.disabled = false;
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    clearTable();
    resetScore();
    resetMessage();
    resetButtons();
}

function clearTable(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(let i = 0; i < yourImages.length; i++){
        yourImages[i].remove();
    }

    for(let i = 0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

function resetScore(){
    YOU['score'] = 0;
    DEALER['score'] = 0;
    showScore(YOU);
    showScore(DEALER);

    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
}

function resetButtons(){
    hitButton.disabled = false;
    standButton.disabled = true;
    dealButton.disabled = true;
}

function resetMessage(){
    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').style.color = 'black';
}

function updateScore(card, activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    hitButton.disabled = true;
    standButton.disabled = true;
    
    while(DEALER['score'] < 16){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await wait(1000);
    }

    if (DEALER['score'] > 15){
        let winner = computeWinner();
        showResult(winner);
        dealButton.disabled = false;
    }
}

function computeWinner(){
    let winner;
    if (YOU['score'] <= 21){
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackJackGame['wins']++;
            winner = YOU;   
        }else if (YOU['score'] < DEALER['score']){
            blackJackGame['losses']++;
            winner = DEALER;
        }else if (YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++;
        }
    }else if (YOU['score'] > 21){
        if(DEALER['score'] <= 21){
            blackJackGame['losses']++;
            winner = DEALER;
        }else if(DEALER['score'] > 21){
            blackJackGame['draws']++;
        }   
    }

    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(winner === YOU){
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message = 'You Won!'
        messageColor = 'green';
        winSound.play()
    }else if(winner == DEALER){
        document.querySelector('#losses').textContent = blackJackGame['losses'];
        message = 'You Lost!'
        messageColor = 'red';
        lossSound.play()
    }else{
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        message = 'You Drew!'
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}
