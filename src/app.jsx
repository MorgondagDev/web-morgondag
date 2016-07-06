import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import News from './components/news.jsx'
import TwitterMorgondag from './components/twitter_morgondag.jsx'
import Twitter from './components/twitter.jsx'

export default class extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			medium: props.medium,
			twitter:props.twitter,
			instagram:props.instagram,
			news: props.news
		}
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
				medium: json.medium.slice(0,4),
				twitter: json.twitter,
				instagram: json.instagram,
				news: json.news
			})
		}).catch((ex) => {
			console.log(ex)
		})
	}

	renderMorgondagTwitter(){
		if(this.state.twitter){
			return (<TwitterMorgondag className="twitter_morgondag" data={this.state.twitter[2]}/>)
		}
	}

	renderRymdResaTwitter(){
		if(this.state.twitter){
			return (<Twitter data={this.state.twitter[0]}/>)
		}
	}

	renderImprintTwitter(){
		if(this.state.twitter){
			return (<Twitter data={this.state.twitter[1]}/>)
		}
	}

	renderVendelaTwitter(){
		if(this.state.twitter){
			return (<Twitter data={this.state.twitter[3]}/>)
		}
	}

	renderKimTwitter(){
		if(this.state.twitter){
			return (<Twitter data={this.state.twitter[4]}/>)
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

	render(){
		return(
			<containter>
				<header>
					<div className="logo"></div>
					{this.renderMorgondagTwitter()}
				</header>
				<section className="main">
					<ul className="games">
						<li>
							<a href="#">x</a>
						</li>
						<li>
							<a href="#">x</a>
						</li>
					</ul>

					<div className="columns">
						<div className="left">
							{this.renderRymdResaTwitter()}
							{this.renderNews()}
						</div>
						<div className="right">
							{this.renderImprintTwitter()}
							{this.renderMedium()}
						</div>
						<div className="clearfix"></div>
					</div>


					<section>
						<h2>We are digital creatives</h2>
						<p>Together as a couple we design, develop and create digital experiences, games, apps, sites and art.</p>
						<p>We are located in Sweden, Stockholm! Support us on Patreon.</p>
					</section>

					<div className="columns team">
						<div className="left">
							<h3>Vendela Carberg Larsson</h3>
							{this.renderVendelaTwitter()}
						</div>
						<div className="right">
							<h3>Kim Aarnseth</h3>
							{this.renderKimTwitter()}
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="steam">
						<iframe src="http://store.steampowered.com/widget/269690/" frameBorder="0" width="100%" height="190"></iframe>
					</div>
					 {this.renderInstagram()}
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
