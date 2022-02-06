export default props => {
	let data = props.data

	return (
		<div className="bio-container">
			<p>
				Username: {data.username}
			</p>
			<p>
				email: {data.email}
			</p>
		</div>
	)
}