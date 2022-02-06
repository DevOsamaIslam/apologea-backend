import { useSelector } from 'react-redux'

export default () => {

	let alert = useSelector(state => state.alert)
	if(alert)
		return (
			<div className={`alert-container alert-${alert.type}`}>
				<span>{alert.message}</span>
			</div>
		)
	else return ''
}