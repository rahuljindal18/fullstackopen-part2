import React from 'react'

const PersonForm = ({newName,phone,handleInputChange,handlePhoneChange,onFormSubmit}) => (
    <form onSubmit={onFormSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleInputChange}/>
        </div>
        <div>number: <input type="text" value={phone} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm