import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [vidUrl, setVidUrl] = useState('')
  const [data, setData] = useState({
    url: ""
  })
  const Get_Video_URL = import.meta.env.VITE_API_GETVID

  const getVideo = async () => {
    try {
      const response = await axios.post(Get_Video_URL, data)
      setVidUrl(response.data)
    } catch (e) {
      setError(e.message)
    }
  }

  //Update the video src when a new one is given
  useEffect(() => {
    if (vidUrl) {
      const videoElement = document.getElementById('video-player')
      if (videoElement) {
        videoElement.src = vidUrl
      }
    }
  }, [vidUrl])


  const handleInputChange = (event) => {
    const value = event.target.value;
    setData({ url: value });
  };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Data logged:", data)
      setData({ url: "" })
      getVideo()
    };

  return (
    <div>
      <h1>Medal Clip Downloader</h1>
      <h2>No Watermark</h2>
      Enter Medal Clip Link:
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="url"
            value={data.url}
            onChange={handleInputChange}
            />
        </label>
        <button type="submit">Load Video Download 
        </button>
      </form>


        <video controls width="100%" id="video-player">
          <source src="" type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      
    </div>
  )
}

export default App
