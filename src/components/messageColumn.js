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
import PropTypes from 'prop-types'

const MessageColumn = ({ priority, messageList, deleteMessage }) => {
  const onDeleteClick = (id, priority) => {
    deleteMessage(id, priority)
  }

  return (
    <Grid item>
      <Typography variant="h5" component="h2" gutterBottom>
        {priority} Type 1
      </Typography>
      <Typography variant="subtitle1" component="h3" gutterBottom>
        Count: {messageList.length}
      </Typography>
      <Grid container direction="column-reverse" spacing={1}>
        {messageList.map(data => (
          <Grid key={`${data.message}_${data.id}`} item>
            <Card variant="elevation">
              <CardContent
                style={{
                  backgroundColor: priorityColorsMap[priority]
                }}
              >
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Typography color="textPrimary">{data.message}</Typography>
                    <Typography color="textPrimary">{data.id}</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      color="default"
                      size="small"
                      onClick={() => onDeleteClick(data.id, priority)}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

MessageColumn.propTypes = {
  priority: PropTypes.string.isRequired,
  messageList: PropTypes.array.isRequired,
  deleteMessage: PropTypes.func.isRequired
}

export default MessageColumn
