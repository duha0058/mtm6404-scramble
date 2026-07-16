/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const wordData = [
  'react',
  'javascript',
  'website',
  'design',
  'college',
  'student',
  'browser',
  'coding',
  'screen',
  'button'
]

const maxStrikes = 3
const startingPasses = 3

function App () {
  const [words, setWords] = React.useState(() =>
    JSON.parse(localStorage.getItem('words')) || shuffle(wordData)
  )

  const [points, setPoints] = React.useState(() =>
    localStorage.getItem('points') || 0
  )

  const [strikes, setStrikes] = React.useState(() =>
    localStorage.getItem('strikes') || 0
  )

  const [passes, setPasses] = React.useState(() =>
    localStorage.getItem('passes') || startingPasses
  )

  const [guess, setGuess] = React.useState('')

  const [message, setMessage] = React.useState(() =>
    localStorage.getItem('message') || ''
  )

  const [scrambledWord, setScrambledWord] = React.useState(() =>
    localStorage.getItem('scrambledWord') || shuffle(words[0])
  )

  React.useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words))
  }, [words])

  React.useEffect(() => {
    localStorage.setItem('points', points)
  }, [points])

  React.useEffect(() => {
    localStorage.setItem('strikes', strikes)
  }, [strikes])

  React.useEffect(() => {
    localStorage.setItem('passes', passes)
  }, [passes])

  React.useEffect(() => {
    localStorage.setItem('message', message)
  }, [message])

  React.useEffect(() => {
    localStorage.setItem('scrambledWord', scrambledWord)
  }, [scrambledWord])

  function guessChangeHandler (e) {
    setGuess(e.target.value)
  }

  function submitHandler (e) {
    e.preventDefault()

    if (guess.toLowerCase() === words[0].toLowerCase()) {
      const newWords = words.slice(1)

      setPoints(parseInt(points) + 1)
      setWords(newWords)
      setMessage('Correct!')

      if (newWords.length > 0) {
        setScrambledWord(shuffle(newWords[0]))
      }
    } else {
      setStrikes(parseInt(strikes) + 1)
      setMessage('Incorrect. Try again!')
    }

    setGuess('')
  }

  function passHandler () {
    if (parseInt(passes) > 0) {
      const newWords = words.slice(1)

      setPasses(parseInt(passes) - 1)
      setWords(newWords)
      setMessage('Word passed.')

      if (newWords.length > 0) {
        setScrambledWord(shuffle(newWords[0]))
      }
    }
  }

  function resetHandler () {
    const newWords = shuffle(wordData)

    setWords(newWords)
    setPoints(0)
    setStrikes(0)
    setPasses(startingPasses)
    setGuess('')
    setMessage('')
    setScrambledWord(shuffle(newWords[0]))
  }

  const gameOver = words.length === 0 || parseInt(strikes) >= maxStrikes

  return (
    <div className="app">
      <h1>Scramble</h1>

      <p>Points: {points}</p>
      <p>Strikes: {strikes} / {maxStrikes}</p>
      <p>Passes: {passes}</p>

      {
        gameOver
          ? (
            <div>
              <h2>Game Over</h2>
              <p>Your final score is {points} points.</p>
              <button onClick={resetHandler}>Play Again</button>
            </div>
          )
          : (
            <div>
              <h2>{scrambledWord}</h2>

              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  value={guess}
                  onChange={guessChangeHandler}
                  placeholder="Enter your guess"
                />

                <button type="submit">Guess</button>
              </form>

              <button onClick={passHandler} disabled={parseInt(passes) === 0}>
                 Pass
              </button>
              <p>{message}</p>
            </div>
          )
      }
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)