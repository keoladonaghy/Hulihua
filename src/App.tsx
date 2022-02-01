import { InformationCircleIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
} from './lib/localStorage'
import { resources } from './constants/resources'

import { CONFIG } from './constants/config'
import ReactGA from 'react-ga';

function App() {
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded.guesses.map(guess => guess.join('')).includes(solution)) {
      setIsGameWon(true)
    }
    return loaded.guesses
  })

  const [language, setLanguage] = useState<string>(() => {
    return loadLanguageFromLocalStorage()
  })

  const languageOptions = [
    { id: "1", value: "eng", label: "English" },
    { id: "2", value: "haw", label: "‘Ōlelo Hawai‘i" }
  ];

  const TRACKING_ID = CONFIG.googleAnalytics; // YOUR_OWN_TRACKING_ID

  if (TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname);
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  useEffect(() => {
    saveLanguageToLocalStorage(language)
  }, [language])

  const onChar = (value: string) => {
    if (currentGuess.length < CONFIG.wordLength && guesses.length < CONFIG.tries) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!isWordInWordList(currentGuess.join(''))) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }
    const winningWord = isWinningWord(currentGuess.join(''))

    if (currentGuess.length === CONFIG.wordLength && guesses.length < CONFIG.tries && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        return setIsGameWon(true)
      }

      if (guesses.length === (CONFIG.tries - 1)) {
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 2000)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message={resources[language].APP.ALERTS.NOT_FOUND} isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={resources[language].APP.ALERTS.LOST(solution)}
        isOpen={isGameLost}
      />
      <Alert
        message="Game copied to clipboard"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Hulihua - He Nane ‘Ōlelo Hawai‘i</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <div className="flex w-80 mx-auto items-center mb-8">
        <select onChange={e => setLanguage(e.target.value)} value={language}>
          <option value="eng">English</option>
          <option value="haw">‘Ōlelo Hawai‘i</option>
        </select>
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        language={language}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
        language={language}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        language={language}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
        language={language}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {resources[language].COMPONENTS.MODALS.ABOUT.TITLE}
      </button>
    </div>
  )
}

export default App
