"use client"

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { GetPasswordAction } from '../_actions/get_password.action'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'
import PasswordOptionsTags from './password_options_tags'

const PasswordLists = () => {

  const {data, error, isPending} = useQuery({
    queryKey: ["passwords"],
    queryFn: GetPasswordAction
  })

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password).then(() => {
        toast.success("Contraseña copiada en el portapapeles")
    })
  }

  if(isPending){
    return <p className='text-center text-gray-500'> Cargando contraseñas </p>
  }

  if(error){
    return <p className='text-center text-red-500'> Ocurrió un error: {error.message}</p>
  }

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
        <section className='text-center sapce-y-1'>
            <h2 className='text-2xl font-bold text-gray-700'>
                Mis contraseñas guardadas
            </h2>
            <p className='text-sm text-gray-500'>
                Tus contraseñas están protegidas. Puedes copiarlas cuando lo necesites
            </p>
        </section>

        <section className='space-y-4'>
            {
                data.map(item => (
                    <Card key={item.id}>
                        <CardContent className='p-4 flex justify-between items-center gap-4'>
                            <section>
                                <p className='font-bold text-gray-800'>
                                    Titulo: {item.title}
                                </p>
                                <p className='text-sm text-gray-500 my-2'>
                                    Lingitud de la contraseña:{" "}
                                    <span className='font-bold'>{item.length}</span>
                                </p>
                                <PasswordOptionsTags passwordConfig={item} />
                            </section>
                            <section className='flex flex-col space-y-2'>
                                <Button className='cursor-pointer' onClick={() => {handleCopyPassword(item.decryptedPassword)}}>
                                    <CopyIcon />
                                </Button>
                            </section>
                        </CardContent>
                    </Card>
                ))
            }
        </section>
    </div>
  )
}

export default PasswordLists
