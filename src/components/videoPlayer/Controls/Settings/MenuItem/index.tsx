import React, { FC } from 'react'

interface IProps {
  checked?: boolean
  displayValue: string
}

const MenuItem: FC<IProps> = ({ checked = false, displayValue }) => {
  return (
    <button className={`${checked ? 'menu-item checked' : 'menu-item'}`}>
      <span>{displayValue}</span>
    </button>
  )
}

export default MenuItem
