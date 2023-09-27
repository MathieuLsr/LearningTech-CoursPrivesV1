import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccountService } from '../../Utils/AccountService';
import Post from './Post/Post';
import { fetchPostForum, createPost } from './PostForumJS';
import './styles.css'

export default function PostForum() {

    if(!AccountService.haveUUID()){
        return <div className="notLogged">
            <h1>Vous devez vous connecter pour accéder à cette page.</h1>
            <Link to="/login">Login</Link>
        </div>
    }

  const [listPosts, setListPosts] = useState([]);

    const [PostTitle, setPostTitle] = useState("")
    const [PostBody, setPostBody] = useState("")

  useEffect(() => {

    fetchPostForum(setListPosts)

  }, []);

  return (
    <div className="forum-container">
        
        <h1>Forum</h1>

        <div className="post-list">
            <p>
                {listPosts.map(post => (
                    <Post post={post}/> 
                ))}
            </p>
        </div>

        <div>

            <div className="post-input">
                <label htmlFor="post-input">Titre :</label>
                <input type="text" id="post-input" value={PostTitle} onChange={event => setPostTitle(event.target.value)} />
            </div>

            <div className="post-input">
                <label htmlFor="post-input">Corps :</label>
                <textarea id="post-input" value={PostBody} onChange={event => setPostBody(event.target.value)} />
            </div>

            <button onClick={() => createPost(AccountService.getUUID(), PostTitle, PostBody)}>Publier le post</button>

        </div>

    </div>
  );
  
}
