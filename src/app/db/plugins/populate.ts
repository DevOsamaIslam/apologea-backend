import { Schema, SchemaType, SchemaTypeOptions } from 'mongoose'

interface RefOptions extends SchemaTypeOptions<any> {
  ref?: string
}

export function autoPopulateVirtuals(schema: Schema) {
  function createVirtual(path: string, schemaType: SchemaType) {
    const opts = schemaType.options as RefOptions

    if (!opts?.ref) return
    if (!path.endsWith('Id')) return

    const virtualName = path.replace(/Id$/, '')

    schema.virtual(virtualName, {
      ref: opts.ref,
      localField: path,
      foreignField: '_id',
      justOne: true,
    })
  }

  function walkSchema(currentSchema: Schema, prefix = '') {
    currentSchema.eachPath((path: string, schemaType: SchemaType) => {
      const fullPath = prefix ? `${prefix}.${path}` : path

      const opts = schemaType.options as RefOptions

      if (opts?.ref) {
        createVirtual(fullPath, schemaType)
      }

      const anyType = schemaType as any

      // Array of subdocuments
      if (anyType.schema) {
        walkSchema(anyType.schema, fullPath)
      }

      // Single nested subdocument
      if (anyType.$embeddedSchemaType?.schema) {
        walkSchema(anyType.$embeddedSchemaType.schema, fullPath)
      }
    })
  }

  walkSchema(schema)
}
