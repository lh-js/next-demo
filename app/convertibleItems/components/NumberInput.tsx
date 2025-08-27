'use client'
import { useState, useEffect } from 'react'

interface NumberInputProps {
  quantity: number
  onChange?: (value: number) => void
}
export default function NumberInput({ quantity, onChange }: NumberInputProps) {
  const [value, setValue] = useState(quantity.toString())
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setValue(quantity.toString())
    }
  }, [quantity, isEditing])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
   
    if (/^\d*$/.test(newValue)) {
      setValue(newValue)
    }
  }

  const handleInputBlur = () => {
    setIsEditing(false)
    const numValue = parseInt(value) || 0
    setValue(numValue.toString())
    onChange && onChange(numValue)
  }

  const handleInputFocus = () => {
    setIsEditing(true)
  }

  const increment = () => {
    const numValue = parseInt(value) || 0
    const newValue = numValue + 1
    setValue(newValue.toString())
    onChange && onChange(newValue)
  }

  const decrement = () => {
    const numValue = parseInt(value) || 0
    const newValue = Math.max(0, numValue - 1)
    setValue(newValue.toString())
    onChange && onChange(newValue)
  }

  return (
    <div className="flex h-[40px] bg-[#212122] rounded-[10px] justify-between items-center px-3 text-white">
      <button
        onClick={decrement}
        className="flex items-center justify-center w-5 h-5">
        <img src="reduce.png" alt="减少" className="w-full h-full" />
      </button>

      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        className="w-12 text-center bg-transparent border-none outline-none text-white"
      />

      <button
        onClick={increment}
        className="flex items-center justify-center w-5 h-5">
        <img src="add.png" alt="增加" className="w-full h-full" />
      </button>
    </div>
  )
}
