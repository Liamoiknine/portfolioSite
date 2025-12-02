import React from 'react'

function ThriveVideo() {
  // OPTION 1: YouTube Embed
  // Replace 'YOUR_VIDEO_ID' with your actual YouTube video ID
  // For example, if your YouTube URL is https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // Then the video ID is: dQw4w9WgXcQ
  const useYouTube = true // Set to false to use local MP4 instead
  const videoId = 'YrsQRwvqh8c'

  // OPTION 2: Local MP4 File
  // If you want to use a local MP4 file instead, set useYouTube to false
  // and place your video file in the public folder (e.g., public/thrive-video.mp4)
  const videoSrc = '/thrive-video.mp4' // Path to your MP4 file in the public folder

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1920px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {useYouTube ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
            title="Thrive Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              aspectRatio: '16/9'
            }}
          />
        ) : (
          <video
            src={videoSrc}
            controls
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  )
}

export default ThriveVideo

