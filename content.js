/* global document chrome window $ */
const body = document.getElementsByTagName('body');
// body[0].style.visibility = 'hidden';

// pull config info
let config;

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

$(document).mouseenter(() => {
  // console.log(window.location.toString());
  body[0].style.display = null;
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
      body[0].style.display = 'none';
    }
    if (config.targetType === 'whitelist' && whiteListFlagMatch === false) {
      // if url does not match with any whitelist item. black out screen
      body[0].style.display = 'none';
    }
  }
});
