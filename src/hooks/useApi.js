import { useEffect, useRef, useState } from 'react'
import Api from '../api'

export default (callback) => {
  const [apiStarted, toggleApiStarted] = useState(true)
  const api = useRef(null)

  useEffect(() => {
    api.current = new Api({
      messageCallback: message => {
        callback(message)
      }
    })
    api.current.start()
  }, [])

  useEffect(() => {
    const methodName = apiStarted ? 'start' : 'stop'
    api.current[methodName]()
  }, [apiStarted])

  return [apiStarted, toggleApiStarted]
}
