import React, { ComponentPropsWithRef } from 'react'

type ButtonProps = {
  variant?: 'filled' | 'outlined' | 'white' | 'link'
  fullWidth?: boolean
  classes?: string
  loading?: boolean
} & {
  children: React.ReactNode
} & Omit<ComponentPropsWithRef<'button'>, 'className'>

const classNameCreatorFactory = (
  variant: ButtonProps['variant'],
  fullWidth: ButtonProps['fullWidth'],
  classes: ButtonProps['classes'],
  ...otherStyles: string[]
) => {
  const baseStyles =
    variant === 'filled'
      ? 'bg-orange-500 text-white'
      : variant === 'outlined'
      ? 'bg-white text-orange-500'
      : variant === 'link'
      ? 'bg-transparent !shadow-none !px-0 !border-transparent text-orange-500'
      : 'bg-white text-black shadow-md !border-white'

  return `${baseStyles} ${otherStyles.join(' ')} ${fullWidth ? 'w-full' : ''} ${classes}`
}

const Button: React.FC<ButtonProps> = React.forwardRef((props, ref) => {
  const {
    variant = 'filled',
    loading = false,
    fullWidth = false,
    classes,
    children,
    ...rest
  } = props

  return (
    <button
      {...rest}
      ref={ref}
      className={classNameCreatorFactory(
        variant,
        fullWidth,
        classes,
        `border-[1.5px] border-orange-500 px-4 py-3 text-sm font-semibold rounded-lg font-default shadow-sm hover:-translate-y-[2px] hover:shadow-none transition-all duration-300 active:translate-y-0 active:shadow-sm ${
          loading ? 'bg-opacity-40' : ''
        }`
      )}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-6">
          <span className="loading loading-spinner loading-xs"></span>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
