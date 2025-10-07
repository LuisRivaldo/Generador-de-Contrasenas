"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { generatePassword, PasswordConfig } from '@/lib/password'
import { ArrowUp01, CaseLower, CaseUpper, CopyIcon, Hash, ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FormSavePassword from './form_save_password'

const options = [
    {
        key: "hasUppercase",
        label: "Mayúsculas",
        icon: <CaseUpper></CaseUpper>
    },
    {
        key: "hasLowercase",
        label: "Minúsculas",
        icon: <CaseLower></CaseLower>
    },
    {
        key: "hasNumbers",
        label: "Números",
        icon: <ArrowUp01></ArrowUp01>
    },
    {
        key: "hasSymbols",
        label: "Símbolos",
        icon: <Hash></Hash>
    }
] as const

const FormCreatePassword = () => {

  const [password, setPassword] = useState("")

  const form = useForm<PasswordConfig>({
    defaultValues: {
        length: 10,
        hasLowercase: true,
        hasNumbers: true,
        hasSymbols: true,
        hasUppercase: true
    }
  })

  useEffect(() => {
    const generated = generatePassword({
        length: 10,
        hasLowercase: true,
        hasNumbers: true,
        hasSymbols: true,
        hasUppercase: true
    })
    setPassword(generated)
  }, [])

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
        toast.success("Contraseña copiada en el portapapeles")
    })
  }

  const handleGenerate = () => {
    const values = form.getValues()
    const newPassword = generatePassword(values)
    setPassword(newPassword)
  }

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
        <header className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-green-800'>
                Generador de Contraseñas
            </h1>
            <p className='text-gray-700'>
                Contraseñas seguras y personalizadas
            </p>
        </header>

        <Card className='bg-gradient-to-r from-gray-900 to-gray-800'>
            <CardContent className='flex items-center justify-between grap-4'>
                <div className='flex-1 min-w-0'>
                    <p className='text-sm text-slate-400 mb-1'>
                        Tu contraseña generada es:
                    </p>
                    <p className='text-1 font-mono break-all text-green-400 leading-relaxed'>
                        {password}
                    </p>
                </div>
                <Button 
                onClick={handleCopyPassword}
                className='shrink-0 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer'>
                    <CopyIcon />
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardContent>
                <h2 className="text-center font-semibold text-gray-800 mb-4">
                    Configuración
                </h2>

                <Form {...form}>
                    <form
                        className='space-y-6'
                        onSubmit={form.handleSubmit(handleGenerate)}
                    >
                        <FormField
                            control={form.control}
                            name='length'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-700'>
                                        Longitud de la contraseña
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        type="number"
                                        value={field.value ?? 10}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="text-left font-semibold h-12 w-16"
                                        min={4}
                                        max={48}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} 
                        ></FormField>
                        <div className='space-y-3'>
                            <h3 className='text-sm font-medium text-gray-700'>
                                Incluir caracteres
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {options.map(({key, label, icon}) => (
                                       <FormField key={key} control={form.control} name={key} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <FormControl>
                                                        <Checkbox checked = {field.value} onCheckedChange={field.onChange}>
                                                        </Checkbox>
                                                    </FormControl>
                                                    <span className='text-xl'>
                                                        {icon}
                                                    </span>
                                                    <div>
                                                        <p>{label}</p>
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                        )}>
                                        </FormField> 
                                    ))
                                }
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4'>
                            <Button type='submit' style={{backgroundColor: 'green'}}>
                                Generar nueva contraseña
                            </Button>
                            <FormSavePassword 
                                password={password}
                                passwordConfig={form.getValues()}
                            />    
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default FormCreatePassword
