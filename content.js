/* global document */
const body = document.getElementsByTagName('body');
//body[0].style.visibility = 'hidden';

$(document).mouseenter(function () {
  console.log('in');
});

$(document).mouseleave(function () {
  console.log('out');
});