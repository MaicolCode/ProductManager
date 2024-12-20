import { createContext, useEffect, useState } from 'react'

export const CategoryContext = createContext()

export default function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const filterCategories = (searchTerm) => {
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilter(filteredCategories)
  }

  const addCategory = async (category) => {
    await fetch(`http://localhost:3000/categories/add`, {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    fetchCategories()
  }

  const updateCategory = async (id, category) => {
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    fetchCategories()
  }

  const deleteCategory = async (id) => {
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'DELETE'
    })

    setCategories(categories.filter((category) => category.id !== id))
  }

  async function fetchCategories() {
    const res = await fetch(`http://localhost:3000/categories`)
    const result = await res.json()
    setCategories(result.categories)
    setFilter(result.categories)
  }

  return (
    <CategoryContext.Provider
      value={{
        categories: filter,
        addCategory,
        updateCategory,
        deleteCategory,
        fetchCategories,
        filterCategories
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
