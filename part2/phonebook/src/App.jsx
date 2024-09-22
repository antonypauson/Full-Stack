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

  const searchFilter = (event) => {
    event.preventDefault()
   const filterNames = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
   )
   console.log(filterNames)
   setFiltered(filterNames)
  }

  const addName = (event) => {
    event.preventDefault()
    let nameExists = false
    filteredPerson.forEach(person => {
      if (person.name === newName){
        nameExists = true
      }
    })
    //to check if it already exists
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setFiltered(filteredPerson.concat({name: newName,number: newNum,id: filteredPerson.length + 1}))
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

  const handleEventFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form onSubmit={searchFilter}>
          filter shown with <input value={filter} onChange={handleEventFilter}/>
        </form>
      </div>
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