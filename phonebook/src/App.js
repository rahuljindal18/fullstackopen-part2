import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'

import personService from './service/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll('/api/persons')
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
    const found = persons.find(person => (person.name.toLowerCase() === newName.toLowerCase() || person.name.toLowerCase().includes(newName.toLowerCase())))
    
    if(found === undefined){
        const newObj = {
            name : newName,
            number: phone
        }
        personService.createPerson(newObj)
                .then(response => {
                  setNotification(`Added ${newObj.name}`)
                  setTimeout(() => {
                    setNotification(null)
                  }, 5000)
                  setPersons([...persons,response.data])
                  setNewName('')
                })
        
    }
    else if(found){
        const newObj = {...found,number:phone}
        if(window.confirm(`${found.name} is already added to phonebook, replace the old number with the new one`)){
          personService.updatePerson(newObj,found.id)
          .then(response => {
            setPersons(persons.map( person => person.id !== found.id ? person : response.data))
          })
        }
        
    }
    else{
        alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) { 
      const id = person.id
      personService.personDelete(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id ))
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter 
        searchText={searchText} 
        onSearchChange={onSearchChange}
      />
      <br/>
      <h3>Add a new </h3>
      <PersonForm 
        newName={newName} 
        phone={phone} 
        handleInputChange={handleInputChange} 
        handlePhoneChange={handlePhoneChange} 
        onFormSubmit={onFormSubmit}
      />
      <a href="javascript: alert('heloo')"/>
      <h3>Numbers</h3>
      {
        persons.map(person => 
          <div key={person.id}>
            <p>{person.name} : {person.number}</p>
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        )
      }
    </div>
  )
}

export default App