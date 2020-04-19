import React from 'react'
import { cleanup, fireEvent, render, wait } from '@testing-library/react'

import { toBeEmpty, toBeVisible } from '@testing-library/jest-dom'
import MessageList from './messageList'

expect.extend({ toBeVisible, toBeEmpty })

describe('<MessageList />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
    cleanup()
  })

  test('renders without exploding', () => {
    const { container } = render(<MessageList />)
    expect(container).toBeVisible()
  })

  test('after some time, there is a least one message in any of the 3 columns', async () => {
    jest.runAllTimers()
    const { container } = render(<MessageList />)

    expect(container).toBeVisible()

    let columns = container.querySelectorAll(
      '.MuiGrid-direction-xs-column-reverse'
    )

    const testCondition = Object.values(columns).some(col => col.innerHTML)
    expect(testCondition).toBeTruthy()
  })

  test('clear messages works', async () => {
    jest.runAllTimers()
    const { container } = render(<MessageList />)
    const clearButton = container.querySelector('#clear-button')

    fireEvent.click(clearButton)

    await wait(() => {
      const columns = container.querySelectorAll(
        '.MuiGrid-direction-xs-column-reverse'
      )

      const testCondition = Object.values(columns).every(col => !col.innerHTML)
      expect(testCondition).toBeTruthy()
    })
  })

  test('delete single message works', async () => {
    jest.runAllTimers()
    const { container, queryByText } = render(<MessageList />)
    const messageEl = container.querySelector(
      '.MuiTypography-body1.MuiTypography-colorTextPrimary'
    )
    const message = messageEl.innerHTML
    const clearButton = messageEl.parentNode.nextSibling.querySelector('button')

    fireEvent.click(clearButton)

    await wait(() => {
      expect(queryByText(message)).toBeNull()
    })
  })
})
