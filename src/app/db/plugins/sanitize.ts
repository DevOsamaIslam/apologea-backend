import { Schema, SchemaTypeOptions } from 'mongoose'

interface SensitiveFieldsOptions {
  fields?: string[]
}

export function sensitiveFieldsPlugin(schema: Schema, options: SensitiveFieldsOptions = {}): void {
  const sensitiveFields = options.fields ?? ['password', 'resetPasswordToken', 'verification']

  const transform = (
    doc: Document & {
      $__?: {
        selected?: Record<string, 0 | 1 | boolean>
      }
    },
    ret: Record<string, unknown>,
  ) => {
    const selected = doc.$__?.selected ?? {}

    for (const field of sensitiveFields) {
      const explicitlySelected = selected[field] === 1 || selected[field] === true

      if (!explicitlySelected) {
        delete ret[field]
      }
    }

    return ret
  }

  schema.set('toJSON', {
    virtuals: true,
    // @ts-expect-error
    transform,
  })

  schema.set('toObject', {
    virtuals: true,
    // @ts-expect-error
    transform,
  })
}
