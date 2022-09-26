import * as React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Questions from './components/Questions'
import ErrorPage from './components/ErrorPage'
import { AppStateContext } from './contexts/appStateContext'
import Results from './components/Results'

export default function App() {
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('menu')
  const [questions, setQuestions] = useState(null)
  // const [subject, setSubject] = useState('')

  return (
    <>
      <AppStateContext.Provider
        value={{
          score,
          setScore,
          gameState,
          setGameState,
          questions,
          setQuestions
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="questions/:subject" element={<Questions />} />
            <Route path="questions/:subject/results" element={<Results />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AppStateContext.Provider>
    </>
  )
}
