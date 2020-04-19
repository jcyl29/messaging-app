import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import MessageList from './components/messageList'

function renderApp(App) {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp(MessageList)

if (module.hot) {
  module.hot.accept('./components/messageList', () => {
    renderApp(MessageList)
  })
}
