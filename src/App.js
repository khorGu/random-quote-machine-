import React, {useEffect, useState} from 'react';
import './App.scss';
import Colors_Array from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'


let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("We must balance conspicuous consumption with conscious capitalism.")
  const [author, setAuthor] = useState("Kevin Kruse")

  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setqutoesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#FFCDD2')

  const fetchQuotes = async(url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setqutoesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }


  useEffect(() => {
    fetchQuotes(quoteDB)
  }, [quoteDB])
  
  const getRandomQuote = () => {
      let randInteger = Math.floor(quotesArray.length * Math.random())
      setRandomNumber(randInteger)
      setAccentColor(Colors_Array[randInteger ])
      setQuote(quotesArray[randInteger].quote)
      setAuthor(quotesArray[randInteger].author)
  }


  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <div className="quote-text">
            <h2 id="text">
            <span id="quote-icon"></span>
            "{quote}"
            </h2>
          </div>
          <div className="quote-author">
            <p id="author">-  {author}</p>
          </div>
        <div className="button"> 
            <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} - ${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" style={{backgroundColor: accentColor}} onClick={() => getRandomQuote ()}>New Quote</button>
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
