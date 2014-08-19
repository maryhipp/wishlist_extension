
// click on icon and trigger inject.js to get info
chrome.browserAction.onClicked.addListener(function(tab) {
  getCurrentTab();
  chrome.tabs.executeScript(null, { file: 'inject.js' });
});

// when info returned from inject...
chrome.runtime.onMessage.addListener(function (request) {
  console.log(request)
  chrome.tabs.executeScript(null, { file: 'reset.js' });
  $.ajax({
    url: "https://w1shlist.herokuapp.com/items",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      "item": {
        "image_url": request.image,
        "title": request.title,
        "url": request.url
      }
    }),
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
  })
});

function getCurrentTab() {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
  function(tabs){
    currentTab = tabs[0].id;
   }
  );
}

