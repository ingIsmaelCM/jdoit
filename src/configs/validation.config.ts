export default {
  isRequired: (field: string) => ({
    message: `El campo ${field} es obligatorio`
  }),
  isEmail: (field: string) => ({
    message: `El campo ${field} debe ser un correo`
  }),
  isEnum: (field: string, values: object) => ({
    message: `El campo ${field} debe ser estar entre ${Object.values(values)}`
  }),
  isLength: (field: string, min: number, max: number) => ({
    message: `El campo ${field} debe estar entre ${min} y ${max}`
  }),

};