/* global document chrome */
// let config;
// chrome.storage.sync.get(['status', 'targetType', 'siteWhiteList', 'siteBlackList'], (items) => {
//   config = items;
//   if (config === undefined ||
//     config.status === undefined ||
//     config.targetType === undefined ||
//     config.siteWhiteList === undefined ||
//     config.siteBlackList === undefined) {
//     config =
//       {
//         status: 'off',
//         targetType: 'blacklist',
//         siteWhiteList: [],
//         siteBlackList: [],
//       };
//     chrome.storage.sync.set(config, () => {
//     });
//   }
//   updateSelectToSettings();
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const toggleSwitch = document.getElementById('toggleSwitch');
//   toggleSwitch.addEventListener('click', () => {
//     chrome.tabs.getSelected(null, (tab) => {
//       const d = document;
//       // just update ext settings for on/off status
//       // if tab is in target list, mouse is not on screen/window is not active, then black out
//       console.log(d);
//       console.log(tab);


//     });
//   }, false);
// }, false);
