import { useEffect, useState } from 'react'

export default function CountDown({ newYear }: { newYear: any }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime()
      const distance = (newYear - now) / 1000
      if (distance > 0) {
        const days = Math.floor(distance / 60 / 60 / 24)
        const hours = Math.floor((distance / 60 / 60) % 24)
        const minutes = Math.floor((distance / 60) % 60)
        const seconds = Math.floor(distance % 60)
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      } else {
        clearInterval(timerId)
      }
    }, 1000)
    return () => clearInterval(timerId)
  }, [newYear])

  return (
    <div className='countdown'>
      <div className='time'>
        <p>Day</p>
        <div>{days < 10 ? `0${days}` : days}</div>
      </div>:
      <div className='time'>
        <p>Hou</p>
        <div>{hours < 10 ? `0${hours}` : hours}</div>
      </div>:
      <div className='time'>
        <p>Min</p>
        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
      </div>:
      <div className='time'>
        <p>Sec</p>
        <div>{seconds}</div>
      </div>
    </div>
  )
}
