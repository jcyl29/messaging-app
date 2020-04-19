import React, { useState, useRef, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import useApi from '../hooks/useApi'
import ConsecutiveSnackbars from './demo'
import { priorityMap } from '../enums'

const MessageList = () => {
  const initializeState = () =>
    Object.values(priorityMap).reduce((acc, value) => {
      acc[value] = []
      return acc
    }, {})

  const [state, setState] = useState(initializeState())
  const restartStateRef = useRef(null)

  const handleMessageCallback = newMsg => {
    const priority = priorityMap[newMsg.priority]
    const newState = restartStateRef.current || state
    
    setState({
      ...newState,
      [priority]: newState[[priority]].push({...newMsg, id: new Date().toISOString()}) && newState[[priority]]
    })
  }

  const clearMessages = () => {
    setState(initializeState())
    restartStateRef.current = initializeState()
  }

  const [apiStarted, toggleApiStarted] = useApi(handleMessageCallback)

  return (
    <>
      <Button variant="contained" onClick={() => toggleApiStarted(!apiStarted)}>
        {apiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
      <Button variant="contained" onClick={clearMessages}>
        Clear
      </Button>

      <pre>state {JSON.stringify(state, undefined, 2)}</pre>
      <ConsecutiveSnackbars />
    </>
  )
}

export default MessageList
