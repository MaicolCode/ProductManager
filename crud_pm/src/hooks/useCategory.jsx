import { useContext } from 'react'
import { CategoryContext } from '../contexts/category'

export const useCategory = () => {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
    filterCategories
  } = useContext(CategoryContext)

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
    filterCategories
  }
}
