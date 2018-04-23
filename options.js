// use storage
let config;
chrome.storage.sync.get(['targetType', 'siteWhiteList', 'siteBlackList'], function (items) {
  console.log(items);
  config = items;
  if (config === undefined) {
    console.log("setting up new items object");
    config =
      {
        targetType: ["WhiteList", "BlackList"],
        siteWhiteList: ["google.com", "test.com"],
        siteBlackList: ["google.com", "test.com"]
      }
    chrome.storage.sync.set(config, function () {
      console.log('Settings saved');
    });
  
  }
  console.log(config);
});






//save button clicked, sync storage
// Save it using the Chrome extension storage API.
// chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
//     console.log('Settings saved');
//   });

//   // Read it using the storage API
//   chrome.storage.sync.get(['foo', 'bar'], function(items) {
//     message('Settings retrieved', items);
//   });
