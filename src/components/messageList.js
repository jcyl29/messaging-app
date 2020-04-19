import React, { useState, useRef } from 'react'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import useApi from '../hooks/useApi'
import useSnackbar from '../hooks/useSnackbar'
import { priorityMap } from '../enums'
import MessageColumn from './messageColumn'

const MessageList = () => {
  const initializeState = () =>
    Object.values(priorityMap).reduce((acc, value) => {
      acc[value] = []
      return acc
    }, {})

  const snackBarPriority = 'error'

  const handleMessageCallback = newMsg => {
    const priority = priorityMap[newMsg.priority]
    const newState = restartStateRef.current || state

    if (priority === snackBarPriority) {
      enqueue(newMsg)
    }

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

  const deleteMessage = (id, priority) => {
    const messageIndex = state[priority].findIndex(data => data.id === id)
    const updatedList =
      state[priority].splice(messageIndex, 1) && state[priority]
    setState({ ...state, [priority]: updatedList })
  }

  const [apiStarted, toggleApiStarted] = useApi(handleMessageCallback)
  const [state, setState] = useState(initializeState())
  const restartStateRef = useRef(null)

  const [enqueue, CustomSnackbar] = useSnackbar({ priority: snackBarPriority })

  return (
    <Grid container spacing={2}>
      <Box mb={2} m="auto" mt={11}>
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
            deleteMessage={deleteMessage}
            width={100/Object.keys(state).length}
          />
        ))}
      </Grid>

      <pre>state {JSON.stringify(state, undefined, 2)}</pre>
      {CustomSnackbar}
    </Grid>
  )
}

export default MessageList
