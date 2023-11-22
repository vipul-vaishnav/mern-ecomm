import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Button from '../components/shared/Button'
import Input from '../components/shared/Input'

import FormSchema, { type TShipping } from '../lib/ShippingSchema'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from '../utils/LocalStorage'

type ShippingProps = Record<string, string>

const Shipping: React.FC<ShippingProps> = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TShipping>({
    defaultValues: {
      address: '',
      city: '',
      name: '',
      email: '',
      phone: '',
      state: '',
      zipCode: ''
    },
    resolver: zodResolver(FormSchema)
  })

  const navigate = useNavigate()

  const onSubmit = (data: TShipping) => {
    LocalStorage.set('pro_shop_shipping_data', data)
    navigate('/payment')
  }

  useEffect(() => {
    const data = LocalStorage.get('pro_shop_shipping_data') as TShipping
    if (data)
      Object.entries(data).forEach((entry) => setValue(entry[0] as keyof TShipping, entry[1]))
  }, [])

  return (
    <div className="my-12">
      <div className="mx-auto mb-12 max-w-max">
        <ul className="steps">
          <li className="step step-success">Login</li>
          <li className="step step-success">Shipping</li>
          <li className="step">Payments</li>
          <li className="step">Place Order</li>
        </ul>
      </div>

      <h1 className="max-w-screen-md mx-auto text-3xl font-semibold">Checkout Information</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md p-3 mx-auto my-3 rounded-lg bg-neutral-100"
      >
        <div className="my-4">
          <Input
            label="Contact Name & Title"
            placeholder="Contact Name & Title"
            required
            {...register('name')}
            errorText={errors.name?.message}
          />
        </div>
        <div className="my-4">
          <Input
            label="Telephone No."
            placeholder="Telephone No."
            required
            {...register('phone')}
            errorText={errors.phone?.message}
          />
        </div>
        <div className="my-4">
          <Input
            label="E-Mail"
            placeholder="E-Mail"
            required
            {...register('email')}
            errorText={errors.email?.message}
          />
        </div>
        <div className={'my-4'}>
          <Input
            label="Address"
            placeholder="Address"
            required
            {...register('address')}
            errorText={errors.address?.message}
          />
        </div>
        <div className={'my-4'}>
          <Input
            label="City"
            placeholder="City"
            required
            {...register('city')}
            errorText={errors.city?.message}
          />
        </div>
        <div className={'my-4'}>
          <Input
            label="State"
            placeholder="State"
            required
            {...register('state')}
            errorText={errors.state?.message}
          />
        </div>
        <div className={'my-4'}>
          <Input
            label="Zip Code"
            placeholder="Zip Code"
            required
            {...register('zipCode')}
            errorText={errors.zipCode?.message}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} type="button" variant="outlined" fullWidth>
            Back
          </Button>
          <Button loading={isSubmitting} type="submit" fullWidth>
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}
export default Shipping
