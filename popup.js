/* global document chrome window */

let config;

function save() {
  chrome.storage.sync.set(config, () => {
  });
}

function updateSelectToSettings() {
  const selectStatus = document.querySelector('#status');
  selectStatus.value = config.status;
}

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
    chrome.storage.sync.set(config, () => {
    });
  }
  updateSelectToSettings();
});

window.onload = () => {
  const selectStatus = document.querySelector('#status');
  selectStatus.addEventListener('change', () => {
    config.status = selectStatus.options[selectStatus.selectedIndex].value;
    save();
  });
};
