import { Images } from './images-entity'

export interface Pet {
  id?: string
  name?: string
  about?: string
  year_old?: string
  available?: boolean
  orgId?: string
  created_at?: Date
  images?: Images[]
}
