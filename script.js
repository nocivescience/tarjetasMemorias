const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const clearBtn = document.querySelector('#clear');
const cardContainer = document.querySelector('#cards-container');
const addContainer = document.querySelector('#addContainer');
const warningEl = document.querySelector('#warning');
const addCardBtn = document.querySelector('#add-card');
let currentActiveCard = 0;
const cardsEl = [];
const cardsData = getCardsData();
function createCards(){
    cardsData.forEach((data, index) => createCard(data, index));
};
function createCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0){
        card.classList.add('active');
    }
    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
                ${data.answer}
            </p>
        </div>
    </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cardsEl.push(card);
    cardContainer.appendChild(card);
    updateCurrentText();
};
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
};
function setCardsData(){
    localStorage.setItem('cards', JSON.stringify(cardsData));
    window.location.reload();
};
createCards();
nextBtn.addEventListener('click', () => {
    if(cardsEl.length === 0){
        warningEl.style.opacity = '1';
        warningEl.style.transition = 'opacity 0.7s ease-in-out';
        setTimeout(() => {
            warningEl.style.opacity = '0';
        }, 2000);
    }else{
        cardsEl[currentActiveCard].className = 'card left';
        currentActiveCard = currentActiveCard + 1;
        if(currentActiveCard > cardsEl.length - 1){
            currentActiveCard = cardsEl.length - 1;
        }
        cardsEl[currentActiveCard].className = 'card active';
        updateCurrentText();
    }
});
prevBtn.addEventListener('click', () => {
    if(cardsEl.length === 0){
        warningEl.style.opacity = '1';
        warningEl.style.transition = 'opacity 0.7s ease-in-out';
        setTimeout(() => {
            warningEl.style.opacity = '0';
        }, 2000);
    }else{
        cardsEl[currentActiveCard].className = 'card right';
        currentActiveCard = currentActiveCard - 1;
        if(currentActiveCard < 0){
            currentActiveCard = 0;
        }
        cardsEl[currentActiveCard].className = 'card active';
        updateCurrentText();
    }
});
function updateCurrentText(){
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}
showBtn.addEventListener('click', () => {
    addContainer.classList.add('show');
    addContainer.classList.add('active');
});
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show');
    addContainer.classList.remove('active');
});
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if(question.trim() && answer.trim()){
        const newCard = { question, answer };
        createCard(newCard);
        questionEl.value = '';
        answerEl.value = '';
        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardContainer.innerHTML = '';
    window.location.reload();
});