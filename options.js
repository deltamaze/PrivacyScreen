/* global chrome document window  */

let config;
let listernersCreated = false;

function save() {
  chrome.storage.sync.set(config, () => {
  });
}

function getTargetList() {
  let targetArray;
  if (config.targetType === 'blacklist') {
    targetArray = config.siteBlackList;
  } else {
    targetArray = config.siteWhiteList;
  }
  return targetArray;
}


function removeItemFromList(id) { // eslint-disable-line no-unused-vars
  if (config.targetType === 'blacklist') {
    config.siteBlackList.splice(id, 1);
  } else {
    config.siteWhiteList.splice(id, 1);
  }
  save();
  populateTable();// eslint-disable-line no-use-before-define
}

function addToList() { // eslint-disable-line no-unused-vars
  const newSiteElement = document.getElementById('newSiteField');
  if (config.targetType === 'blacklist') {
    config.siteBlackList.push(newSiteElement.value);
  } else {
    config.siteWhiteList.push(newSiteElement.value);
  }
  newSiteElement.value = '';
  save();
  populateTable();// eslint-disable-line no-use-before-define
}

function populateTable() {
  const targetArray = getTargetList();
  // clear table
  const siteTbody = document.getElementById('siteList');
  siteTbody.innerHTML = '';

  const trHeader = document.createElement('tr');
  trHeader.innerHTML = `
    <th>Site</th>
    <th>Action</th>
    `;
  siteTbody.appendChild(trHeader);

  for (let i = 0; i < targetArray.length; i += 1) {
    // tableRows += `<tr>
    //                   <td>[*].Slack.ComXXXX</td>
    //                   <td><input class="remBut" type="button" value="Remove" ></td>
    //               </tr>`;
    const trDetail = document.createElement('tr');
    const tdLabel = document.createElement('td');
    const tdButton = document.createElement('td');
    const remButton = document.createElement('input');
    tdLabel.innerHTML = targetArray[i];
    remButton.value = 'Remove';
    remButton.type = 'button';
    remButton.addEventListener('click', () => removeItemFromList(i));
    tdButton.appendChild(remButton);
    trDetail.appendChild(tdLabel);
    trDetail.appendChild(tdButton);
    siteTbody.appendChild(trDetail);
  }
}


// const elements = document.getElementsByClassName('remBut');
//   elements.forEach(element => {
//     createButton.addEventListener('click', function() { jstree_node_create(); });
//   });

function updateSelectToSettings() {
  const selectTargetType = document.querySelector('#targetType');
  const selectStatus = document.querySelector('#status');
  selectTargetType.value = config.targetType;
  selectStatus.value = config.status;
  const addSiteForm = document.getElementById('addSiteForm');
  addSiteForm.addEventListener('submit', (evt) => {
    addToList();
    evt.preventDefault();
  });
  populateTable();
}

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
          siteWhiteList: ['TestWebsite.com'],
          siteBlackList: ['TestWebsite.com'],
        };
      chrome.storage.sync.set(config, () => {
      });
    }
    if (listernersCreated === false) {
      updateSelectToSettings();
      listernersCreated = true;
    }
  });
}
getChromeStorageData(); // call once on js load

window.onload = () => {
  const selectTargetType = document.querySelector('#targetType');
  selectTargetType.addEventListener('change', () => {
    config.targetType = selectTargetType.options[selectTargetType.selectedIndex].value;
    save();
    populateTable();
  });

  const selectStatus = document.querySelector('#status');
  selectStatus.addEventListener('change', () => {
    config.status = selectStatus.options[selectStatus.selectedIndex].value;
    save();
    populateTable();
  });
};

chrome.storage.onChanged.addListener(() => {
  getChromeStorageData();
});
