import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type HeaderContextValue = {
  columns: {
    value: number
    setValue: Dispatch<SetStateAction<number>>
  }
  adjust: {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
  }
  searchText: {
    value: string
    setValue: Dispatch<SetStateAction<string>>
  }
}

export const HeaderContext = createContext<HeaderContextValue>({
  columns: {
    value: 3,
    setValue: () => {},
  },
  adjust: {
    value: true,
    setValue: () => {},
  },
  searchText: {
    value: '',
    setValue: () => {},
  },
})

const useHeaderContext = () => {
  const { ...values } = useContext(HeaderContext)

  return values
}

export default useHeaderContext
