import { useState, useEffect } from "react"
import axios from 'axios'
import personServices from './services/persons'

const Persons = ({persons, deleteName}) => {
  return(
    <div>
      {persons.map(person => 
      <Person person={person} key={person.name} deleteName={() => deleteName(person.id, person.name)}/>
    )}
    </div>
    
  )
}
const Person = ({person, deleteName}) => <p>{person.name} {person.number} <button onClick={deleteName}>delete</button></p>

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

  const deleteName = (id,name) => {
    console.log(`delete ${id}`)

    if (window.confirm(`Delete ${name} ?`)) {
      console.log("DELETED")
      personServices.deletethis(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setFiltered(filteredPerson.filter(person => person.id !== id))
    })

  }
}

  const addName = (event) => {
    event.preventDefault()
    let nameExists = false
    let upId = 0
    persons.forEach(person => {
      if (person.name.toLowerCase() === newName.toLowerCase()){
        nameExists = true
        upId = person.id
      }
    })
    //to check if it already exists
    if (nameExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        console.log(newName, 'will be updated!')
        const upPerson = persons.find(p => p.id === upId)
        const changedPersons = {...upPerson, number: newNum}

        axios.put(`http://localhost:3001/persons/${upId}`, changedPersons)
        .then(response => {
          setFiltered(persons.map(n => n.id !== upId ? n : response.data))
        })
      }
    }
    else {
      const obj = {name: newName,number: newNum}
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
      <Persons persons={filteredPerson} deleteName={deleteName}/>
    </div>
  )
}

export default App 