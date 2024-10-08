const Header = (props) => {
  console.log(props,'Header')
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.parts.name} {props.parts.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props, 'Content')
  return (
    <div>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props,'Total')
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )

}

const App = () => {
  console.log("working?")
  const course = {
    name: 'Half Stack Application Development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }
  return (
    <>
     <Header course={course.name} />
     <Content parts={course.parts} />
     <Total parts={course.parts} />
    </>
  )
}

export default App