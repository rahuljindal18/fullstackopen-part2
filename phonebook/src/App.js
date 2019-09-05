import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchText, onSearchChange}) => (
    <div>filter shown with <input value={searchText} onChange={onSearchChange}/></div>
)

const PersonForm = ({newName,phone,handleInputChange,handlePhoneChange,onFormSubmit}) => (
    <form onSubmit={onFormSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleInputChange}/>
        </div>
        <div>number: <input type="text" value={phone} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ searchText, setSearchText ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
      setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }
  const onSearchChange = (event) => {
      const text = event.target.value
      const newArr = persons.filter(person => person.name.toLowerCase().includes(text.toLowerCase()))
      if(text){
        setPersons(newArr)
      }
      else{
        setPersons([
            { name: 'Arto Hellas', number: '040-123456' },
            { name: 'Ada Lovelace', number: '39-44-5323523' },
            { name: 'Dan Abramov', number: '12-43-234345' },
            { name: 'Mary Poppendieck', number: '39-23-6423122' }
          ])
      }
      
      setSearchText(text)
  }
  const onFormSubmit = (event) => {
    event.preventDefault()
    const found = persons.find(person => (person.name === newName || person.name.toLowerCase().includes(newName.toLowerCase())))
    if(found === undefined){
        const newObj = {
            name : newName,
            number: phone
        }
        setPersons([...persons,newObj])
        setNewName('')
    }
    else{
        alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} onSearchChange={onSearchChange}/>
      <br/>
      <h3>Add a new </h3>
      <PersonForm newName={newName} phone={phone} handleInputChange={handleInputChange} handlePhoneChange={handlePhoneChange} onFormSubmit={onFormSubmit}/>
      <h3>Numbers</h3>
      {persons.map(person => <p key={person.name}>{person.name} : {person.number}</p>)}
    </div>
  )
}

export default App