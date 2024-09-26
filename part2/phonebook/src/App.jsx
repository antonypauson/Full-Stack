import { useState, useEffect } from "react"
import axios from 'axios'
import personServices from './services/persons'

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person => 
      <Person person={person} key={person.name}/>
    )}
    </div>
    
  )
}
const Person = ({person}) => <p>{person.name} {person.number}</p>

const Filter = ({value, onChange}) => {
  return (
    <>
      <Input value={value} onChange={onChange} text={'filter shown with:'}/>
    </>
  )
}

const Input = ({value, onChange,text}) => {
  return (
    <div>
      {text}<input value={value} onChange={onChange} />
    </div>
    
  )
}

const PersonForm = ({addName, newName, handleEventName, newNum, handleEventNum}) => {
  return (
    <div>
      <form onSubmit={addName}>
        <Input value={newName} onChange={handleEventName} text='name:'/>
        <Input value={newNum} onChange={handleEventNum} text='number:'/>
        <>
          <button type="submit">add</button>
        </>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filteredPerson, setFiltered] = useState(persons)
  const [filter, setFilter] = useState('')

  
  //handling data from server using hook state
  useEffect(() => {
    
    personServices.getAll()
      .then(intialPersons=> {
        setPersons(intialPersons)
        setFiltered(intialPersons)
      })
  }, [])

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
      
      
      personServices.create(obj)
        .then(newPersons => {
          const updatedPersons = persons.concat(newPersons)
          setPersons(updatedPersons)
          setFiltered(updatedPersons)
        })

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
      <Filter value={filter} onChange={handleFilterEvent}/>

      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleEventName={handleEventName} newNum={newNum} handleEventNum={handleEventNum} />
     
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      <Persons persons={filteredPerson}/>
    </div>
  )
}

export default App 