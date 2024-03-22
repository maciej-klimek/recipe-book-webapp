import { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import './App.css'

function App() {
  const [recipies, setRecipies] = useState([])

  useEffect(() => {
    fetchRecipies()
  }, [])

  const fetchRecipies = async () => {
    const response = await fetch("http://127.0.0.1:5000/recipies");
    const data = await response.json();
    setRecipies(data.recipies);
    console.log(data.recipies)
  }

  return (
    <RecipeList recipes={recipies}/>
  )
}

export default App
