import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState(' ')

  const addName = (event) => {
    event.preventDefault()
  }
  const handleEvent = (event) => {
    setNewName(event.target.value)
    console.log(newName);
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleEvent}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
    </div>
  )
}

export default App 