export default {
  isRequired: () => ({
    message: `El campo $property es obligatorio`
  }),
  isEmail: () => ({
    message: `El campo $property debe ser un correo`
  }),
  isEnum: (options: any[]) => ({
    message: `El campo $property debe ser estar entre ${options.join(", ")}`
  }),
  isLength: () => ({
    message: `El campo $property debe estar entre $constraint1 y $constraint2 `
  }),
  isMin: () => ({
    message: `El campo $property debe ser mayor o igual a $constraint1`
  }),
  isMax: () => ({
    message: `El campo $property debe ser menor o igual a $constraint1`
  }),
  isRegex: () => ({
    message: `El campo $property no cumple con el patrón requerido`
  }),
  isNumberString: () => ({
    message: `El campo $property debe ser un número válido`
  }),
  isDate: () => ({
    message: `El campo $property debe ser una fecha válida`
  })

};