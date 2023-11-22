import { z } from 'zod'

const ZIP_CODE_REGEX = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/)
const PHONE_NUM_REGEX = new RegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)

const schema = z.object({
  address: z.string().min(1, { message: 'Address cannot be empty' }),
  city: z.string().min(1, { message: 'City cannot be empty' }),
  state: z.string().min(1, { message: 'State cannot be empty' }),
  zipCode: z.string().refine((data) => ZIP_CODE_REGEX.test(data), {
    message: 'Zip Code is invalid'
  }),
  name: z
    .string()
    .min(3, { message: 'Contact Name must be atleast 3 characters' })
    .max(255, { message: 'You exceeded the limit of characters (255)' }),
  phone: z.string().refine((data) => PHONE_NUM_REGEX.test(data), {
    message: 'Phone Number is invalid'
  }),
  email: z.string().email({
    message: 'Invalid Email'
  })
})

export default schema

export type TShipping = z.infer<typeof schema>
