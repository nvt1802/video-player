import React, { FC } from 'react'

interface Document {
  documentMode?: any;
}

declare global {
  interface Document {
      documentMode?: any;
  }
}

function isBrowserIE() {
  return window.document.documentMode;
}

interface IProps {
  PlayerRef: any
}

const PipControl: FC<IProps> = ({ PlayerRef }) => {
  const handleClickPip = () => {
    const { pictureInPictureElement, exitPictureInPicture }: any = document
    if (pictureInPictureElement !== null) {
      // exitPictureInPicture()
    } else {
      PlayerRef.current.requestPictureInPicture()
    }
  }
  return (
    <button className="pip" onClick={handleClickPip}>
      FullScreen
    </button>
  )
}

export default PipControl
