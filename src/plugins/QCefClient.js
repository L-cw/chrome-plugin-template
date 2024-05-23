class QCefClient {
  static instance;
  static listeners = {};

  // 单例
  static getInstance() {
    if (!QCefClient.instance) {
      QCefClient.instance = new QCefClient();
    }

    return QCefClient.instance;
  }

  static addEventListener(eventName, callback) {
    if (!QCefClient.listeners[eventName]) {
      QCefClient.listeners[eventName] = [];
    }
    QCefClient.listeners[eventName].push(callback);
  }
  static removeEventListener() {}

  static fireEvent(eventName, ...args) {
    if (QCefClient.listeners[eventName]) {
      QCefClient.listeners[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }

  static invokeMethod() {}

  static callMethod() {}

  constructor() {
    this.listeners = {};
  }

  addEventListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  removeEventListener() {}

  fireEvent(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }

  invokeMethod() {}
  callMethod() {}
  
}

window.QCefClient = QCefClient.getInstance();

window.addEventListener('message', function(event) {
  if (event.data.type === 'fireEvent') {
    console.log('我特么也接收到了fireEvent捏', event.data)
    window.QCefClient.fireEvent(event.data.eventName, event.data.data)
  }
});

console.log('window.QCefClient', window.QCefClient)
