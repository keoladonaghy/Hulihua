import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

// January 1, 2022 Game Epoch
const EPOCH_MS = 1641031200000 // Hawaiian Time, chee!!!
const MS_PER_DAY = 86400000

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word) ||
    VALIDGUESSES.includes(word)
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  const now = Date.now()
  const index = Math.floor((now - EPOCH_MS) / MS_PER_DAY)

  return {
    solution: WORDS[index],
    solutionIndex: index,
  }
}

const padLeadingZeros = (num: number, size: number) => {
  var s = num + ""
  while (s.length < size) s = "0" + s
  return s
}

export const getTimeLeft = () => {
  const now = Date.now()
  const msTilNewWord = MS_PER_DAY - ((now - EPOCH_MS) % MS_PER_DAY)
  const seconds = Math.floor((msTilNewWord / (1000)) % 60)
  const minutes = Math.floor(msTilNewWord / (1000 * 60) % 60)
  const hours = Math.floor((msTilNewWord / (1000 * 60 * 60)) % 24)
  return `${padLeadingZeros(hours, 2)}:${padLeadingZeros(minutes, 2)}:${padLeadingZeros(seconds, 2)}`
}

export const { solution, solutionIndex } = getWordOfDay()
