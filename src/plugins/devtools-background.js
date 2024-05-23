// This is the devtools script, which is called when the user opens the
// Chrome devtool on a page. We check to see if we global hook has detected
// Vue presence on the page. If yes, create the Vue panel; otherwise poll
// for 10 seconds.

let created = false
let checkCount = 0

chrome.devtools.network.onNavigated.addListener(createPanel)
const checkInterval = setInterval(createPanel, 1000)
createPanel()

function createPanel () {
  if (created || checkCount++ > 10) {
    clearInterval(checkInterval)
    return
  }
  clearInterval(checkInterval)
  created = true
  chrome.devtools.panels.create(
    'FEdev', 'icons/128.png', '/pages/devtool/index.html',
    panel => {
      // panel loaded
      panel.onShown.addListener(onPanelShown)
      panel.onHidden.addListener(onPanelHidden)
    },
  )
}

// Manage panel visibility

function onPanelShown () {
  chrome.runtime.sendMessage('fe-panel-shown')
}

function onPanelHidden () {
  chrome.runtime.sendMessage('fe-panel-hidden')
}
