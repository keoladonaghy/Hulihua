import { render, screen } from '@testing-library/react'
import App from './App'
import { ORTHOGRAPHY } from './constants/orthography'
import { WORDS } from './constants/wordlist'
import { ORTHOGRAPHY_PATTERN } from './lib/tokenizer'

test('renders Not Wordle', () => {
  render(<App />)
  const linkElement = screen.getByText(/Hulihua/i)
  expect(linkElement).toBeInTheDocument()
})

test('all word characters are in orthography (Unicode/diacritic support)', () => {
  let splitWords = WORDS.map((x) =>
    x.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
  )
  splitWords.forEach((word) => {
    expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(word))
  })
})

test('orthography supports Unicode characters and diacritics', () => {
  // Test that the orthography includes Hawaiian diacritical marks
  const expectedUnicodeChars = ['ā', 'ē', 'ī', 'ō', 'ū', 'ʻ'] // Hawaiian diacritics
  expectedUnicodeChars.forEach((char) => {
    expect(ORTHOGRAPHY).toContain(char)
  })

  // Test that words with Unicode characters are properly tokenized
  const unicodeWords = WORDS.filter((word) => /[āēīōūʻ]/.test(word))
  expect(unicodeWords.length).toBeGreaterThan(0) // Ensure we have Unicode words to test

  unicodeWords.slice(0, 10).forEach((word) => {
    // Test first 10 Unicode words
    const splitWord = word.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
    expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(splitWord))
  })
})
