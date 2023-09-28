import { ComponentProps } from 'react'

type InputPrefixProps = ComponentProps<'div'>

export function Prefix(props: InputPrefixProps) {
  return <div {...props} />
}

type InputControlProps = ComponentProps<'input'>

export function Control(props: InputControlProps) {
  return (
    <input
      className="flex-1 bg-transparent text-zinc-500 placeholder-zinc-600 outline-none"
      {...props}
    />
  )
}

export type InputRootProps = ComponentProps<'div'>

export function Root(props: InputRootProps) {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-within:border-[#99b1f7] focus-within:ring-4 focus-within:ring-[#dde4fc]"
      {...props}
    ></div>
  )
}

type InputSufixProps = ComponentProps<'button'>

export function Sufix(props: InputSufixProps) {
  return <button {...props} />
}
