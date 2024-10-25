import { config } from 'dotenv'
import { Converter } from 'showdown'
config()

export const getEnv = (key: string) => {
  return process.env[key]
}
export const formatTime = (date: Date) => {
  let hours: string | number = date.getHours()
  let minutes: string | number = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

export const convertToHtml = (markdown: string) => {
  try {
    const converter = new Converter()
    converter.setFlavor('github')
    return converter.makeHtml(markdown)
  } catch (error) {
    console.error('Error converting markdown to HTML: ', error)
    return markdown
  }
}
