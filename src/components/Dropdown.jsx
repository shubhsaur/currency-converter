import React from 'react'

const Dropdown = ({ currencies, title, currency, setCurrency }) => {

  return (
    <div>
        <label htmlFor="currency" className='text-[#073b4c]'>{title}</label>
        <select className='appearance-auto' name="currency" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {currencies && currencies.map(curr => (
            <option key={curr} value={curr}>{curr}</option>
        ))}
        </select>
    </div>
  )
}

export default Dropdown