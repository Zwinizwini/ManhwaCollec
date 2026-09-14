const names = "Harry Trump,Fred Barney,Helen Rigby,Bill Abel,Chris Hand";

console.log(names);

const re = /\s*(?:,|$)\s*/;
const nameList = names.split(re);

console.log(nameList);

const lienLetter = 'https://letterboxd.com/_note_/'
console.log(lienLetter
    .split('/')[2]
    .split('.')[0])