export const inc = () => ({type: 'INC'});
export const dec = () => ({type: 'DEC'});
export const rl = () => ({type: 'RL'});
export const rnd = () => {
  let number = [];
  let body = require('./db.json');
  body.numbers.map(num => {
    if (num.const) number.push(num.const);
  });
  return {type: 'RND', value: +number[Math.floor(Math.random() * number.length)]}
};
export const upl = () => {
  const url = 'http://localhost:3000/numbers';
  const postData = (elem) => {
    return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(elem)
    })
      .catch(error => console.log('aaa', error));
  }
  let elem = {};
  elem['saved'] = document.querySelector('.counter').textContent;
  postData(elem);
  return {type: 'UPL'}
};