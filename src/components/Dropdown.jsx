import React from 'react'
import { Dropdown } from 'primereact/dropdown';
        

const DropDown = ({ currencies, title, currency, setCurrency }) => {

  return (
    <div>
        <Dropdown 
          name='dropdown'
          placeholder={title}
          options={currencies}
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        />
    </div>
  )
}

export default DropDown