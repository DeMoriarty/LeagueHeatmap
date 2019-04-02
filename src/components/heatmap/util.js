export const f2t = (frames, fps = 30) => {
  let s = Math.round(frames / fps)
  let m = Math.floor(s / 60)
  s %= 60
  let h = Math.floor(m / 60)
  m %= 60
  s = s < 10 ? `0${s}` : `${s}`
  m = m < 10 ? `0${m}` : `${m}`
  if (h === 0) {
    return `${m}:${s}`
  } else {
    return `${h}:${m}:${s}`
  }
}

export const t2f = (time, fps = 30) => {
  time = time.split(':')
  time = time.map(item=>Number(item))
  if (time.length === 2) {
    return (time[0] * 60 + time[1]) * 30
  } else if (time.length === 3){
    return (time[0] * 3600 + time[1] * 60 + time[2]) * 30
  }
}