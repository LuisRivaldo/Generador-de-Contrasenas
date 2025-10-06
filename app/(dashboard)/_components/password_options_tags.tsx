"use client"

import { PasswordConfig } from '@/lib/password'
import { Badge } from '@/components/ui/badge'

interface Props {
    passwordConfig: PasswordConfig
}

const PasswordOptionsTags = ({passwordConfig}: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {
        [
            {
                condition: passwordConfig.hasLowercase,
                label: "Minúsculas"
            },
            {
                condition: passwordConfig.hasUppercase,
                label: "Mayúsulas"
            },
            {
                condition: passwordConfig.hasNumbers,
                label: "Números"
            },
            {
                condition: passwordConfig.hasSymbols,
                label: "Símbolos"
            }
        ]
        .filter(item => item.condition)
        .map((item, index) => (
            <Badge key={index}>{item.label}</Badge>
        ))
      }
    </div>
  )
}

export default PasswordOptionsTags
