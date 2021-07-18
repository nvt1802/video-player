import React, { useState, useEffect, useRef } from 'react'
import Controls from './Controls'

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

function VideoPlayer(props: IProps) {
  const playerRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const progressRef = useRef<HTMLInputElement>(document.createElement('input'))
  const videoWrapRef = useRef<HTMLDivElement>(document.createElement('div'))

  const [loadedMetaData, setLoadedMetaData] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [videoDuration, setVideoDuration] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  const {
    url,
    controls = ['play', 'time', 'progress', 'volume', 'full-screen'],
    height = '360px',
    width = '640px',
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
    playerRef.current.addEventListener('timeupdate', handleProgress)
    playerRef.current.addEventListener('loadedmetadata', handleLoadedmetadata)
    playerRef.current.addEventListener('durationchange', handleDurationLoaded)
    if (timeStart) {
      seekToPlayer()
    }
    if (isPlaying) {
      playerRef.current.play()
    }
  }, [])

  useEffect(() => {
    seekToPlayer()
  }, [timeStart])

  useEffect(() => {
    isPlaying ? playerRef.current.play() : playerRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    setVolume(volume)
  }, [volume])

  const seekToPlayer = () => {
    if (timeStart && playerRef) {
      playerRef.current.currentTime = timeStart
    }
  }

  const setVolume = (value: number) => {
    playerRef.current.volume = value
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
    let duration = currentTarget['duration']
    if (duration === Infinity) {
      duration = 0
    }
    setVideoDuration(duration)
    onDuration(duration)
  }

  const handleLoadedmetadata = () => {
    setLoadedMetaData(true)
  }

  const handleProgress = (e: Event) => {
    const { currentTarget }: any = e
    const currentTime = currentTarget['currentTime']
    const duration = currentTarget['duration']
    if (duration) {
      setCurrentTime(currentTime)
      const percentage = (100 / duration) * currentTime
      if (progressRef) {
        progressRef.current.value = percentage.toString()
        progressRef.current.innerHTML = percentage + '% played'
      }
      if (currentTime === duration) {
        onPause()
      }
    }
    onProgress(e)
  }

  const handleProgressClick = (e: Event) => {
    const { clientX }: any = e
    const x = clientX - progressRef.current.getBoundingClientRect().left
    const percentage =
      (x * Number(progressRef.current.max)) / progressRef.current.offsetWidth
    playerRef.current.currentTime =
      (percentage / 100) * playerRef.current.duration
  }

  const handleFullScreenClick = () => {
    // const videoWrap = document.getElementsByClassName('react-video-wrap')[0]
    const { mozCancelFullScreen, webkitExitFullscreen, msExitFullscreen }: any =
      videoWrapRef
    if (isFullScreen) {
      videoWrapRef.current.classList.remove('react-video-full-screen')
      if (document['exitFullscreen']) {
        document['exitFullscreen']()
      } else if (mozCancelFullScreen) {
        mozCancelFullScreen()
      } else if (webkitExitFullscreen) {
        webkitExitFullscreen()
      } else if (msExitFullscreen) {
        msExitFullscreen()
      }
    } else {
      videoWrapRef.current.classList.add('react-video-full-screen')
      const {
        mozRequestFullScreen,
        webkitRequestFullscreen,
        msRequestFullscreen,
      }: any = videoWrapRef
      if (videoWrapRef.current['requestFullscreen']) {
        videoWrapRef.current['requestFullscreen']()
      } else if (mozRequestFullScreen) {
        mozRequestFullScreen()
      } else if (webkitRequestFullscreen) {
        webkitRequestFullscreen()
      } else if (msRequestFullscreen) {
        msRequestFullscreen()
      }
    }
    setIsFullScreen(!isFullScreen)
  }

  const handleMarkerClick = (marker: any) => {
    playerRef.current.currentTime = marker['time']
    onMarkerClick(marker)
  }

  return (
    <div
      ref={videoWrapRef}
      className="react-video-wrap"
      style={{ height, width }}
    >
      <video
        id="react-video-player"
        crossOrigin="anonymous"
        ref={playerRef}
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
      {loadedMetaData && controls.length ? (
        <Controls
          playerRef={playerRef}
          progressRef={progressRef}
          controls={controls}
          isPlaying={isPlaying}
          volume={volume}
          setVolume={setVolume}
          setMuted={setMuted}
          currentTime={currentTime}
          duration={videoDuration}
          muted={muted}
          markers={markers}
          onPlayClick={onPlay}
          onPauseClick={onPause}
          onProgressClick={handleProgressClick}
          onFullScreenClick={handleFullScreenClick}
          onMarkerClick={handleMarkerClick}
        />
      ) : null}
    </div>
  )
}

export default VideoPlayer
