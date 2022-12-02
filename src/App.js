import Mapp from './components/MapContainer'
import InputIp from './components/InputIp'
import LocalizationProvider from './components/context/localizationProvider'

function App() {
	return (
		<LocalizationProvider>
			<div className='App'>
				<InputIp />
				<Mapp />
			</div>
		</LocalizationProvider>
	)
}

export default App
