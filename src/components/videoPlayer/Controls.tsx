import React from "react"
import Marker from "./Marker"
import Captions from "./Captions"

interface IProps {
  playerEl: any
  progressEl: any
  volumeEl: any
  controls: string[]
  isPlaying: boolean
  volume: number
  muted: boolean
  currentTime: number
  duration: number
  markers: object[]
  onPlayClick: () => void
  onPauseClick: () => void
  onProgressClick: any
  onVolumeClick: any
  onMuteClick: () => void
  onFullScreenClick: () => void
  onRewindClick: any
  onFastForwardClick: any
  onMarkerClick: any
}

function Controls(props: IProps) {
  const {
    playerEl,
    progressEl,
    volumeEl,
    controls,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    markers,
    onPlayClick,
    onPauseClick,
    onProgressClick,
    onVolumeClick,
    onMuteClick,
    onFullScreenClick,
    onRewindClick,
    onFastForwardClick,
    onMarkerClick,
  } = props

  const getTimeCode = (secs: number): string => {
    let secondsNumber = secs ? parseInt(String(secs), 10) : 0
    let hours = Math.floor(secondsNumber / 3600)
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
    let seconds = secondsNumber - hours * 3600 - minutes * 60
    let hoursStr: string = String(hours)
    let minutesStr: string = String(minutes)
    let secondsStr: string = String(seconds)

    if (hours < 10) {
      hoursStr = "0" + hours
    }
    if (minutes < 10) {
      minutesStr = "0" + minutes
    }
    if (seconds < 10) {
      secondsStr = "0" + seconds
    }

    return `${
      hoursStr !== "00" ? hoursStr + ":" : ""
    }${minutesStr}:${secondsStr}`
  }

  const durationTimeCode = getTimeCode(Math.ceil(duration))
  const currentTimeCode =
    currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode

  return (
    <div className="react-video-controls">
      <Captions playerEl={playerEl} />

      {controls.includes("play") ? (
        <button
          className={isPlaying ? "pause" : "play"}
          onClick={isPlaying ? onPauseClick : onPlayClick}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      ) : null}

      {controls.includes("rewind") ? (
        <button className="rewind" onClick={onRewindClick}>
          Fast Forward
        </button>
      ) : null}

      {controls.includes("fast-forward") ? (
        <button className="fast-forward" onClick={onFastForwardClick}>
          Fast Forward
        </button>
      ) : null}

      {controls.includes("time") ? (
        <div className="time">
          {currentTimeCode}/{durationTimeCode}
        </div>
      ) : null}

      {controls.includes("progress") ? (
        <div className="progress-wrap">
          <progress ref={progressEl} max="100" onClick={onProgressClick}>
            0% played
          </progress>
          {markers &&
            markers.map((marker: any, index: number) => {
              return (
                <Marker
                  key={index}
                  marker={marker}
                  duration={duration}
                  onMarkerClick={onMarkerClick}
                />
              )
            })}
        </div>
      ) : null}

      {controls.includes("volume") ? (
        <div className="volume-wrap">
          <progress
            ref={volumeEl}
            max="100"
            value={volume * 100}
            onClick={onVolumeClick}
          >
            {volume * 100}% volume
          </progress>
          <button
            className={muted ? "no-volume" : "volume"}
            onClick={onMuteClick}
          >
            Volume
          </button>
        </div>
      ) : null}

      {controls.includes("full-screen") ? (
        <button className="full-screen" onClick={onFullScreenClick}>
          FullScreen
        </button>
      ) : null}
    </div>
  )
}

export default Controls
