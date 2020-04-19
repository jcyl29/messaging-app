import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import useApi from '../hooks/useApi'
import ConsecutiveSnackbars from './demo'
import priorityMap from '../enums'

const MessageList = () => {
  const initializeState = () =>
    Object.values(priorityMap).reduce((acc, value) => {
      acc[value] = []
      return acc
    }, {})

  const [state, setState] = useState(initializeState())

  const handleMessageCallback = newMsg => {
    const priority = priorityMap[newMsg.priority]
    setState({
      ...state,
      [priority]: state[[priority]].push(newMsg) && state[[priority]]
    })
  }

  const [apiStarted, toggleApiStarted] = useApi(handleMessageCallback)

  return (
    <>
      <Button variant="contained" onClick={() => toggleApiStarted(!apiStarted)}>
        {apiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
      <pre>state {JSON.stringify(state, undefined, 2)}</pre>
      <ConsecutiveSnackbars />
    </>
  )
}

export default MessageList
