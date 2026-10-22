import type { Carro } from "@/types/carro"

export type CarroFormValues = Omit<Carro, "id">
export type CarroFormField = keyof CarroFormValues

export const carroFormInicial: CarroFormValues = {
  marca: "",
  anio: "",
  modelo: "",
  color: "",
  precio: "",
  kilometraje: "",
}

export function limpiarColor(valor: string): string {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "")
}

export function validarCampoCarro(
  campo: CarroFormField,
  valor: unknown,
): string | undefined {
  const valorNormalizado = valor == null ? "" : String(valor)
  const valorLimpio = valorNormalizado.trim()

  if (!valorLimpio) {
    return "Este campo es obligatorio."
  }

  if (campo === "color" && limpiarColor(valorLimpio) !== valorLimpio) {
    return "El color solo puede contener letras y espacios."
  }

  if (campo === "anio") {
    const anio = Number(valorLimpio)
    const anioActual = new Date().getFullYear()

    if (!/^\d{4}$/.test(valorLimpio) || anio < 1886 || anio > anioActual) {
      return `El año debe estar entre 1886 y ${anioActual}.`
    }
  }

  if (campo === "precio" && (!Number.isFinite(Number(valorLimpio)) || Number(valorLimpio) <= 0)) {
    return "El precio debe ser mayor que 0."
  }

  if (
    campo === "kilometraje" &&
    (!Number.isFinite(Number(valorLimpio)) || Number(valorLimpio) <= 0)
  ) {
    return "El kilometraje debe ser mayor que 0."
  }

  return undefined
}
