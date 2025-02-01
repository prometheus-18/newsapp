import React, { Component } from 'react'

export class NewsItem extends Component {
   
    render() {
        let { title, description,imgUrl,newsUrl,author,date,source } = this.props
        return (
            <div className='my-3'>
                <div className="card">
                <span className="position-absolute top-0 end-0 badge square-pill bg-danger"
                          style={{ zIndex: '1', fontSize: '0.8rem', padding: '7px 12px' }}>
                        {source}
                    </span>
                    <img className="card-img-top" src={!imgUrl?"https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png":imgUrl} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toUTCString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
