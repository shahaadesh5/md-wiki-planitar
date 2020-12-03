import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home() {
  const [articles, setArticles] = useState([]);

  useEffect (() => {
      fetchData()
  }, [])

  const fetchData = () => {
    // const host = 'http://localhost:9090'
    fetch(`/api/articles`)
    .then(response => response.json())
    .then(data => setArticles(data));
  }

  return (
    <div className="home">
      {articles.length ?
        (
          <div>
            <h2>Articles found:</h2>
            <ul>
              {articles.map(article => {
                return(
                  <li>
                    <Link to={{ pathname: `/articles/${article.name}`}}>
                      {article.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
        :
        (
          <div>
            No Articles found
          </div>
        )  
    }
    </div>
  );
}

export default Home;
