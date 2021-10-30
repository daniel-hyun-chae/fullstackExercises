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
      <h2 className="text-2xl uppercase">books</h2>
      <table className="my-5">
        <tbody>
          <tr>
            <th></th>
            <th className="border px-2 py-1">
              author
            </th>
            <th className="border px-2 py-1">
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td className="border px-2 py-1">{a.title}</td>
              <td className="border px-2 py-1">{a.author.name}</td>
              <td className="border px-2 py-1">{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="space-x-2">
        {genres.map(genre => <button className="btn-sm" key={genre} onClick={event=>setGenre(genre)}>{genre}</button>)}
        <button className="btn-sm" onClick={event=>setGenre('all')}>All genres</button>
      </div>
    </div>
  )
}

export default Books