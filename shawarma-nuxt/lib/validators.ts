import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  price: z.number().positive('Цена должна быть положительной'),
  image: z.string().url('Некорректный URL изображения'),
  category: z.string(),
  isAvailable: z.boolean(),
})

export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().int().positive(),
})

export const orderSchema = z.object({
  customerName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  customerPhone: z.string().regex(/^\+?\d{10,15}$/, 'Некорректный номер телефона'),
  customerAddress: z.string().min(5, 'Адрес должен содержать минимум 5 символов'),
})

export type ProductInput = z.infer<typeof productSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
export type OrderInput = z.infer<typeof orderSchema>
