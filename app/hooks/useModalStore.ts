import create from "zustand"

interface ModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

type ModalStores = Record<string, ModalStore>

const storeNames = ["loginModal", "registerModal", "rentModal", "searchModal"]

const useModalStore = create<ModalStores>(set => {
  const stores: ModalStores = {}

  // Define the onOpen and onClose functions outside the ModalStore object
  const onOpen = (name: string) => {
    set(state => ({ ...state, [name]: { ...state[name], isOpen: true } }))
  }

  const onClose = (name: string) => {
    set(state => ({ ...state, [name]: { ...state[name], isOpen: false } }))
  }

  storeNames.forEach(name => {
    stores[name] = {
      isOpen: false,
      onOpen: () => onOpen(name),
      onClose: () => onClose(name)
    }
  })

  return stores
})

export default useModalStore
