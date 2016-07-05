import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import News from './components/news.jsx'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){

	}
	render(){
		return(
			<containter>
				<header>
					<div className="logo">
						<div className="slogan">We are Digital Creatives</div>
					</div>
				</header>
				<section className="main">
					<div className="steam">
						<iframe src="http://store.steampowered.com/widget/269690/" frameborder="0" width="100%" height="190"></iframe>
					</div>
				</section>
			</containter>
		)
	}
}
