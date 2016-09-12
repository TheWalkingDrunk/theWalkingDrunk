import React from 'react';

class CurrInfoComponent extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidUpdate(){
		// if (this.props.current.photos)
		// 	console.log(this.props.current.photos[0].getUrl())
	}

	render(){
		return (
			<div>
				<div>
					<b>Pub Name: </b>
					{this.props.current.name}
				</div>
				<div>
					<b>Address: </b>
					{this.props.current.vicinity}
				</div>
				<div>
					<b>Rating: </b>
					{this.props.current.rating}
				</div>
				<div>
					<b>Price Level: </b>
					{this.props.current.price_level}
				</div>
			</div>
		);
	}
}

module.exports = CurrInfoComponent;