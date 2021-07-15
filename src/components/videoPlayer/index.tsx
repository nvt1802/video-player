import React, { useState, useEffect, useRef } from "react"
import Controls from "./Controls"

interface IProps {
  url: string
  controls?: string[]
  height?: string
  width?: string
  isPlaying: boolean
  volume: number
  loop?: boolean
  markers?: object[]
  timeStart?: number
  onPlay?: () => void
  onPause?: () => void
  onVolume?: (volume: number) => void
  onProgress?: (event: Event) => void
  onDuration?: (duration: number) => void
  onMarkerClick?: (marker: object) => void
}

const DEFAULT_VOLUME: number = 0.7

function VideoPlayer(props: IProps) {
  const playerEl = useRef<HTMLVideoElement>(document.createElement("video"))
  const progressEl = useRef<HTMLProgressElement>(
    document.createElement("progress")
  )
  const volumeEl = useRef<any>(null)

  const [currentTime, setCurrentTime] = useState<number>(0)
  const [videoDuration, setVideoDuration] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  const {
    url,
    controls = ["play", "time", "progress", "volume", "full-screen"],
    height = "360px",
    width = "640px",
    isPlaying = false,
    volume = 0.7,
    loop = false,
    markers = [],
    timeStart = 0,
    onPlay = () => {},
    onPause = () => {},
    onVolume = () => {},
    onProgress = () => {},
    onDuration = () => {},
    onMarkerClick = () => {},
  } = props

  useEffect(() => {
    playerEl.current.addEventListener("timeupdate", handleProgress)
    playerEl.current.addEventListener("durationchange", handleDurationLoaded)
    if (timeStart) {
      seekToPlayer()
    }
    if (isPlaying) {
      playerEl.current.play()
    }

    // return () => {
    //   playerEl.current.removeEventListener("timeupdate", handleProgress)
    //   playerEl.current.removeEventListener(
    //     "durationchange",
    //     handleDurationLoaded
    //   )
    // }
  }, [])

  useEffect(() => {
    seekToPlayer()
  }, [timeStart])

  useEffect(() => {
    isPlaying ? playerEl.current.play() : playerEl.current.pause()
  }, [isPlaying])

  useEffect(() => {
    setVolume(volume)
  }, [volume])

  const seekToPlayer = () => {
    if (timeStart && playerEl) {
      playerEl.current.currentTime = timeStart
    }
  }

  const setVolume = (value: number) => {
    playerEl.current.volume = value
    setMuted(!value)
    onVolume(value)
  }

  const handlePlayerClick = () => {
    if (isPlaying) {
      onPause()
    } else {
      onPlay()
    }
  }

  const handleDurationLoaded = (e: Event) => {
    const { currentTarget }: any = e
    let duration = currentTarget["duration"]
    if (duration === Infinity) {
      duration = 0
    }
    setVideoDuration(duration)
    onDuration(duration)
  }

  const handleProgress = (e: Event) => {
    const { currentTarget }: any = e
    const currentTime = currentTarget["currentTime"]
    const duration = currentTarget["duration"]
    if (duration) {
      setCurrentTime(currentTime)
      const percentage = (100 / duration) * currentTime
      progressEl.current.value = percentage
      progressEl.current.innerHTML = percentage + "% played"
      if (currentTime === duration) {
        onPause()
      }
    }
    onProgress(e)
  }

  const handleProgressClick = (e: Event) => {
    const { clientX }: any = e
    const x =
      clientX -
      progressEl.current.getBoundingClientRect().left +
      document.body.scrollLeft
    const percentage =
      (x * progressEl.current.max) / progressEl.current.offsetWidth
    playerEl.current.currentTime =
      (percentage / 100) * playerEl.current.duration
  }

  const handleVolumeClick = (e: Event) => {
    const { clientY }: any = e
    const y =
      volumeEl.current.offsetWidth -
      (clientY -
        volumeEl.current.getBoundingClientRect().top +
        document.body.scrollTop)
    const percentage = (y * volumeEl.current.max) / volumeEl.current.offsetWidth
    playerEl.current.muted = false
    onVolume(percentage / 100)
  }

  const handleMuteClick = () => {
    if (muted) {
      playerEl.current.muted = false
      setVolume(DEFAULT_VOLUME)
      setMuted(false)
    } else {
      playerEl.current.muted = true
      setVolume(0)
      setMuted(true)
    }
  }

  const handleFullScreenClick = () => {
    const videoWrap = document.getElementsByClassName("react-video-wrap")[0]
    if (isFullScreen) {
      document.body.classList.remove("react-video-full-screen")
      if (document["exitFullscreen"]) {
        document["exitFullscreen"]()
      }
      // else if (document["mozCancelFullScreen"]) {
      //   document["mozCancelFullScreen"]()
      // } else if (document["webkitExitFullscreen"]) {
      //   document["webkitExitFullscreen"]()
      // } else if (document["msExitFullscreen"]) {
      //   document["msExitFullscreen"]()
      // }
    } else {
      document.body.classList.add("react-video-full-screen")
      if (videoWrap["requestFullscreen"]) {
        videoWrap["requestFullscreen"]()
      }
      // else if (videoWrap["mozRequestFullScreen"]) {
      //   videoWrap["mozRequestFullScreen"]()
      // } else if (videoWrap["webkitRequestFullscreen"]) {
      //   videoWrap["webkitRequestFullscreen"]()
      // } else if (videoWrap["msRequestFullscreen"]) {
      //   videoWrap["msRequestFullscreen"]()
      // }
    }
    setIsFullScreen(!isFullScreen)
  }

  const handleMarkerClick = (marker: any) => {
    playerEl.current.currentTime = marker["time"]
    onMarkerClick(marker)
  }

  const handleFastForwardClick = () => {
    playerEl.current.currentTime = playerEl.current.currentTime + 5
  }

  const handleRewindClick = () => {
    playerEl.current.currentTime = playerEl.current.currentTime - 5
  }

  return (
    <div className="react-video-wrap" style={{ height, width }}>
      <video
        crossOrigin="anonymous"
        ref={playerEl}
        className="react-video-player"
        loop={loop}
        onClick={handlePlayerClick}
      >
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="http://localhost:4000/subtitles"
          default
        />
        <source src={url} type="video/mp4" />
      </video>
      {isFullScreen ? (
        <button className="react-video-close" onClick={handleFullScreenClick}>
          Close video
        </button>
      ) : null}
      {controls.length ? (
        <Controls
          playerEl={playerEl}
          progressEl={progressEl}
          volumeEl={volumeEl}
          controls={controls}
          isPlaying={isPlaying}
          volume={volume}
          currentTime={currentTime}
          duration={videoDuration}
          muted={muted}
          markers={markers}
          onPlayClick={onPlay}
          onPauseClick={onPause}
          onProgressClick={handleProgressClick}
          onVolumeClick={handleVolumeClick}
          onMuteClick={handleMuteClick}
          onFullScreenClick={handleFullScreenClick}
          onRewindClick={handleRewindClick}
          onFastForwardClick={handleFastForwardClick}
          onMarkerClick={handleMarkerClick}
        />
      ) : null}
    </div>
  )
}

export default VideoPlayer
