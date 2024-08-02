import React, {useState, useEffect} from 'react';
import { createPost, updatePost } from '../services/postService';

export const PostForm = ({posts, setPosts, editingPost, setEditingPost}) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {

        if(editingPost){
            setTitle(editingPost.title);
            setBody(editingPost.body);
        }else{
            setTitle("");
            setBody("");
        }

    },[editingPost])

    const handleSubmit = (event) => {
        event.preventDefault();

        if(editingPost){
          editPost();
        }else{
            addPost();
        }
         
        
        setTitle("");
        setBody("");
        setEditingPost(null);
    }

    const addPost = () => {
        createPost({title, body}).then((response) => {
            //console.log(result);
            setPosts([...posts, response.data]);
          })
          .catch(err => {
            console.error(err);
          });
    }

    const editPost = () => {
        updatePost(editingPost.id,{title, body}).then((response) => {
            setPosts(posts.map(post => (post.id === editingPost.id? response.data : post)));
        })
          .catch(err => {
            console.error(err);
          });
    }

   return (
    <form onSubmit={handleSubmit}>
        <div>
            Title
        </div>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

        <div>
            Title
        </div>
        <textarea type='text' value={body} onChange={(e) => setBody(e.target.value)} />
         <div>
        <button type="submit">{editingPost? "Edit Post" :"Add Post"}</button>
        </div>
    </form>
  );
}
