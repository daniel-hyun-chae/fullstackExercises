
import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription, useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import Notification from './components/Notification'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()
  const [getMe, meResult] = useLazyQuery(ME)

  useEffect(()=>{
    const token = localStorage.getItem('library-user-token')
    if (token){
      setToken(token)
    }
  },[])

  useEffect(() => {
    if (token){
      getMe()
    }
  }, [token])

  useEffect(()  => {
    if (!meResult.loading && meResult.called) {
      if (meResult.data.me){
        setFavoriteGenre(meResult.data.me.favoriteGenre)
      } else {
        setFavoriteGenre(null)
        setPage("authors")
      }
    }
  }, [meResult])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const booksInStore = client.readQuery({query: ALL_BOOKS})
    const authorsInStore = client.readQuery({query: ALL_AUTHORS})
    const favoriteBooksInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: favoriteGenre } 
    })

    if (!includedIn(booksInStore.allBooks, addedBook)){
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook)}
      })
    }

    if (!includedIn(favoriteBooksInStore.allBooks, addedBook) && addedBook.genres.includes(favoriteGenre)){
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: favoriteGenre },
        data: { allBooks: favoriteBooksInStore.allBooks.concat(addedBook)}
      })
    }

    if(!includedIn(authorsInStore.allAuthors, addedBook.author)){
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorsInStore.allAuthors.concat(addedBook.author) }
      })
    }
    setMessageType("notification")
    setMessage(`${addedBook.title} by ${addedBook.author.name} added!`)
    setTimeout(()=>{
      setMessageType("")
      setMessage("")
    }, 3000)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  const handleLogout= () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="container mx-auto">
      <div className="space-x-2 mb-5">
        <button className="btn" onClick={() => setPage('authors')}>authors</button>
        <button className="btn" onClick={() => setPage('books')}>books</button>
        {token ? <button className="btn" onClick={() => setPage('add')}>add book</button>: null}
        {token ? <button className="btn" onClick={() => setPage('recommend')}>recommend</button>: null}
        {token ? <button className="btn" onClick={handleLogout}>logout</button>:<button className="btn"onClick={() => setPage('login')}>login</button>}
      </div>
      <Notification 
        message={message}
        messageType={messageType}
      />
      <Authors
        show={page === 'authors'}
        showBirthYearForm={!!token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendation
        show={page === 'recommend'}
        loading = {meResult.loading}
        favoriteGenre = {favoriteGenre}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />  

    </div>
  )
}

export default App