const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.parts.part} {props.parts.exercise}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
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
  const parts = [
    { part: part1, exercise: exercises1},
    { part: part2, exercise: exercises2},
    { part: part3, exercise: exercises3},

  ]

  return (
    <>
     <Header course={course} />
     <Content parts={parts} />

     <Total total={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App