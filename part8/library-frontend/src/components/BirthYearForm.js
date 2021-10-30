import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const BirthYearForm = ({authors, show}) => {
    const [ name, setName ] = useState('')
    const [ bornYear, setBornYear ] = useState('')
    const [ editBirthYear ] = useMutation(EDIT_AUTHOR)

    const updateAuthor = (event) => {
        event.preventDefault()
        editBirthYear({
            variables: { name, setBornTo: parseInt(bornYear) }
        })
        setName('')
        setBornYear('')
    }

    if (!show) {
        return null
      }

    return (
        <div>
            <h2 className="text-2xl uppercase">Set Birthyear</h2>
            <form onSubmit={updateAuthor} className="space-y-2 my-5">
                <select value={name} onChange={e=> setName(e.target.value)} className="border">
                    { authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
                </select>
                <div>
                    Born <input value={bornYear} onChange={e => setBornYear(e.target.value)} className="border-b-2"/>
                </div>
                <button disabled={name===''} type="submit" className="btn-sm">Update Author</button>
            </form>
        </div>
    )
}

export default BirthYearForm