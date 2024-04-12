import React, { useEffect, useState } from 'react'
import DropDown from './Dropdown';
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import { InputNumber } from 'primereact/inputnumber';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [currencyFrom, setCurrencyFrom] = useState("USD");
    const [currencyTo, setCurrencyTo] = useState("INR");
    const [amount, setAmount] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchCurrencies = async () => {
        const res = await fetch('https://api.frankfurter.app/currencies');
        const data = await res.json();

        setCurrencies(Object.keys(data));
    }

    const getConvertedCurrency = async () => {
        setIsLoading(true);
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`);
        const data = await res.json();

        setConvertedAmount(data?.rates?.[currencyTo]);
        setIsLoading(false);
    }

    const handleSwap = () => {
        setCurrencyFrom(currencyTo);
        setCurrencyTo(currencyFrom);
    }

    const handleAmountChange = (e) => {
        console.log(e)
        setAmount(e.value);
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

  return (
    <div>
        <div className='bg-[#FFFFFF] font-poppins p-5 rounded-md w-full flex flex-col justify-center'>
            <h1 className='font-medium text-[#012F73] text-6xl mb-12'>Currency Converter</h1>
            <div className='flex flex-col mb-12'>
                {/* Dropdowns */}
                <p className='self-center text-center text-lg font-bold text-[#073b4c] mb-4'>Select Currency </p>
                <div className='flex justify-around items-center'>
                
                    <DropDown 
                        currencies={currencies} 
                        title='From: '
                        currency={currencyFrom}
                        setCurrency={setCurrencyFrom}
                    />
                    {console.log('currencyFrom', currencyFrom)}
                    <div 
                        className='flex justify-center items-center rounded-full bg-[#dd367b] text-white w-12 h-12 cursor-pointer'
                        onClick={handleSwap}
                    >
                    <HiMiniArrowsRightLeft size={30}/>
                    </div>
                    <DropDown 
                        currencies={currencies}
                        title='To: ' 
                        currency={currencyTo}
                        setCurrency={setCurrencyTo}
                    />
                    {console.log('currencyTo', currencyTo)}
                </div>
            </div>
            <div className='self-end'>
                <label htmlFor="amount" className='text-[#073b4c]'>Amount: </label>
                <InputNumber className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-400' placeholder='Enter Amount' id='amount' onChange={handleAmountChange} value={amount} />

            </div>
            <div className='self-end mt-4' onClick={getConvertedCurrency}>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#012F73] to-[#FF1D7D] group-hover:from-[#012F73] group-hover:to-[#FF1D7D] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-[#012F73] dark:focus:ring-[#FF1D7D]">
                <span className="text-md relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Convert
                </span>
                </button>
            </div>
            {isLoading ? (
                <div className='loader self-center'></div>
            ) : (
                <p className='text-center text-[#073b4c] font-medium '>{`Converted amount is `} <span className='font-bold text-xl text-[#c6347f]'>{convertedAmount}</span></p>

            )}
            
        </div>
    </div>
  )
}

export default CurrencyConverter;