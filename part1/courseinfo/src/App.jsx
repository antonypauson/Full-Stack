const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )

}

const App = () => {
  console.log("working?")
  const course = 'Half Stack Application Development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
     <Header course={course}/>
     <Content part={part1} exercise={exercises1}/>
     <Content part={part2} exercise={exercises2}/>
     <Content part={part3} exercise={exercises3}/>
     <Total total={exercises1 + exercises2 + exercises3}/>
    </>
  )
}

export default App