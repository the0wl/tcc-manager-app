'use client'

import { FormEvent, useContext, useState } from 'react'
import { Button } from '@/components/Button'
import * as Input from '@/components/Form/Input'
import { z } from 'zod'
import { ensureError } from '@/utils/TCCErrorHandler'
import { AuthContext } from '@/contexts/AuthContext'

import { HiMail, HiKey, HiEye, HiEyeOff } from 'react-icons/hi'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .nonempty({
      message: 'Invalid password',
    })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'One or more invalid password characters',
    }),
})

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    setError(null)

    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const data = loginSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      })

      signIn(data)
    } catch (err) {
      const error = ensureError(err)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main
      data-testid="signup-page"
      className="flex min-h-screen flex-col items-center justify-center p-5"
    >
      <div className="mb-8 flex items-end gap-5">
        <span className="text-5xl font-semibold text-zinc-800">TCC Manager</span>
      </div>

      <div data-testid="error-div" className="h-[24px] text-red-600">
        {error && <span data-test-id="error-message">{error}</span>}
      </div>

      <form
        className="mt-4 flex w-full flex-col gap-5 p-5 md:w-[500px]"
        id="login"
        action=""
        onSubmit={onSubmit}
        data-testid="signup-form"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email address
          </label>
          <Input.Root>
            <Input.Prefix>
              <HiMail className="h-5 w-5 text-zinc-700" />
            </Input.Prefix>
            <Input.Control
              id="email"
              type="email"
              name="email"
              placeholder="Your account e-mail"
              data-testid="email-input"
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <Input.Root>
            <Input.Prefix>
              <HiKey className="h-5 w-5 text-zinc-700" />
            </Input.Prefix>
            <Input.Control
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Your account password"
              data-testid="password-input"
            />
            <Input.Sufix
              onClick={() => setShowPassword(!showPassword)}
              data-testid="password-button"
            >
              {showPassword ? (
                <HiEyeOff className="h-4 w-4 text-zinc-700" />
              ) : (
                <HiEye className="h-4 w-4 text-zinc-700" />
              )}
            </Input.Sufix>
          </Input.Root>
        </div>
        <div className="flex justify-center">
          <span className="my-3 inline-block h-[1px] w-1/6 bg-zinc-200"></span>
        </div>
        <div className="flex w-full flex-col">
          <Button data-testid="signin-button" variant="primary" type="submit">
            {isLoading ? 'Loading...' : 'Sign In'}{' '}
          </Button>
        </div>
      </form>
    </main>
  )
}
