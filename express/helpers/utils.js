
function randomIndex(len) {
  return Math.floor(Math.random() * len);
}

function randomStr(len) {
  var charSet = 'aBcDeFgHiJkLmNoPqRsTuVwXyZ';

  if (!len) {
    len = 7; // reasonable name len
  }

  var res = '';

  for (var i=0; i<len; i++) {
    res += charSet[randomIndex(charSet.length)];
  }

  return res;
}

module.exports = {
  randomIndex: randomIndex,
  randomStr: randomStr
};