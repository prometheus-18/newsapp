import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

const News = ({ country, pageSize, category, apiKey, setProgress }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        try {
            setProgress(10);
            setLoading(true);

            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
            let response = await fetch(url);
            setProgress(30);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();
            setProgress(70);

            setArticles(data.articles || []);
            setTotalResults(data.totalResults || 0);
            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error("Failed to fetch news:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, category]); // Re-fetch news when country or category changes

    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

            let response = await fetch(url);
            let data = await response.json();

            setPage(nextPage);
            setArticles((prevArticles) => [...prevArticles, ...(data.articles || [])]);
            setTotalResults(data.totalResults || 0);
        } catch (error) {
            console.error("Error fetching more news:", error);
        }
    };

    return (
        <div className="container my-3">
            <div className="text-center" style={{ marginTop: '80px' }}>
                <h1>NewsThread - Top Headlines</h1>
                {loading && <Spinner />}
            </div>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row my-4">
                        {articles.map((element, index) => (
                            <div className="col-md-4" key={element.url || index}>
                                <NewsItem
                                    title={element.title || "No Title"}
                                    description={element.description || "No Description"}
                                    imgUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author || "Unknown"}
                                    date={element.publishedAt}
                                    source={element.source?.name || "Unknown"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
};

export default News;
