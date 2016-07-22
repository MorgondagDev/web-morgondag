import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post:props.data,
      showProfile: (props.showProfile ? true : false)
    }

  }
  convertTime(date){
    return (moment(new Date(date)).fromNow() + ':')
  }

  Profile(){
    return(
        <a
          className="profile"
          href={this.state.post.url}
          title={this.state.post.title}>
          <img src={this.state.post.img} alt={this.state.post.name}/>
        </a>
    )
  }

  render(){
    if(!this.state.post){
      return(<tweet></tweet>)
    }
    let profile = '';
    if(this.state.showProfile){
      profile = this.Profile();
    }
    return(
      <twitter className={this.props.className} id={this.state.post.id}>
        <time>{this.convertTime(this.state.post.created_at)}</time>
        <a
          className="from"
          href={this.state.post.url}
          title={this.state.post.title}>
            @{this.state.post.name}
        </a>
        {profile}
        <div className="tweet" dangerouslySetInnerHTML={{__html: this.state.post.tweet}} />
      </twitter>
    )
  }
}
