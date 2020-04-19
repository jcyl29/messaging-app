import React, { useState, useRef, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import useApi from '../hooks/useApi'
import ConsecutiveSnackbars from './demo'
import { priorityColorsMap, priorityMap } from '../enums'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MessageColumn from './messageColumn'

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
      [priority]:
        newState[[priority]].push({
          ...newMsg,
          id: new Date().toISOString()
        }) && newState[[priority]]
    })
  }

  const clearMessages = () => {
    setState(initializeState())
    restartStateRef.current = initializeState()
  }

  const [apiStarted, toggleApiStarted] = useApi(handleMessageCallback)

  return (
    <Grid container spacing={2}>
      <Box mb={2} m="auto" mt={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => toggleApiStarted(!apiStarted)}
            >
              {apiStarted ? 'Stop Messages' : 'Start Messages'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={clearMessages}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="center" spacing={2}>
        {Object.keys(state).map((priority, index) => (
          <MessageColumn
            key={index}
            priority={priority}
            messageList={state[priority]}
          />
        ))}
      </Grid>

      <pre>state {JSON.stringify(state, undefined, 2)}</pre>
      <ConsecutiveSnackbars />
    </Grid>
  )
}

export default MessageList
