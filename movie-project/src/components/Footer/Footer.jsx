import React from "react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <h3 className="text-lg font-semibold mb-4">Coders:</h3>
        <ul>
          <li className="mb-2">
            <a href="[GitHub Link]" target="_blank" className="underline">
              Nonhlanhla Mazibuko
            </a>{" "}
            |{" "}
            <a href="[LinkedIn Link]" target="_blank" className="underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="[GitHub Link]" target="_blank" className="underline">
              Konanani Nemauluma
            </a>{" "}
            |{" "}
            <a href="[LinkedIn Link]" target="_blank" className="underline">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
