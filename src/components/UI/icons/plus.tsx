import React from 'react'

function Plus({ solid, formattedClassName }: { solid: boolean; formattedClassName: string }) {
  if (solid) {
    return (
      <svg className={`${formattedClassName}`} fill="currentColor" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    )
  }

  return (
    <svg className={`${formattedClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )
}

export default Plus
