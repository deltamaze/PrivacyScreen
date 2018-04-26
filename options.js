/* global chrome document window  */

let config;

function populateTable() {
  let targetArray;
  if (config.targetType === 'blacklist') {
    targetArray = config.siteBlackList;
  } else {
    targetArray = config.siteWhiteList;
  }
  // clear table
  document.getElementById('siteList').innerHTML = '';

  const tableHeader = `<tr>
                <th>Site</th>
                <th>Action</th>
              </tr>`;
  let tableRows = '';

  for (let i = 0; i < targetArray.length; i += 1) {
    tableRows += `<tr>
                      <td>[*].Slack.ComXXXX</td>
                      <td><input type="button" value="Remove"></td>
                  </tr>`;
  }
  document.getElementById('siteList').innerHTML = tableHeader + tableRows;
}

function updateSelectToSettings() {
  const selectTargetType = document.querySelector('#targetType');
  const selectStatus = document.querySelector('#status');
  selectTargetType.value = config.targetType;
  selectStatus.value = config.status;

  populateTable();
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
        status: 'on',
        targetType: 'blacklist',
        siteWhiteList: ['google.com', 'test.com'],
        siteBlackList: ['google.com', 'test.com'],
      };
    chrome.storage.sync.set(config, () => {
    });
  }
  updateSelectToSettings();
});

function save() {
  chrome.storage.sync.set(config, () => {
  });
}

window.onload = () => {
  const selectTargetType = document.querySelector('#targetType');
  selectTargetType.addEventListener('change', () => {
    config.targetType = selectTargetType.options[selectTargetType.selectedIndex].value;
    save();
  });

  const selectStatus = document.querySelector('#status');
  selectStatus.addEventListener('change', () => {
    config.status = selectStatus.options[selectStatus.selectedIndex].value;
    save();
  });
};

/* <tr>
      <th>Site</th>
      <th>Action</th>
    </tr>
    <tr>
        <td>[*].Slack.ComZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ</td>
        <td><input type="button" value="Remove"></td>
    </tr> */

// save button clicked, sync storage
// Save it using the Chrome extension storage API.
// chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
//     console.log('Settings saved');
//   });

//   // Read it using the storage API
//   chrome.storage.sync.get(['foo', 'bar'], function(items) {
//     message('Settings retrieved', items);
//   });
