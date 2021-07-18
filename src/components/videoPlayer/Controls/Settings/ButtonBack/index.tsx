import React, { FC } from 'react'

interface IProps {
  displayValue: string
  setShowMenu: any
}

const ButtonBack: FC<IProps> = ({ displayValue, setShowMenu }) => {
  const handleClickBack = () => {
    setShowMenu(1)
  }
  return (
    <button className="menu-control-back" onClick={handleClickBack}>
      <span>{displayValue}</span>
    </button>
  )
}

export default ButtonBack
