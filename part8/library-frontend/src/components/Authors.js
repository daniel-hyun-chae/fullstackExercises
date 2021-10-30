import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import BirthYearForm from './BirthYearForm'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  const authors = result.loading ? [] : result.data.allAuthors

  return (
    <div>
      <h2 className="text-2xl uppercase">authors</h2>
      <table className="my-5">
        <tbody>
          <tr>
            <th></th>
            <th className="border px-2 py-1">
              born
            </th>
            <th className="border px-2 py-1">
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td className="border px-2 py-1">{a.name}</td>
              <td className="border px-2 py-1">{a.born}</td>
              <td className="border px-2 py-1">{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYearForm authors = {authors} show={props.showBirthYearForm}/>
    </div>
  )
}

export default Authors
