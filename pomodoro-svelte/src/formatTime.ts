const formatTime = (v) => {
  return v < 10 ? `0${v}` : `${v}` 
}

const format = (time) => {
  const mins = Math.floor(time / 60)
  const seconds = time % 60
  return `${formatTime(mins)}:${formatTime(seconds)}`
}

export default format
