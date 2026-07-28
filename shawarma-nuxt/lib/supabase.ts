import { createClient } from '@supabase/supabase-js'
import type { Product, Order } from '~/types/product'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig()
  
  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )
}

export const useProducts = () => {
  const client = useSupabaseClient()

  const fetchProducts = async (category?: string) => {
    let query = client.from('products').select('*')
    
    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error
    return data as Product[]
  }

  const fetchProductById = async (id: number) => {
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Product
  }

  return {
    fetchProducts,
    fetchProductById,
  }
}

export const useOrders = () => {
  const client = useSupabaseClient()

  const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const { data, error } = await client
      .from('orders')
      .insert({
        ...order,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data as Order
  }

  const fetchOrderById = async (id: number) => {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Order
  }

  return {
    createOrder,
    fetchOrderById,
  }
}
