import { useState } from "react"

const Content = ({text}) => {
  return (
    <div>
    <h3>{text}</h3>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good,bad,neutral}) => {
  const all = good + bad + neutral
  if (all === 0){
    return (
      <p>No feedbacks given</p>
    )
  }
  const average = (good * 1 + neutral * 0 + bad * (-1)) / all
  const positive = (good / all) * 100 + '%'

  return (
    <div>
      <table>
        <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive}/>
      </table>
      
    </div>
    
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <Content text='give feedback'/>
      <Button text='good' onClick={() => setGood(good + 1)}/>
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' onClick={() => setBad(bad + 1)}/>
      <Content text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}


export default App
