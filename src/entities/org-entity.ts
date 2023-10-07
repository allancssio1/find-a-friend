export interface ORG {
  id?: String
  name?: String
  email?: String
  password_hash?: String | null
  password?: String | null
  phone_number?: String
  name_responsible?: String
  street?: String
  city?: String
  district?: String
  state?: String
  address_number?: String
  created_at?: Date
}
