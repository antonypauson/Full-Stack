import { useState } from "react"

const Content = () => {
  return (
    <div>
    <h3>give feedback</h3>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Stat = ({good, neutral, bad}) => {
  return (
    <div>
      <h3>statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
  
}
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <>
      <Content />
      <Button text='good' onClick={() => setGood(good + 1)}/>
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' onClick={() => setBad(bad + 1)}/>
      <Stat good={good} neutral={neutral} bad={bad}/>
    </>
  )
}


export default App
