import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import News from './news.jsx'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){

	}
	render(){
		return(
			<section>
				<h1>Morgondag</h1>
				<News/>
			</section>
		)
	}
}
