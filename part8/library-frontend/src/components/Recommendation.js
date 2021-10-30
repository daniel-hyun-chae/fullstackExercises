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
            <h2 className="text-2xl uppercase">Recommendations</h2>
            <div>Books in your favorite genre {favoriteGenre}</div>
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
            {books.map(a =>
              <tr key={a.title}>
                <td className="border px-2 py-1">{a.title}</td>
                <td className="border px-2 py-1">{a.author.name}</td>
                <td className="border px-2 py-1">{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        
    )
}

export default Recommendation