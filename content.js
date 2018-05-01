/* global document chrome window $ */
const body = document.getElementsByTagName('body');

// create privacy screen modal
const modal = document.createElement('div');
modal.id = 'PrivacyScreenModal90901010';
modal.className = 'modal';
// display: none; /* Hidden by default */
// background-color: rgba(0,0,0,0.4); /* Black w/ opacity */`;
modal.style = `
position: fixed; /* Stay in place */
z-index: 100000; /* Sit on top */
left: 0;
top: 0;
width: 1000%; /* Full width */
height: 1000%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(255,255,255);`;
modal.style.display = 'none';
// modal.innerHTML = ` <!-- Modal content -->
// <div class="modal-content" style="
//   background-color: #fefefe;
//   margin: 15% auto; /* 15% from the top and centered */
//   padding: 20px;
//   border: 1px solid #888;
//   width: 80%; /* Could be more or less, depending on screen size */
// ">
//   <span class="close">&times;</span>
//   <p>Some text in the Modal..</p>
// </div>`;


// pull config info
let config;
function getChromeStorageData() {
  chrome.storage.sync.get(['status', 'targetType', 'siteWhiteList', 'siteBlackList'], (items) => {
    config = items;
    if (config === undefined ||
      config.status === undefined ||
      config.targetType === undefined ||
      config.siteWhiteList === undefined ||
      config.siteBlackList === undefined) {
      config =
        {
          status: 'off',
          targetType: 'blacklist',
          siteWhiteList: [],
          siteBlackList: [],
        };
    }
  });
}
getChromeStorageData(); // call once on js load
$(document).mouseenter(() => {
  // console.log(window.location.toString());
  modal.style.display = 'none';
});

$(document).mouseleave(() => {
  // if status is on
  if (config.status === 'on') {
    let blackListFlagMatch = false;
    let whiteListFlagMatch = false;
    config.siteBlackList.forEach((site) => {
      if (window.location.toString().includes(site)) {
        blackListFlagMatch = true;
      }
    });
    config.siteWhiteList.forEach((site) => {
      if (window.location.toString().includes(site)) {
        whiteListFlagMatch = true;
      }
    });

    if (config.targetType === 'blacklist' && blackListFlagMatch === true) {
      // if url matches with any blacklist item. black out screen
      modal.style.display = null;
    }
    if (config.targetType === 'whitelist' && whiteListFlagMatch === false) {
      // if url does not match with any whitelist item. black out screen
      modal.style.display = null;
    }
  }
});

window.onload = () => {
  body[0].appendChild(modal);
};

chrome.storage.onChanged.addListener(() => {
  getChromeStorageData();
});
