import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description } = this.props
        return (
            <div>
                <div className="card" style={{ width: '18rem' }}>
                    <img className="card-img-top" src="https://s.yimg.com/ny/api/res/1.2/Vk6XoySWfWcZVq0m5kxiOw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2025-01/d432f180-da97-11ef-bdfc-0e7c78d9a2d6" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href="/" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
