import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

export default class extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			news: [],
			isLoading:false,
      medium: [],
      twitter: [],
      instagram:[]
		}
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		fetch('https://s3-eu-west-1.amazonaws.com/morgondag/static-api/social.json', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }, cors:true
    })
    .then((res) => {
        return res.json()
    }).then((json) => {
        this.setState({medium:json.medium, twitter: json.twitter, instagram:json.instagram})
        console.log(json)
    }).catch((ex) => {
        console.log(ex)
    })

		fetch('https://s3-eu-west-1.amazonaws.com/morgondag/static-api/news.json', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }, cors:true
    }).then((res) => {
        return res.json()
    }).then((json) => {
      	 this.setState({news: json})
    }).catch((ex) => {
      console.log(ex)
    })
	}

	render(){
		if(this.state.isLoading){
			return(
				<section>
					loading..
				</section>
			)
		} else {
			return(
				<section>
           {this.state.instagram.map((post) => {
              return (
                  <li key={post.id}>
                    <a href={post.url} title={post.caption}>
                      <img src={post.thumbnail_src} alt={post.caption}/>
                      {post.likes}
                    </a>
                  </li>
              )
           })}

           {this.state.twitter.map((post) => {
              return (
                  <li key={post.id}>

                    <a href={post.url} title={post.name}> {moment(new Date(post.created_at)).fromNow()}: @{post.name}</a>
                    <img src={post.img} alt={post.name}/>
                    <div dangerouslySetInnerHTML={{__html: post.tweet}} />
                  </li>
              )
           })}


           {this.state.medium.map((post) => {
              return (
                  <li key={post.id}>
                    <a target="_blank" title={post.title} href={post.url}><img width="200" src={post.img} alt={post.title}/></a>
                    <a target="_blank" title={post.title} href={post.url}><h2>{post.title}</h2></a>
                    <a target="_blank" title={post.title} href={post.url}><h2>{post.date}</h2></a>
                    <p>{post.description} <a target="_blank" href={post.url} title={post.title}>read more.</a></p>
                  </li>
              )
           })}


          {this.state.news.map((post) => {
          				return <li key={post.id}>
          				<a target="_blank" title={post.title} href={post.url}><img width="200" src={post.image_url} alt={post.title}/></a>
          				<a target="_blank" title={post.title} href={post.url}><h2>{post.title}</h2></a>
          				<a target="_blank" title={post.title} href={post.url}><h2>{  moment(post.date).format('MMMM DD, YYYY')  }</h2></a>
          				<p>{post.description} <a target="_blank" href={post.url} title={post.title}>read more.</a></p>

          				</li>;
        	})}
				</section>
			)
		}
	}
}
