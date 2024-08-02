import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts, deletePost, updatePost } from '../services/postService';
import { PostForm } from './PostForm';

export const Posts = () => {

    const[posts, setPosts] = useState([]);
    const[editingPost, setEditingPost] = useState(null);

    useEffect(() => {
      getPosts().then((result) => {
        //console.log(result);
        setPosts(result.data);
      })
      .catch(err => {
        console.error(err);
      });
    }, [])

    const handleDelete = (id) => {
        deletePost(id).then((result) => {
            //console.log(result);
            setPosts(posts.filter((post) => post.id !== id));
          })
          .catch(err => {
            console.error(err);
          });
    };

    const startEditing = (post) => {
        setEditingPost(post);
    }

  return (
    <div>
        <h1>Posts</h1>
        <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost}/>
        <ul>
            {
                posts.map((post) => (

                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p> 
                        <button onClick={() => startEditing(post)}>Update</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button> 
                    </li>

                )
            )
            }
         
        </ul>
    </div>
  )
}
