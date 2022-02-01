const gameStateKey = 'gameState'
const languageKey = 'language'
const defaultLanguage = 'eng'

type StoredGameState = {
  guesses: string[][]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)

  return state ? (JSON.parse(state) as StoredGameState) : null
}

export const saveLanguageToLocalStorage = (language: string) => {
  if (language === "haw" || language === "eng") {
    localStorage.setItem(languageKey, language)
  }
}

export const loadLanguageFromLocalStorage = () => {
  const state = localStorage.getItem(languageKey)
  return state ? state : defaultLanguage
}