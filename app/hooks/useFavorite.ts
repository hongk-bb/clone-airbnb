import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { SafeUser } from '@/app/types'
import useModalStore from './useModalStore'

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

/**
 * This is a TypeScript function that handles toggling a favorite listing for a user and updating the
 * UI accordingly.
 * @param {IUseFavorite}  - The function `useFavorite` takes an object with two properties as its
 * parameter:
 * @returns The `useFavorite` function returns an object with two properties: `hasFavorited` and
 * `toggleFavorite`.
 */
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()

  const { loginModal } = useModalStore()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        toast.success('Success')
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  )

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite
