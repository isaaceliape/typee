window.addEventListener('DOMContentLoaded', init);

function onKeyup(e){
  const key = e.key;
  const isInvalidKey = !this.allowedKeys.includes(key);
  const isFinished = this.currentPos > this.letters.length;
  if(isInvalidKey || isFinished) return;
  
  if (key === 'Backspace') {
    this.letters[this.currentPos].status = 'ok';
    this.currentPos = this.currentPos - 1 >= 0
      ? this.currentPos - 1
      : 0;
  } else if (this.letters[this.currentPos].text === key) {
    this.letters[this.currentPos].status = 'success';
    this.currentPos += 1;
  } else {
    this.letters[this.currentPos].status = 'error';
    this.errorCount += 1;
  }

  this.letters = this.letters.map(x => ({...x, active: false}));
  this.letters[this.currentPos].active = true;

  this.render();
  this.upadateInfos();
}

function render() {
  this.renderTextEl.innerHTML = this.letters
    .map(({ text, status, active, type }) => {
      const activeClass = active ? ' active' : ''
      const typeClass = type === 'space' ? ' isSpace' : ''
      return `<span class='${status}${activeClass}${typeClass}'>${text}</span>`;
    })
    .join('');
}

function sanitizeText() {
  this.letters = Array.from(this.textArea.value).map( (text, i) => {
    let type = text === ' '? 'space' : '';
    return {
      text,
      status: 'ok',
      active: i === 0,
      type,
    };
  });
}

function upadateInfos() {
  const words = this.textArea.value.substr(0, this.currentPos).split(' ').length - 1;
  this.numberOfWordsEl.innerText = words;
  this.numberOfErrorEl.innerText = this.errorCount;
}

function onClickApply(e) {
  this.sanitizeText();
  this.render();
}

function onKeydown(e) {
  e.preventDefault();
  return false
}

function onClickToogleTyping() {
  this.disableTyping = !this.disableTyping;
  this.renderTextEl.classList.toggle('disableTyping');
  this.toogleTypingEl.innerText = this.disableTyping
    ? 'Stop typing'
    : 'Start typing';
  
  const listener = this.disableTyping
    ? 'removeEventListener'
    : 'addEventListener';

  document[listener]('keyup', this.onKeyup);
  document[listener]('keydown', this.onKeydown);
}

function init() {
  this.allowedKeys = ['Backspace','\'','.',' ','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
  this.currentPos = 0;
  this.errorCount = 0;
  this.applyEl = document.querySelector('.apply');
  this.numberOfWordsEl = document.querySelector('.numberOfWords');
  this.toogleTypingEl = document.querySelector('.toogleTyping');
  this.numberOfErrorEl = document.querySelector('.numberOfError');
  this.renderTextEl = document.querySelector('.renderText');
  this.textArea = document.querySelector('.textArea');
  this.renderArea = document.querySelector('.renderArea');
  this.disableTyping = true;
  
  // Binding
  this.onKeyup = onKeyup.bind(this);
  this.sanitizeText = sanitizeText.bind(this);
  this.upadateInfos = upadateInfos.bind(this);
  this.onClickApply = onClickApply.bind(this);
  this.onKeydown = onKeydown.bind(this);
  this.onClickToogleTyping = onClickToogleTyping.bind(this);
  
  this.renderTextEl.addEventListener('click', this.onClickToogleTyping);
  this.toogleTypingEl.addEventListener('click', this.onClickToogleTyping);
  this.applyEl.addEventListener('click', this.onClickApply);

  this.sanitizeText();
  this.render();
}