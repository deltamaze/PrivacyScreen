/* global document chrome */

document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  toggleSwitch.addEventListener('click', () => {
    chrome.tabs.getSelected(null, (tab) => {
      const d = document;
      // just update ext settings for on/off status
      // if tab is in target list, mouse is not on screen/window is not active, then black out
      console.log(d);
      console.log(tab);

      // var f = d.createElement('form');
      // f.action = 'http://gtmetrix.com/analyze.html?bm';
      // f.method = 'post';
      // var i = d.createElement('input');
      // i.type = 'hidden';
      // i.name = 'url';
      // i.value = tab.url;
      // f.appendChild(i);
      // d.body.appendChild(f);
      // f.submit();
    });
  }, false);
}, false);
