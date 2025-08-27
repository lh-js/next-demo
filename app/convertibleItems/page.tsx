'use client'
import { Button } from '@heroui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@heroui/drawer'
import { useEffect, useState } from 'react'
import RadioGroup from './components/Radio'
import NumberInput from './components/NumberInput'

interface ConvertibleItem {
  name: string
  nicotineLevel: number
  quantity: number
}

interface Item {
  img: string
  name: string
  inventory: number
}

export default function ConvertibleItems() {
  const convertibleList = [
    {
      name: 'Oolong Tea',
      nicotineLevel: 0,
      quantity: 8,
    },
    {
      name: 'Electric Blue Razz',
      nicotineLevel: 2,
      quantity: 18,
    },
  ]

  const itemList = [
    {
      img: 'pods.png',
      name: 'Smart Pods',
      inventory: 100,
    },
    {
      img: 'vapes.png',
      name: 'Gen2 Vapes',
      inventory: 100,
    },
  ]

  const redeemList = [
    {
      name: 'Oolong Tea',
      value: 'Oolong Tea',
    },
    {
      name: 'Electric Blue Razz',
      value: 'Electric Blue Razz',
    },
    {
      name: 'Frosty Strawbreeze',
      value: 'Frosty Strawbreeze',
    },
  ]

  const nicotineLevelList = [
    {
      name: '0%',
      value: '0',
    },
    {
      name: '2%',
      value: '2',
    },
  ]

  const [convertibleItems, setConvertibleItems] = useState<ConvertibleItem[]>(
    []
  )
  const [items, setItems] = useState<Item[]>([])

  const [selectItem, setSlectItem] = useState<Item>()

  const [isOpen, setIsOpen] = useState(false)

  const [flavorValue, setFlavorValue] = useState(redeemList[0].value)

  const [nicotineLevel, setnicotineLevel] = useState(nicotineLevelList[0].value)

  const [quantity, setQuantity] = useState(8)

  useEffect(() => {
    setConvertibleItems(convertibleList)

    setItems(itemList)
  }, [])

  const handleRedeem = (item: Item) => {
    setSlectItem(item)
    setIsOpen(true)
  }

  return (
    <div className="text-white">
      <div className="mt-[20px]">
        <div className="flex justify-between">
          <div></div>
          <div>Convertible Items</div>
          <div>X</div>
        </div>
        <div
          onClick={() => {
            setConvertibleItems([])
          }}
          className="p-[20px] flex flex-col border-2 border-[#282828] rounded-[20px] mt-[20px] ">
          {convertibleItems.length != 0 ? (
            convertibleItems.map((item, index) => (
              <div className="flex mb-[20px]" key={index}>
                <div className="flex-grow h-[50px] rounded-[50px] bg-[#262626] flex items-center pl-[20px]">
                  {item.name}({item.nicotineLevel}%)
                </div>
                <div className="w-[50px] h-[50px] rounded-[50px] bg-[#262626] flex justify-center items-center">
                  x{item.quantity}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center bg-[#181818] p-[10px]">
              <img src="expired.png" className="h-[100px]" alt="" />
              The voucher has expired.
            </div>
          )}
          <div className="flex justify-between mt-[10px]">
            <div className="text-[#5F5F5F]">Wallet Address</div>
            <div className="flex items-center">
              <div className="text-[12px]">0x8dea...9Fec</div>
              <img src="copy.png" className="w-[20px]" alt="" />
            </div>
          </div>
          <div className="flex justify-between mt-[5px]">
            <div className="text-[#5F5F5F]">Order Number</div>
            <div className="text-[12px]">202504211136</div>
          </div>
        </div>
        <div className="w-full mt-[20px]">
          {items.map((item, index) => (
            <div
              className="flex justify-between items-center mb-[20px]"
              key={index}>
              <div className="flex">
                <img src={item.img} className="w-[60px] h-[60px]" />
                <div className="flex flex-col justify-center">
                  <div>{item.name}</div>
                  <div className="flex items-center">
                    <img
                      src="inventory.png"
                      className="w-[15px] h-[15px] mr-[5px]"
                      alt=""
                    />
                    <span className="text-[#747474] mr-[5px]">Inventory:</span>
                    {item.inventory}
                  </div>
                </div>
              </div>
              <Button
                radius="full"
                className="bg-[#FF4D32] text-white h-[30px]"
                onPress={() => handleRedeem(item)}>
                Redeem
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement={'bottom'}
        onClose={() => {
          setIsOpen(false)
        }}
        className="bg-[#000] text-white">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Redeem {selectItem?.name}
              </DrawerHeader>
              <DrawerBody>
                <div className="text-[#505252] text-[12px]">Flavor</div>
                <RadioGroup
                  radioList={redeemList}
                  value={flavorValue}
                  onChange={(value) => setFlavorValue(value)}
                />
                <div className="text-[#505252] text-[12px]">Nicotine Level</div>
                <RadioGroup
                  radioList={nicotineLevelList}
                  value={nicotineLevel}
                  onChange={(value) => setnicotineLevel(value)}
                />
                <NumberInput
                  quantity={quantity}
                  onChange={(value) => setQuantity(value)}
                />
              </DrawerBody>
              <DrawerFooter>
                <Button
                  radius="full"
                  className="bg-[#FF4D32] text-white h-[35px] w-[100%]"
                  onPress={onClose}>
                  Confirm
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
