const genshindb = require('genshin-db');
let char_cards = '<div class="grid">';
const characters = genshindb.characters('names', { matchCategories: true });
let count = 0;
characters.every(key => {
  let character = genshindb.characters(key);
  let char_icon = character.images.icon;
  let char_rank = character.rarity;
  let char_color;
  if (char_rank == 5) {
    char_color = "#c98f1c";
  }
  else{
    char_color = "#8e5a9c";
  }
  let char_card =
    '<a style="text-decoration:none; color:black;" href="char_info.html"><article class="card" id="char_card" style="background-color:'+char_color+';"><img src="' + char_icon 
    +'" alt="icon">' +
    '<div class="container"><small><b>' +
    key + '</b></small></div></article></a>';
  char_cards += char_card;
  count++;
  if (count % 6 == 0) {
    char_cards += '</div><div class="grid">';
  }
  if (count >= 66) {
    return false;
  }
  return true;
});
char_cards += '</div>';
document.getElementById('char_card_container').innerHTML = char_cards;
