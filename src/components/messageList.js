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
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

const MessageList = () => {
  const initializeState = () =>
    Object.values(priorityMap).reduce((acc, value) => {
      acc[value] = []
      return acc
    }, {})

  const [state, setState] = useState(initializeState())
  const restartStateRef = useRef(null)

  const queueRef = React.useRef([])
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift())
      setOpen(true)
    }
  }

  const enqueue = message => {
    queueRef.current.push(message)

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false)
    } else {
      processQueue()
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    processQueue()
  }

  const handleMessageCallback = newMsg => {
    const priority = priorityMap[newMsg.priority]
    const newState = restartStateRef.current || state

    if (priority === 'error') {
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
          />
        ))}
      </Grid>

      <pre>state {JSON.stringify(state, undefined, 2)}</pre>

      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        onExited={handleExited}
      >
        <SnackbarContent
          style={{
            backgroundColor: priorityColorsMap['error']
          }}
          message={<span id="client-snackbar">{messageInfo && messageInfo.message}</span>}
          action={
            <>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </>
          }
        />
      </Snackbar>

      <ConsecutiveSnackbars />
    </Grid>
  )
}

export default MessageList
