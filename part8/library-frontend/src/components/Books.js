import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks

  const filteredBooks = genre === 'all' ? books : books.filter(book => {
    return book.genres.includes(genre)
  })

  const genres = books.length === 0 ? [] : books.reduce((acc, current) => {
    current.genres.forEach(genre => {
      if (!acc.includes(genre)){
        acc.push(genre)
      }
    })
    return acc
  }, [])

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => <button key={genre} onClick={event=>setGenre(genre)}>{genre}</button>)}
      <button onClick={event=>setGenre('all')}>All genres</button>
    </div>
  )
}

export default Books