import React, { ForwardedRef } from 'react'

type InputProps = {
  label: string
  errorText?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = React.forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      id,
      errorText = '',
      type = 'text',
      autoComplete = 'off',
      required = false,
      disabled = false,
      ...restProps
    } = props
    return (
      <React.Fragment>
        <label htmlFor={id} className="flex flex-col items-center gap-2">
          <span className="text-base font-medium leading-normal max-w-max">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
          <div className={'w-full'}>
            <input
              id={id}
              type={type}
              className="w-full py-3 border-2 outline-none border-amber-600 input bg-amber-50"
              autoComplete={autoComplete}
              required={required}
              disabled={disabled}
              ref={ref}
              {...restProps}
            />
            <span className={'text-red-500'}>{errorText}</span>
          </div>
        </label>
      </React.Fragment>
    )
  }
)
export default Input
