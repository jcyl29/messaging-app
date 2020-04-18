import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import useApi from '../hooks/useApi'
import ConsecutiveSnackbars from './demo'
import priorityMap from '../enums'

const MessageList = () => {
  const [messages, setMessages] = useState([])

  const handleMessageCallback = newMsg => {
    const result = { ...newMsg, priority: priorityMap[newMsg.priority] }
    setMessages([...(messages.push(result) && messages)])
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
