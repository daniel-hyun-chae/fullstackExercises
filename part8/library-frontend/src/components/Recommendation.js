import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendation = ({show, loading, favoriteGenre}) => {

    const allBooksResult = useQuery(ALL_BOOKS, {
        variables: {
            genre: favoriteGenre
        }
    })  
    const books = allBooksResult.loading ? [] : allBooksResult.data.allBooks



    if (!show) {
        return null
    }

    if (loading) {
        return <div>Loading..</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <div>Books in your favorite genre {favoriteGenre}</div>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
        
    )
}

export default Recommendation