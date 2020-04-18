import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import useApi from '../hooks/useApi'
import ConsecutiveSnackbars from './demo'

const MessageList = () => {
  const [messages, setMessages] = useState([])

  const handleMessageCallback = newMsg => {
    setMessages([...(messages.push(newMsg) && messages)])
  }

  const [apiStarted, toggleApiStarted] = useApi(handleMessageCallback)

  return (
    <>
      <Button variant="contained" onClick={() => toggleApiStarted(!apiStarted)}>
        {apiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
      <pre>state {JSON.stringify(messages, undefined, 2)}</pre>
      <ConsecutiveSnackbars />
    </>
  )
}

export default MessageList
