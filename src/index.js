import React from 'react'
import ReactDOM from 'react-dom'
// import MessageList from './components/message-list'
import MessageList from './components/messageList'
const NewApp = MessageList

function renderApp(App) {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp(MessageList)

if (module.hot) {
  module.hot.accept('./components/messageList', () => {
    renderApp(NewApp)
  })
}
