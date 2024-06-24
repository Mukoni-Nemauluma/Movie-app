import React from "react"
import { Link } from "react-router-dom"

const NoResults = () => {
  return (
    <div className="no-results">
      <h1>No Results Found☹️</h1>
      <p>Sorry, we couldn't find any results for your search.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  )
}

export default NoResults
