import React from 'react'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { priorityColorsMap } from '../enums'
import { capitalizeFirstLetter } from '../utils'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

export default ({ priority }) => {
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

  const CustomSnackbar = (
    <Snackbar
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
          backgroundColor: priorityColorsMap[priority]
        }}
        message={
          <span id="client-snackbar">
            {capitalizeFirstLetter(priority)}: {messageInfo && messageInfo.message}
          </span>
        }
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
  )

  return [enqueue, CustomSnackbar]
}
