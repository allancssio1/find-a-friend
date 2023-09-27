import { Images } from './images-entity'

export interface Pet {
  id?: string
  name?: string
  about?: string
  year_old?: string
  disponible?: boolean
  orgId?: string
  created_at?: Date
  images?: Images[]
}
