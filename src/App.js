import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';



function App() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [postsList, setPostsList] = useState([]);

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

      {postsList.map((val) => {
        return (
          <h3>Caption: {val.caption} | Image: {val.image}</h3>
        )
      })}
    </div>
  );
}

export default App;
