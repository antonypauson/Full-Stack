import { useState } from "react"

const Person = ({person}) => <p>{person.name} {person.number}</p>
const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '23-22-2222222'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let nameExists = false
    persons.forEach(person => {
      if (person.name === newName){
        nameExists = true
      }
    })
    //to check if it already exists
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName,number: newNum}))
    }
    
    setNewName('')
    setNewNum('')
  }

  const handleEventName = (event) => {
    setNewName(event.target.value)
    console.log(newName);
  }

  const handleEventNum = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleEventName}/>
        </div>
        <div>
          number: <input value={newNum} onChange={handleEventNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person person={person} key={person.name}/>
      )}
    </div>
  )
}

export default App 