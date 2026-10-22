import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useForm } from '@tanstack/react-form'
import { useCarros, useAgregarCarro } from '@/hooks/useCarros'
import { carroFormInicial, limpiarColor, validarCampoCarro } from '@/utils/carros-form'

export default function App() {
  const { data: carros = [], isLoading, error } = useCarros()
  const { mutate: agregarCarro, isPending } = useAgregarCarro()
  const form = useForm({
    defaultValues: carroFormInicial,
    onSubmit: ({ value }) => {
      agregarCarro(value, {
        onSuccess: () => {
          form.reset()
          void form.validateAllFields('change')
        },
      })
    },
  })

  if (isLoading) return <Text style={styles.message}>Cargando...</Text>
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>

  return (
    <View style={styles.screen}>
      <FlatList
        data={carros}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.brandHeader}>
              <Text style={styles.brandTitle}>Patiotuerca</Text>
            </View>
            <View style={styles.formCard}>
              <Text style={styles.heading}>Agregar carro</Text>
              <Text style={styles.description}>Completa los datos de tu vehículo</Text>
            <form.Field
              name="marca"
              validators={{
                onChange: ({ value }) => validarCampoCarro('marca', value),
                onMount: ({ value }) => validarCampoCarro('marca', value),
              }}
            >
              {(field) => (
                <View style={styles.formField}>
                  <TextInput
                    placeholder="🚘  Marca"
                    placeholderTextColor={colors.placeholder}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    style={styles.input}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>
            <form.Field
              name="anio"
              validators={{
                onChange: ({ value }) => validarCampoCarro('anio', value),
                onMount: ({ value }) => validarCampoCarro('anio', value),
              }}
            >
              {(field) => (
                <View style={styles.formField}>
                  <TextInput
                    placeholder="📅  Año"
                    placeholderTextColor={colors.placeholder}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    style={styles.input}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>
            <form.Field
              name="modelo"
              validators={{
                onChange: ({ value }) => validarCampoCarro('modelo', value),
                onMount: ({ value }) => validarCampoCarro('modelo', value),
              }}
            >
              {(field) => (
                <View style={styles.formField}>
                  <TextInput
                    placeholder="🚗  Modelo"
                    placeholderTextColor={colors.placeholder}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    style={styles.input}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>
            <form.Field
              name="color"
              validators={{
                onChange: ({ value }) => validarCampoCarro('color', value),
                onMount: ({ value }) => validarCampoCarro('color', value),
              }}
            >
              {(field) => (
                <View style={styles.formField}>
                  <TextInput
                    placeholder="🎨  Color"
                    placeholderTextColor={colors.placeholder}
                    value={field.state.value}
                    onChangeText={(value) => field.handleChange(limpiarColor(value))}
                    onBlur={field.handleBlur}
                    style={styles.input}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>
            <View style={styles.formRow}>
            <form.Field
              name="precio"
              validators={{
                onChange: ({ value }) => validarCampoCarro('precio', value),
                onMount: ({ value }) => validarCampoCarro('precio', value),
              }}
            >
              {(field) => (
                <View style={[styles.formField, styles.formFieldHalf]}>
                  <TextInput
                    placeholder="💰  Precio"
                    placeholderTextColor={colors.placeholder}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    style={styles.input}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>
            <form.Field
              name="kilometraje"
              validators={{
                onChange: ({ value }) => validarCampoCarro('kilometraje', value),
                onMount: ({ value }) => validarCampoCarro('kilometraje', value),
              }}
            >
              {(field) => (
                <View style={[styles.formField, styles.formFieldHalf]}>
                  <TextInput
                    placeholder="🛣️  Kilometraje"
                    placeholderTextColor={colors.placeholder}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    style={styles.input}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors.join(', ')}</Text>
                  )}
                </View>
              )}
            </form.Field>
            </View>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => {
                const disabled = !canSubmit || isSubmitting || isPending
                return (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => void form.handleSubmit()}
                    disabled={disabled}
                    style={[styles.primaryButton, disabled && styles.buttonDisabled]}
                  >
                    <Text style={styles.primaryButtonText}>
                      {isSubmitting || isPending ? '' : '＋  '}
                      {isSubmitting || isPending ? 'Guardando...' : 'Agregar'}
                    </Text>
                  </Pressable>
                )
              }}
            </form.Subscribe>
          </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <Text style={styles.vehicleTitle}>
              🚘  {item.marca} - {item.modelo ?? ''}
            </Text>
            <Text style={styles.vehicleDetails}>
              📅 Año: {item.anio ?? ''}  ·  🎨 Col.: {item.color ?? ''}  ·  🛣️ Km: {item.kilometraje ?? ''}  ·  💰 PVP: {item.precio ?? ''}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

const colors = {
  red: '#ED3024',
  background: '#F5F5F5',
  border: '#E5E5E5',
  text: '#292929',
  secondaryText: '#6B6B6B',
  placeholder: '#888888',
  white: '#FFFFFF',
  error: '#B42318',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  brandHeader: {
    minHeight: 88,
    justifyContent: 'center',
    paddingHorizontal: 22,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.red,
  },
  brandTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  formCard: {
    padding: 20,
    marginBottom: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  heading: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  description: {
    color: colors.secondaryText,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 22,
  },
  formField: {
    marginBottom: 14,
  },
  formRow: {
    flexDirection: 'row',
    columnGap: 12,
  },
  formFieldHalf: {
    flex: 1,
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
    backgroundColor: colors.white,
    color: colors.text,
    fontSize: 15,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 5,
  },
  primaryButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 18,
    borderRadius: 9,
    backgroundColor: colors.red,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  vehicleCard: {
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: '#E4E7EB',
    borderLeftColor: colors.red,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: '#26394B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
    elevation: 3,
  },
  vehicleTitle: {
    color: '#26394B',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  vehicleDetails: {
    color: '#718091',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 9,
  },
  message: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 16,
  },
})
