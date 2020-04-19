# React Coding Challenge: Messaging System

## Installation
```
yarn install
yarn start
```

## Notes
- test coverage added with jest and React Testing Library
- all components are functional -- some are combined with React Hooks to house necessary state logic  

### Acceptance Criteria

1. Messages should be rendered in a table-like structure. The newest messages should appear at the top of their respective columns.

Note: The example design below.

![Example Design](https://storage.googleapis.com/nuffsaid-public/grid.png)


2. The messages should be color coded depending on the priority of the message. The appropriate color per priority is:

   * error: #F56236
   * warning: #FCE788
   * info: #88FCA3

3. Each time a message with the priority level of error is received, a snackbar containing the error message should also appear at the top of the application. The error should disappear in 2 seconds, when another error message takes its place, or when the user clears it via the provided button located in the error message.
4. A user should be able to clear all messages at any point.
5. A user should be able to clear a specific message in a specific column
6. A user should be able to start and stop incoming messages. By default the messages should be running and displaying on the grid. The start/stop button should update depending on the state of the feed.
7. A user should see a count of specific messages in each column
8. Use material-ui components and JSS styles.
9. Test your application to the degree that you feel comfortable with. No specific testing frameworks are required.
