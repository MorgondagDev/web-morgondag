import React, { Component } from 'react'
import { render } from 'react-dom'

import App from './app.jsx'

window.addEventListener('DOMContentLoaded', ()=> {
	render((
		<app>
			<App />
		</app>
	), document.querySelector('section'))
}, false)
