import React, { Fragment } from "react"
import dynamic from "next/dynamic"
import { useState } from "react"
// import VideoPlayer from "../videoPlayer"
const VideoPlayer = dynamic(() => import("../videoPlayer"), { ssr: false })
// import VideoPlayer from "../videoPlayer"

const HomeComponent = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.7)

  const markers: object[] = [
    {
      id: 1,
      time: 5,
      color: "#ffc837",
      title: "Marker 1",
    },
  ]

  const handleClickPlay = () => {
    setPlaying(true)
  }

  const handleClickPause = () => {
    setPlaying(false)
  }

  const handleChangeVolume = (value: any) => {
    setVolume(value)
  }

  return (
    <Fragment>
      <VideoPlayer
        controls={[
          "play",
          "rewind",
          "fast-forward",
          "time",
          "progress",
          "volume",
          "full-screen",
        ]}
        isPlaying={playing}
        markers={markers}
        url="http://localhost:4000/download"
        volume={volume}
        loop={true}
        width="800px"
        height="100%"
        onPlay={handleClickPlay}
        onPause={handleClickPause}
        onVolume={handleChangeVolume}
      />
    </Fragment>
  )
}

export default HomeComponent
