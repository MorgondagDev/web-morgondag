import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import 'whatwg-fetch';
import {Promise} from 'es6-promise'

import Twitter from './components/twitter.jsx'

const ctas = [
	'news',
	'early access',
	'beta invites',
	'giveaways',
	'devlog'
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
				//medium: json.medium,
				twitter: json.twitter,
				instagram: json.instagram,
				news: json.news,
				archive: json.archive
			})
		}).catch((ex) => {
			console.log(ex)
		})

		this.rotateCTA()
	}

	renderMorgondagTwitter(){
		if(this.state.twitter){
			return (<Twitter className="twitter_morgondag" showProfile={false} data={this.state.twitter[2]}/>)
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

	renderNews(){
		if(this.state.news){
			return (
				<ul className="cards">
					{this.state.news.map((post) => {
						return <li key={post.id}>
						<a target="_blank" title={post.title} href={post.url}><img width="200" src={post.image_url} alt={post.title}/>
							<div className="meta">
								<h2>{post.title}</h2>
								<p>{moment(post.date).format('MMMM DD, YYYY')}</p>
								<p>{post.description}</p>
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

	render(){
		return(
			<containter>
				<header>
					<div className="logo"></div>
					{this.renderMorgondagTwitter()}
				</header>
				<section className="main">

					<ul className="column-cards">
						<li>
							<a href="https://imprint-x.com" className="game-card imprintx" title="imprint-X"></a>
							<a href="https://imprint-x.com" title="imprint-X"><h2>imprint-X</h2></a>
							<a href="https://imprint-x.com/" className="btn playBtn" title="Play imprint-X">► imprint-X</a>
						</li>
						<li>
							<a href="http://rymdresa.com" className="game-card rymdresa" title="RymdResa"></a>
							<a href="http://rymdresa.com" title="RymdResa"><h2>RymdResa</h2></a>
							<a href="https://imprint-x.com/" className="btn playBtn purple" title="Play RymdResa">► RymdResa</a>
						</li>
					</ul>



					<div className="columns">
						<div className="left">
							{this.renderImprintTwitter()}
						</div>
						<div className="right">
							{this.renderRymdResaTwitter()}
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="columns">
						{this.renderNews()}
						<div className="clearfix"></div>
					</div>

					<section>
						{this.renderArchive()}
					</section>


					<section className="team-info">
						<h2>We are digital creatives</h2>
						<p>Together as a couple we design, develop and create digital experiences, games, apps, sites and art.</p>
					</section>

					<div className="columns team">
						<div className="left">
							<h3>Vendela Carberg Larsson</h3>
							<p><a href="mailto:vendela@morgondag.nu" title="Send a mail to Vendela">Mail</a></p>
							<p><a href="http://twitter.com/vemdel" title="Talk to Vendela on Twitter">Twitter</a></p>
							<p><a href="http://vendela-carlberg-larsson.com/" title="Visit Vendela Carlberg Larsson">Site</a></p>
							{this.renderVendelaTwitter()}
						</div>
						<div className="right">
							<h3>Kim Aarnseth</h3>
							<p><a href="mailto:kim@morgondag.nu" title="send an email to Kim Aarnseth">Mail</a></p>
							<p><a href="http://twitter.com/Kim_aarnseth" title="Reach out to Kim on Twitter">Twitter</a></p>
							<p><a href="http://kimaarnseth.com/" title="Visit Kim Aarnseth homepage">Site</a></p>
							{this.renderKimTwitter()}
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="steam">
						<iframe src="http://store.steampowered.com/widget/434310/" frameBorder="0" width="100%" height="190"></iframe>
					</div>

					<div className="steam">
						<iframe src="http://store.steampowered.com/widget/269690/" frameBorder="0" width="100%" height="190"></iframe>
					</div>

					 {this.renderInstagram()}


				<section>
					<div className="center">
						<a href="http://morgondag.us3.list-manage2.com/subscribe?u=0c6b4fd7d0dc95e81024c3c51&id=970ded45b7" className="btn">Signup for {this.state.ctaText}!</a>
					</div>
				</section>

				<section className="social">

					<h2>Follow us!</h2>
					<ul>
						<li>
							<a href="https://www.facebook.com/morgondagdev" title="Morgondag on Twitter">twitter</a>
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
							<a href="http://morgondag-nu.tumblr.com" title="Morgondag on Tumblr">tumblr</a>
						</li>
						<li>
							<a href="https://www.youtube.com/channel/UCIGlLCIdHqDhUiao1LmAFoA" title="Morgondag on Youtube">Youtube</a>
						</li>
						<li>
							<a href="http://patreon.com/morgondag" title="Morgondag on Patreon">patreon</a>
						</li>
						<li>
							<a href="https://itunes.apple.com/us/artist/morgondag/id717203990" title="Morgondag on IOS">appstore</a>
						</li>
						<li>
							<a href="mailto:vendela@morgondag.nu" title="Morgondag email">email</a>
						</li>
						<li>
							<a href="http://github.com/morgondagdev" title="Morgondag on Github">github</a>
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
