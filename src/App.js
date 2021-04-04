import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';



function App() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [postsList, setPostsList] = useState([]);
  const [newCaption, setNewCaption] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:8080/api/exchangeagram/posts').then((response) => {
      setPostsList(response.data);
    })
  })

  const submitPost = () => {
    Axios.post('http://localhost:8080/api/exchangeagram/newpost', {
      caption: caption,
      image: image
    })
    setPostsList([...postsList, { caption: caption, image: image }])
  };

  const deletePost = (id) => {
    Axios.delete(`http://localhost:8080/api/exchangeagram/${id}`)
  }

  const updatePost = (id) => {
    Axios.put(`http://localhost:8080/api/exchangeagram/update/${id}`, {
      caption: newCaption
    });
    setNewCaption('');
  }

  return (
    <div className="App">
      <h1>Exchangeagram</h1>
      <form>
        <label htmlFor="caption">Caption: </label>
        <input type="text" id="caption" onChange={(event) => setCaption(event.target.value)}></input>
        <br />
        <label htmlFor="image">Image: </label>
        <input type="text" id="image" onChange={(event) => setImage(event.target.value)}></input>
        <br />
        <button onClick={submitPost}>Click</button>
      </form>
      <div className='bigField'>
        {postsList.map((val) => {
          return (

            <div className='card'>
              <h3>Caption: {val.caption}</h3>
              <h4> Image: {val.image}</h4>
              <button onClick={() => deletePost(val.post_id)}>DELETE</button>

              <input type='text' onChange={(event) => setNewCaption(event.target.value)}></input>
              <button onClick={() => updatePost(val.post_id)}>UPDATE</button>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
