import React from 'react'

const Filter = ({searchText, onSearchChange}) => (
    <div>filter shown with <input value={searchText} onChange={onSearchChange}/></div>
)

export default Filter