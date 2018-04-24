// use storage
let config;
chrome.storage.sync.get(['targetType', 'siteWhiteList', 'siteBlackList'], function (items) {
  config = items;
  console.log(items);
  if (config === undefined) {
    config =
      {
        targetType: "blacklist",
        siteWhiteList: ["google.com", "test.com"],
        siteBlackList: ["google.com", "test.com"]
      }
    chrome.storage.sync.set(config, function () {
    });
  
  }
  updateSelectToSettings();
});

window.onload=function(){
  const select = document.querySelector('#targetType');
  select.addEventListener('change',function(){
      config.targetType = select.options[select.selectedIndex].value;
      save();
  });
}


updateSelectToSettings = function() {

  const select = document.querySelector('#targetType');
  select.value = config.targetType;

}

save = function(){
  chrome.storage.sync.set(config, function () {
  });
}

//save button clicked, sync storage
// Save it using the Chrome extension storage API.
// chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
//     console.log('Settings saved');
//   });

//   // Read it using the storage API
//   chrome.storage.sync.get(['foo', 'bar'], function(items) {
//     message('Settings retrieved', items);
//   });
