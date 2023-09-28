'use client'

import { useEffect, useContext } from "react"
import { AuthContext } from '@/contexts/AuthContext'
import { RiFilePaper2Line } from 'react-icons/ri'
import { PiHouse } from 'react-icons/pi'

export default function Main() {
  const { data } = useContext(AuthContext)

  useEffect(() => {
    if (data) {
      console.log(data)

      if (data?.id) {
        console.log('GET')
      }
      
    }
  })

  return (
    <div className="flex flex-col w-full h-screen bg-Background">
      {/* Header */}
      <div className="flex flex-col w-full px-5 py-[30px]">
        <span className="text-[32px] leading-[44px] font-bold">{data?.name}</span>
        <span className="text-base">Engenharia de Computação</span>
      </div>

      {/* Body */}
      <div className="grow flex flex-col gap-[60px] px-[40px] justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-full gap-[10px]">
          <RiFilePaper2Line className="text-NotFocused w-16 h-16"/>
          <span className="text-base text-center text-NotFocused">Parece que você não possui um trabalho cadastrado</span>
        </div>
        <button className="flex w-full h-[60px] justify-center items-center bg-Card rounded-xl">
          <span className="font-semibold text-center text-Background">ENVIAR PROPOSTA</span>
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center w-full py-5">
        <button className="flex w-16 h-16 justify-center items-center bg-Card rounded-2xl">
          <PiHouse className="text-Background w-8 h-8"/>
        </button>
      </div>

      {/* Empty space */}
      <div className="w-5 h-5">
        {/* Empty div */}
      </div>
    </div>
  )
}
