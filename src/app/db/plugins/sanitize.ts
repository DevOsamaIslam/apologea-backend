import { Schema, SchemaTypeOptions } from 'mongoose'

interface RefOptions extends SchemaTypeOptions<any> {
  ref?: string
}

export function sanitize(schema: Schema) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, doc) => {
      delete doc._id
      return doc
    },
  })
}
