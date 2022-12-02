import React, { useContext } from 'react'
import '../App.css'
import { LocalizationContext } from './context/localizationProvider'

function InputIp () {
const {inputProps, btnSub, result} = useContext(LocalizationContext)

	return (
		<div className='ipApiContainer' style={{ width: '100vw', height: '35vh' }}>
			<div className='wrapper'>
				<h1 className='title'>IP Address Tracker</h1>
				<div className='inputContainer'>
					<input
						className='inputIp'
						type='text'
						id='ip'
						name='ip'
						{... inputProps}
						placeholder='Search for any IP address or domain'></input>
					<button className='submitIp' {... btnSub}></button>
				</div>
				<div className='ipResultContainer'>
					<p className='resultName'>ip address</p>
					<p className='result'>{result.ip}</p>
					<p className='resultName'>location</p>
					<p className='result'>{result.location}</p>
					<p className='resultName'>timezone</p>
					<p className='result'>{result.timezone}</p>
					<p className='resultName'>isp</p>
					<p className='result'>{result.isp}</p>
				</div>
			</div>
		</div>
	)
}

export default InputIp
