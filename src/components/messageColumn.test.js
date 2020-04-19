import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { toBeEmpty, toBeVisible } from '@testing-library/jest-dom'
import MessageColumn from './messageColumn'

expect.extend({ toBeVisible, toBeEmpty })

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    priority: 'error',
    messageList: [],
    deleteMessage: () => {},
    width: 30
  }

  const updatedProps = Object.assign(defaultProps, propOverride)

  return <MessageColumn {...updatedProps} />
}

describe('<MessageColumn />', () => {
  afterEach(cleanup)

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent())
    expect(container).toBeVisible()
  })

  test('display correct count with messages passed in', () => {
    const { container } = render(
      getMockedComponent({
        messageList: [
          { message: 'message1', priority: 'error' },
          { message: 'message2', priority: 'error' }
        ]
      })
    )

    const countDisplay = container.querySelector(
      '.MuiTypography-subtitle1.MuiTypography-gutterBottom'
    ).innerHTML

    const papers = container.querySelectorAll(
      '.MuiPaper-elevation1.MuiPaper-rounded'
    )

    expect(countDisplay).toContain('2')
    expect(papers.length).toBe(2)

    expect(container).toBeVisible()
  })

  test('deleteMessage function prop gets called when clear button clicked', () => {
    const deleteMessage = jest.fn()
    const { getByText } = render(
      getMockedComponent({
        deleteMessage,
        messageList: [{ message: 'message1', priority: 'error' }]
      })
    )

    const clearButton = getByText('Clear')

    fireEvent.click(clearButton)

    expect(deleteMessage).toBeCalled()
  })
})
