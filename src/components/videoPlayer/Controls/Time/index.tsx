import React, { FC } from "react"

interface IProps {
  currentTimeCode: any
  durationTimeCode: any
}

const TimeControl: FC<IProps> = ({ currentTimeCode, durationTimeCode }) => {
  return (
    <div className="time">
      {currentTimeCode}/{durationTimeCode}
    </div>
  )
}

export default TimeControl
