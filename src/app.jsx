import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import 'whatwg-fetch';
import {Promise} from 'es6-promise'

import Twitter from './components/twitter.jsx'

const ctas = [
	'Signup!',
	'Send',
	'Get the info!',
	'Add your email!',
	'Feel the love!'
]

let archiveCount = 0;


export default class extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			//medium: props.medium,
			twitter:props.twitter,
			instagram:props.instagram,
			news: props.news,
			archive: props.archive,
			cta:0,
			ctaText:'Signup',
			t: Date.now()
		}

		this.incrementArchive = this.incrementArchive.bind(this);
		if( location.href.indexOf("https") > -1){
			location.href = "http://morgondag.nu"
		}
	}


	rotateCTA() {
		setTimeout(() => {
			this.rotateCTA();
		}, 2500);


		let current = this.state.cta += 1;

		if(current > ctas.length-1){
			current = 0
		}

		this.setState({
			cta:current,
			ctaText: ctas[current]
		})
	}

	componentDidMount(){
		fetch('http://static.morgondag.nu/social.json', {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			cors: true
		})
		.then((res) => {
			return res.json()
		}).then((json) => {
			this.setState({
				twitter: json.twitter,
				instagram: json.instagram,
				blog: json.blog
			})
		}).catch((ex) => {
			console.log(ex)
		})

		this.rotateCTA()
	}

	renderMorgondagTwitter(){
		if(this.state.twitter){
			return (<Twitter showProfile={true} data={this.state.twitter[2]}/>)
		}
	}

	renderRymdResaTwitter(){
		if(this.state.twitter){
			return (<Twitter showProfile={true} data={this.state.twitter[0]}/>)
		}
	}

	renderImprintTwitter(){
		if(this.state.twitter){
			return (<Twitter showProfile={true} data={this.state.twitter[1]}/>)
		}
	}

	renderVendelaTwitter(){
		if(this.state.twitter){
			return (<Twitter showProfile={true} data={this.state.twitter[3]}/>)
		}
	}

	renderKimTwitter(){
		if(this.state.twitter){
			return (<Twitter showProfile={true} data={this.state.twitter[4]}/>)
		}
	}

	incrementArchive(c){
		archiveCount += 1;
		this.setState({t: Date.now()})

	}

	renderArchive(){
		if(this.state.archive){
			let moreBtn = ""
			if(archiveCount < this.state.archive.length){
				let left = this.state.archive.length-archiveCount;

				moreBtn = <li class="more"><div className="btn" onClick={this.incrementArchive}>Show More ({left})</div></li>;
			}

			return(
				<ul className="list">
					{this.state.archive.slice(0,archiveCount).map((post) => {
						return <li key={post.id}>
							<div className="meta">
								<a target="_blank" title={post.title} href={post.url}>
									<h3>{post.title}</h3>
									<p>{moment(post.date).format('MMMM DD, YYYY')}</p>
								</a>
								<p>{post.description}</p>
							</div>
						</li>
					})}
					{moreBtn}
				</ul>
			)
		}
	}

	renderInstagram(){
		if(this.state.instagram){
			return(
				<ul className="instagram">
					{this.state.instagram.map((post) => {
						return (
						  <li key={post.id}>
							<a href={post.url} title={post.caption}>
							  <img src={post.thumbnail_src} alt={post.caption}/>
							  <div className="like">{post.likes}</div>
							</a>
						  </li>
						)
					})}
				</ul>
			)
		}
	}

	renderBlog(){
		if(this.state.blog){
			return (
				<ul className="cards">
					{this.state.blog.map((post, index) => {
						return <li key={index}>
						<a target="_blank" title={post.title} href={post.url}><img width="200" src={post.img} alt={post.title}/>
							<div className="meta">
								<h2>{post.title}</h2>
								<p>{moment(post.date).format('MMMM DD, YYYY')}</p>

							</div>
						</a>
						</li>
					})}
				</ul>
			)
		}
	}

	/*
	renderMedium(){
		if(this.state.medium){
			return(
				<ul className="cards">
					{this.state.medium.map((post) => {
					  return (
						  <li key={post.id}>
							<a target="_blank" title={post.title} href={post.url}><img width="200" src={post.img} alt={post.title}/>
									<div className="meta">
									<h2>{post.title}</h2>
									<p>{post.date}</p>
									<p>{post.description}</p>
								</div>
							</a>
						  </li>
					  )
					})}
				</ul>
			)
		}
	}
	*/

	onSubmit(e){

		var name = document.querySelector('input[name="name"]').value
		try {
			if(name.length > 0){
				if(name.substring(0, 2) == "5a" || name.substring(0, 2) == "59" ||  name.substring(0, 2) == "59"){
					e.preventDefault();
					location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
					return;
				}
			}
		} catch(e){

		}
	}

	renderSignup(){
		return(<section className="signup">
			<div className="center">
				<h1> {'<3'} </h1>
				<p className="msg">Fill in your email below and we will send you our finest breadcrumbs in form of secrets, offers and most importantly updates and awesome news about our next playable universe!</p>
			      <form action="http://send.morgondag.nu/subscribe" method="POST" acceptCharset="utf-8">
			      	<div className="box">
			      		<div className="inputfield">
			      		<label htmlFor="name">Name:</label>
			      			<input type="text" name="name" id="name" placeholder="My amazing name" required/>
			      		</div>
			      		<div className="inputfield">
			      			<label htmlFor="email">Email:</label>
			        		<input type="email" name="email" id="email" placeholder="amazing@mail.com" required />
			        	</div>
			        </div>
			        <br />
			        <input type="hidden" name="list" defaultValue="XgSgS5WieFsaj5aMSyZoKQ" />
			        <input type="hidden" name="ref" defaultValue="web-morgondag" />
			        <input type="hidden" name="subform" value="yes"/>
			        <input type="submit" name="submit" id="submit" value={this.state.ctaText} />
			        <p><em>(PS. Please check your spamfolder for a confirmation mail and mark it as not-spam)</em></p>
			      </form>
			</div>
		</section>)
	}

	render(){
		return(
			<containter>
				<header>
					<div className="logo"></div>

				</header>
				<section className="main">

					{this.renderSignup()}

					<ul className="column-cards">
						<li>
							<a href="https://lunar-soil.com" className="game-card lunarsoil" title="Lunar Soil"></a>
							<a href="https://lunar-soil.com" title="Lunar Soil"><h2>Lunar Soil</h2></a>
							<a href="https://lunar-soil.com/" className="btn playBtn yellow" title="Play Lunar Soil">► Lunar Soil</a>
						</li>
						<li>
							<a href="https://imprint-x.com" className="game-card imprintx" title="imprint-X"></a>
							<a href="https://imprint-x.com" title="imprint-X"><h2>imprint-X</h2></a>
							<a href="https://imprint-x.com/" className="btn playBtn" title="Play imprint-X">► imprint-X</a>
						</li>
						<li>
							<a href="http://rymdresa.com" className="game-card rymdresa" title="RymdResa"></a>
							<a href="http://rymdresa.com" title="RymdResa"><h2>RymdResa</h2></a>
							<a href="http://rymdresa.com" className="btn playBtn purple" title="Play RymdResa">► RymdResa</a>
						</li>
					</ul>

					<div className="columns">
						<div className="left">

						</div>
						<div className="right">

						</div>
						<div className="clearfix"></div>
					</div>

					<div className="columns">
						<p><br/></p>
						<p><br/></p>
						<p><br/></p>
						<h3>Blog and news:</h3>
						{this.renderBlog()}
						<div className="clearfix"></div>
					</div>

					<section>
						{/*this.renderArchive() */}
					</section>


					<section className="team-info">
						<h2>Morgondag</h2>
						<h3>A Swedish Game Studio</h3>
						<p>We publish, design, develop and create unique games filled with our own twist, story, atmosphere and a lot of love.</p>
						<p> We are currently working on our next game <a href="https://lunar-soil.com" title="Lunar Soil">Lunar Soil</a>.
						</p>
						<p><br/></p>
						<p>Follow Morgondag on <a href="http://twitter.com/MorgondagDev" title="Morgondag gamedeveloper on Twitter">Twitter</a> and <a href="https://instagram.com/morgondag" title="Morgondag gamedesign on Instagram">Instagram</a></p>
					</section>

					{this.renderMorgondagTwitter()}

					<div className="steam">
						<iframe src="http://store.steampowered.com/widget/434310/" frameBorder="0" width="100%" height="190"></iframe>
					</div>

					<div className="steam">
						<iframe src="http://store.steampowered.com/widget/269690/" frameBorder="0" width="100%" height="190"></iframe>
					</div>

					<section className="specialinstagrampadding">
						<p><a href="https://instagram.com/morgondag" title="morgondag on instagram">Instagram</a></p>
					</section>
					{this.renderInstagram()}


				{this.renderSignup()}


				<section className="social">

					<h2>Follow us!</h2>
					<ul>
						<li>
							<a href="https://twitter.com/morgondagdev" title="Morgondag on Twitter">twitter</a>
						</li>
						<li>
							<a href="https://www.facebook.com/Morgondag" title="Morgondag on Facebook">facebook</a>
						</li>
						<li>
							<a href="http://www.indiedb.com/company/morgondag" title="Morgondag on IndieDB">indiedb</a>
						</li>
						<li>
							<a href="https://instagram.com/morgondag" title="Morgondag on Instagram">instagram</a>
						</li>
						<li>
							<a href="http://store.steampowered.com/search/?publisher=Morgondag" title="Morgondag on Steam">steam</a>
						</li>

						<li>
							<a href="https://www.youtube.com/channel/UCIGlLCIdHqDhUiao1LmAFoA" title="Morgondag on Youtube">Youtube</a>
						</li>
						<li>
							<a href="https://itunes.apple.com/us/artist/morgondag/id717203990" title="Morgondag on IOS">appstore</a>
						</li>
						<li>
							<a href="mailto:vendela@morgondag.nu" title="Morgondag email">email</a>
						</li>
						<li>
							<a href="http://vendela-carlberg-larsson.com" title="Morgondag Vendela">Vendela</a>
						</li>
						<li>
							<a href="http://kimaarnseth.com" title="Morgondag Kim">Kim</a>
						</li>
					</ul>
				</section>
				</section>
			</containter>
		)
	}
}
