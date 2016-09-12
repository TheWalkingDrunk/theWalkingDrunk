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
				<h4><font color="#F08080">Current Bar Details</font></h4>
				<div>
					<b><font color="#F08080">Bar Name:- </font></b>
					{this.props.current.name}
				</div>
				<div>
					<b><font color="#F08080">Address:- </font></b>
					{this.props.current.vicinity}
				</div>
				
				
				<div >
					<b><font color="#F08080">Rating:- </font></b>
					{this.props.current.rating}
				</div>
				<div >
					<b><font color="#F08080">Price:- </font></b>
					{this.props.current.price_level}
				</div>
			</div>
		);
	}
}

module.exports = CurrInfoComponent;