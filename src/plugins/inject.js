console.log('我是 injectict.js，我被注入了', chrome)


const head = document.documentElement
const script = document.createElement('script');
const url = chrome.runtime.getURL('QCefClient.js');
script.setAttribute('src', url)
script.setAttribute('async', false)
const firstChild = head.firstChild
head.insertBefore(script, firstChild)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'fireEvent') {
    console.log('我特么接收到了fireEvent捏', request)
    window.postMessage(request, request.targetOrigin)
  }
});

console.log('window.QCefClient', window.QCefClient)
