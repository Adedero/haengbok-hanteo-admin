export interface User {
  _id: string
  name: string
  email: string
  password: string
  role: 'USER' | 'ADMIN'
  verified: boolean
  gender: 'female' | 'male' | 'other'
  birthday: Date | string
  location: { country: string; region?: string }
  picture?: { url: string; name: string }
  token: string
  lastLogin: Date | string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface AppDetails {
  name: string
  version: string
  releaseDate: Date | string
  isNewVersionAvailable: boolean
}

export interface Settings {
  availableBalance: number
  hideBalance: boolean
  lang: 'en' | 'ko'
  darkMode: boolean
  appDetails: AppDetails
}

export interface Transaction {
  _id: string
  title: string
  type: 'deposit' | 'withdrawal'
  status: 'pending' | 'successful' | 'failed'
  amount: number
  charges: number
  amountPaid: number
  recipientName: string
  transactionRef: string
  transactionDate: Date | string
  description?: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface Property {
  _id: string
  name?: string
  address: string
  type: 'sale' | 'rent'
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  description?: string
  pictures?: string[]
  lat?: number
  long?: number
  createdAt: Date | string
  updatedAt: Date | string
}
