interface Radio {
  name: string
  value: string
}

interface RadioGroupProps {
  radioList: Radio[]
  value: string
  onChange?: (value: string) => void 
}

export default function RadioGroup({ radioList, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap justify-between">
      {radioList.map((item, index) => (
        <div
          className={`flex w-[150px] h-[40px] rounded-[40px] bg-[#212122] mb-[10px] justify-center items-center text-[12px] border-1 border-[#212122] ${item.value === value ? 'border-[#FF4D32] border-1 text-[#FF4D32]' : ''}`}
          key={index} onClick={() => {
            onChange && onChange(item.value)
          }}>
          {item.name}
        </div>
      ))}
    </div>
  )
}
