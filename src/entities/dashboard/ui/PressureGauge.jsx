import { useState } from 'react'

import pressureTransmitterImage from '@/assets/images/pressure_transmitter.png'

export const PressureGauge = () => {
  const [pressure, setPressure] = useState(6.85)

  // Rang - bosimga qarab
  const getPressureColor = value => {
    if (value < 3) return '#10b981' // Yashil - past
    if (value < 5) return '#84cc16' // Och yashil
    if (value < 7) return '#eab308' // Sariq - normal
    if (value < 9) return '#f97316' // Orange - yuqori
    if (value < 11) return '#ef4444' // Qizil - xavfli

    return '#dc2626' // To'q qizil - juda xavfli
  }

  const handlePressureChange = e => {
    setPressure(parseFloat(e.target.value))
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-6 space-y-8'>
      {/* Pressure Gauge */}
      <div className='relative w-full'>
        <svg viewBox='0 0 1536 1024' className='w-full h-auto drop-shadow-lg'>
          {/* Background rasm (raqamsiz versiya) */}
          <image href={pressureTransmitterImage.src} width='1536' height='1024' />

          {/* Oq background raqam uchun */}
          <rect
            x='630'
            y='265'
            width='276'
            height='126'
            fill='white'
            rx='20'
          />

          {/* Dinamik raqam */}
          <text
            x='768'
            y='340'
            fontSize='110'
            fontWeight='700'
            textAnchor='middle'
            dominantBaseline='middle'
            fill={getPressureColor(pressure)}
            fontFamily='Scada, sans-serif'
            className={'font-seven'}
            style={{ transition: 'fill 0.3s ease' }}
          >
            {pressure.toFixed(2)}
          </text>

          <text   fontStyle={'italic'} x='850' y='384' fontSize='32' fill='#4b5563' fontFamily='Scada, sans-serif' className={'font-scada'} fontWeight='500'>
            bar
          </text>
        </svg>
      </div>

      <div className='space-y-4'>
        <input
          type='range'
          min='0'
          max='12'
          step='0.01'
          value={pressure}
          onChange={handlePressureChange}
          className='w-full h-3 rounded-lg appearance-none cursor-pointer bg-gray-200'
        />
      </div>
    </div>
  )
}
