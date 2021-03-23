import React, { useEffect, useState } from "react";
import { database } from '../config'

const useDatabase = () => {

  const [databaseBooks, setDatabaseBooks] = useState([])
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //  Getting books info from Realtime database
    const databaseRef = database.ref(`bookstore`).get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const booksObject = snapshot.val()
          const data = Object.values(booksObject)
          setDatabaseBooks(data)

        } else {
          console.log('No data evailable')
        }
      }).catch((error) => {
        console.error('databaseRef: ', error)
      })
    return () => databaseRef
  }, [])

  useEffect(() => {
    // Books' categories 
    const categoriesFromDatabaseBooks = [...new Set(databaseBooks
      .map((book) => book.categoryName)
      .flat())]

    setCategories(categoriesFromDatabaseBooks)

    // Categories with relevant books
    const categoriesData = categoriesFromDatabaseBooks
      .map((category, index) => {
        const booksFromCurrentCategory = databaseBooks
          .filter(book => book.categoryName.includes(category))
        return {
          id: index,
          categoryName: category,
          books: booksFromCurrentCategory
        }
      })

    setCategories(categoriesData)

  }, [databaseBooks])






  return { databaseBooks, categories }

}

export default useDatabase
