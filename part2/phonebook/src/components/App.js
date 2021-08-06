import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

import Filter from './Filter'
import AddPerson from './AddPerson'
import Person from './Person'
import Message from './Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const createMessage = (type, message) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.filter(person => person.name === newName)
    if (existingPerson.length !== 0) {
      const confirm = window.confirm(`${existingPerson[0].name} is already added to phonebook, replace the old number with a new one?`);
      if (confirm) {
        personService.update(existingPerson[0].id, newPerson)
          .then((updatedPerson) => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))

            setNewName('')
            setNewNumber('')
            createMessage("notification", `Updated ${updatedPerson.name}`)
          })
          .catch((err) => {
            createMessage("error", `Information of ${existingPerson[0].name} has already been removed from server`)
          })
      }
      return
    }

    personService.create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        createMessage("notification", `Created ${addedPerson.name}`)
      }).catch((err) => {
        alert(err)
      })
  }

  const deletePerson = (personToDelete) => {
    const confirm = window.confirm(`Delete ${personToDelete.name} ?`)
    if (confirm) {
      personService
        .remove(personToDelete.id)
        .then(setPersons(persons.filter(person => person.name !== personToDelete.name)))
        .catch(err => {
          createMessage("error", `Information of ${personToDelete.name} has already been removed from server`)
        })
    }

  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} messageType={messageType} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <AddPerson handleAddPerson={handleAddPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={() => { deletePerson(person) }} />)}
    </div>
  )
}

export default App