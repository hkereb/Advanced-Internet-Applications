import Header from "./components/Header"
import Entry from "./components/Entry"
import data from "./data.json"
import React from "react"

export default function App() {

  const entryElements = data.map((entry) => {
    return (
        <Entry
            key={entry.key}
            entry={entry}
        />
    )
  })

  return (
      <>
        <Header />
        <main className="container">
            {entryElements}
        </main>
      </>
  )
}