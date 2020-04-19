import React from 'react'
import ReactDOM from 'react-dom'
import MessageList from './components/messageList'
import App from './components/app'
const NewApp = MessageList

function renderApp(App) {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp(MessageList)

if (module.hot) {
  module.hot.accept('./components/messageList', () => {
    renderApp(MessageList)
  })
}
