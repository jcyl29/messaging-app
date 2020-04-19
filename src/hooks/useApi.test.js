import { renderHook } from '@testing-library/react-hooks'
import useApi from './useApi'

jest.useFakeTimers()

describe('useApi', () => {
  test('api should be initial turned on', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useApi(callback))

    expect(result.current[0]).toBe(true)
  })
})
