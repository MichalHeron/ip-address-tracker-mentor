import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const LocalizationContext = React.createContext()

const LocalizationProvider = ({ children }) => {
	const [inputValue, setInputValue] = useState('')
	const [ip, setIp] = useState('')
	const [btnClicked, setBtnClicked] = useState(false)
	const [result, setResult] = useState({
		ip: 'unknown',
		location: 'unknown',
		timezone: 'unknown',
		isp: 'unknown',
		latitude: 'unknown',
		longitude: 'unknown',
		ipok: false,
	})

	useEffect(() => {
		const myIpUrl = '/json'
		const getData = async () => {
			const res = await axios.get(myIpUrl)
			setIp(res.data.IPv4)
			if (btnClicked) {
				setBtnClicked(false)
			} else setBtnClicked(true)
		}
		return () => getData()
	}, [])

	useEffect(() => {
		if (inputValue || ip) {
			// const inputApi =
			// 	'https://geo.ipify.org/api/v2/country,city?apiKey=at_0I692sdxIoDK5TfMN7vR51SzrdzjB&ipAddress=' + ip
			const inputApi =
				'https://geo.ipify.org/api/v2/country,city?apiKey=at_O4uVrR001txXiCERuiSEoNk6KIFKt&ipAddress=' + ip
			fetch(inputApi)
				.then(res => res.json())
				.then(res => {
					if (res.code === 403) {
						console.log('przekroczono miesięczną ilosc darmowych zapytań')
						setResult({
							ip: 'przekroczono',
							location: 'miesięczną',
							timezone: 'ilość',
							isp: 'zapytań',
                            ipok: false,
						})
						return
					}
					if (res.code === 422) {
						setInputValue('Wprowadź właściwe IP')
						return
					} else {
						setResult({
							ip: res.ip,
							location: res.location.city,
							timezone: res.location.timezone,
							isp: res.isp,
							latitude: res.location.lat,
							longitude: res.location.lng,
							ipok: true,
						})
					}
				})
		} else console.log('wczytywanie ip...')
	}, [btnClicked])

	const value = {
		inputProps: {
			value: inputValue,
			onInput: e => {
				setInputValue(e.target.value)
			},
		},
		btnSub: {
			onClick: () => {
				console.log('wcisnieto')
				setIp(inputValue)
				setInputValue('')
				if (btnClicked) {
					setBtnClicked(false)
				} else setBtnClicked(true)
			},
		},
		result: {
			ip: result.ip,
			location: result.location,
			timezone: result.timezone,
			isp: result.isp,
			lat: result.latitude,
			lng: result.longitude,
			ipok: result.ipok,
		},
	}

	return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>
}

export default LocalizationProvider
