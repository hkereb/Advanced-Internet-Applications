import Header from "./components/Header"
import Entry from "./components/Entry"
import data from "./data.json"
import { useState } from 'react'

export default function App() {

  const [entries, setEntries] = useState(data)

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this element?");
    if (confirmed) {
      setEntries(prev => prev.filter(entry => entry.key !== id));
    }
  }

  const entryElements = entries.map((entry) => {
    return (
      <Entry
          key={entry.key}
          entry={entry}
          onDelete={() => handleDelete(entry.key)}
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