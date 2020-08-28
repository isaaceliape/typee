window.addEventListener('DOMContentLoaded', init);

function onKeyup(e){
  e.preventDefault();
  const key = e.key;
  const isValidKey = this.allowedKeys.includes(key);
  const isFinished = this.currentPos > this.letters.length;
  if(!isValidKey || isFinished) return;
  if (this.letters[this.currentPos].text !== key) {
    this.letters[this.currentPos].status = 'error';
    this.errorCount += 1;
  } else {
    this.letters[this.currentPos].status = 'success';
    this.currentPos += 1;
  }
  this.letters = this.letters.map(x => ({...x, active: false}));
  this.letters[this.currentPos].active = true;

  this.render();
  console.log('this.upadateInfos()', this.upadateInfos());
  return false;
}

function render() {
  const text = this.letters.map(({ text, status, active, type }) => {
    const activeClass = active ? ' active' : ''
    const typeClass = type === 'space' ? ' isSpace' : ''
    return `<span class="${status}${activeClass}${typeClass}">${text}</span>`;
  }).join('');

  this.renderTextEl.innerHTML = text;
}

function sanitazeText() {
  this.letters = Array.from(this.input.value).map( (text, i) => {
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
  const words = this.input.value.substr(0, this.currentPos).split(' ').length - 1;
  this.numberOfWordsEl.innerText = words;
  this.numberOfErrorEl.innerText = this.errorCount;
}

function init() {
  this.allowedKeys = ['.',' ','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
  this.currentPos = 0;
  this.errorCount = 0;
  this.numberOfWordsEl = document.querySelector('.numberOfWords');
  this.numberOfErrorEl = document.querySelector('.numberOfError');
  this.renderTextEl = document.querySelector('.renderText');
  this.input = document.querySelector('.input');
  this.renderArea = document.querySelector('.renderArea');
  
  
  // Binding
  this.onKeyup = onKeyup.bind(this);
  this.sanitazeText = sanitazeText.bind(this);
  this.upadateInfos = upadateInfos.bind(this);
  
  //Events
  document.addEventListener('keyup', onKeyup.bind(this));

  this.sanitazeText();
  this.render();
}