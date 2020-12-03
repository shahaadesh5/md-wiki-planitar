import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import './Article.css';


function Article() {
    const [article, setArticle] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const { name } = useParams();
    // const host = 'http://localhost:9090'

    useEffect (() => {
        fetchData()
    }, [])
  
    const fetchData = () => {
      fetch(`/api/article/${name}`)
      .then(response => response.text())
      .then(data => {
          setArticle(data)
          console.log('Success:', data);
        //   setPreview(data)
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }

    const updateContent = () => {
        fetch(`/api/article/${name}`, {
            method: 'PUT',
            body: preview,
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            window.location.reload();

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
        <div className="article">
            <h1>{name}</h1>
            <div>
                {!editMode?
                    (
                        <div className="text-container">
                            <div className="pull-right">
                                <button className="edit-button" onClick={() => {
                                    setPreview(article)
                                    setEditMode(true)
                                }}>Edit</button>
                            </div>
                            {article!="" ? 
                            (
                                <div className="article-container">
                                    Markdown version of the content:
                                    <div className="markdown-wrapper">
                                        <ReactMarkdown>
                                            {article}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ) :
                            (
                                <div>
                                    <p>`No article with this exact name found. Use Edit button to add it</p>
                                    {/* {addArticleForm ? 
                                    (
                                        <div>
                                            <input type="text" defaultValue={name} />
                                            <textarea></textarea>
                                            <button onClick={() => setAddArticleForm(false)}></button>
                                        </div>
                                    ):
                                    null    
                                } */}
                                </div>
                            )    
                        }
                        </div>
                    ) :
                    (
                        <div className="edit-container">
                            <textarea defaultValue={preview} onChange={e => setPreview(e.target.value)} rows="4" cols="150" />
                            <div className="button-wrapper">
                                <button onClick={updateContent} className="save-button">Save</button>
                                <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
                            </div>
                            <div className="preview-container">
                                <div className="article-container">
                                    Markdown preview:
                                    <div className="markdown-wrapper">
                                        <ReactMarkdown>
                                            {preview}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div style={{marginTop:"20px"}}>
                    <Link to="/">
                        <button className="edit-button">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Article