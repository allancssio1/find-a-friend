export const maskPhone = (value: string): string => {
  let v = value.replace(/\D/g, '')
  v = v.replace(/\D/g, '')
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
  v = v.replace(/(\d)(\d{4})$/, '$1-$2')
  return v
}
