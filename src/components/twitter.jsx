import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post:props.data
    }

  }
  convertTime(date){
    return (moment(new Date(date)).fromNow() + ':')
  }
  render(){
    if(!this.state.post){
      return(<tweet></tweet>)
    }
    return(
      <twitter id={this.state.post.id}>
        <time>{this.convertTime(this.state.post.created_at)}:</time>
        <a
          className="from"
          href={this.state.post.url}
          title={this.state.post.title}>
            @{this.state.post.name}
        </a>
        <a
          className="profile"
          href={this.state.post.url}
          title={this.state.post.title}>
          <img src={this.state.post.img} alt={this.state.post.name}/>
        </a>
        <div className="tweet" dangerouslySetInnerHTML={{__html: this.state.post.tweet}} />
      </twitter>
    )
  }
}
