import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Product } from '~/types/product'

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await useFetch<Product[]>('/api/products')
      return data.value || []
    },
  })
}

export const useProductQuery = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data } = await useFetch<Product>(`/api/products/${id}`)
      return data.value
    },
    enabled: !!id,
  })
}

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await useFetch('/api/categories')
      return data.value || []
    },
  })
}

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderData: any) => {
      const { data } = await useFetch('/api/orders', {
        method: 'POST',
        body: orderData,
      })
      return data.value
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
