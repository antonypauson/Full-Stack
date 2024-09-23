import { useState } from "react"

const Person = ({person}) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filteredPerson, setFiltered] = useState(persons)
  const [filter, setFilter] = useState('')

  

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
      const obj = {name: newName,number: newNum,id: persons.length + 1}
      const updatedPersons = persons.concat(obj)
      setPersons(updatedPersons)
      setFiltered(updatedPersons)
    }
    
    setNewName('')
    setNewNum('')
  }

  const handleEventName = (event) => {
    setNewName(event.target.value)
  }

  const handleEventNum = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterEvent = (event) => {
    const filterValue = event.target.value
    setFilter(filterValue)
    if (filter === '') {
      setFiltered(persons)
    }
    else {
      const filteredNames = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFiltered(filteredNames)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterEvent}/>
      <h2>add a new</h2>
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
      {filteredPerson.map(person => 
        <Person person={person} key={person.name}/>
      )}
    </div>
  )
}

export default App 