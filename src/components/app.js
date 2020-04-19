import React, { useState, useRef, useEffect } from 'react'

import 'typeface-roboto'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import MessageList from './messageList'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { priorityColorsMap } from '../enums'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

const App = () => {
  return (
    <Grid container spacing={2}>
      <Box mb={2} m="auto"> 
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button variant="contained">Start/Stop Messages</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Clear</Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Typography variant="h5" component="h2" gutterBottom>
            Error Type 1
          </Typography>
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Count: 2
          </Typography>
          <Grid container direction="column-reverse" spacing={1}>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['error']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        Error message 1
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['error']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        Error message 2
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['error']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        Error message 3
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h2" gutterBottom>
            Warning Type 2
          </Typography>
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Count: 2
          </Typography>
          <Grid container direction="column-reverse" spacing={1}>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['warning']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        Warning message 1
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['warning']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        Warning message 2
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['warning']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        Warning message 3
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h2" gutterBottom>
            Info Type 1
          </Typography>
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Count: 3
          </Typography>
          <Grid container direction="column-reverse" spacing={1}>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['info']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        info message 1
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['info']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        info message 2
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="elevation">
                <CardContent
                  style={{
                    backgroundColor: priorityColorsMap['info']
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography color="textPrimary">
                        info message 3
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="default" size="small" onClick={() => {}}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <MessageList />
      </Grid>
    </Grid>
  )
}

export default App
