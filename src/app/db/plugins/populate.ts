import { Schema, SchemaType, SchemaTypeOptions } from 'mongoose'

interface RefOptions extends SchemaTypeOptions<any> {
  ref?: string
}

export function autoPopulateVirtuals(schema: Schema) {
  console.log('reached inside')
  function createVirtual(path: string, schemaType: SchemaType) {
    const opts = schemaType.options as RefOptions
    if (!opts?.ref) return

    if (!path.endsWith('Id')) return // only transform XId → X

    const virtualName = path.replace(/Id$/, '')

    schema.virtual(virtualName, {
      ref: opts.ref,
      localField: path,
      foreignField: '_id',
      justOne: true,
    })
  }

  // Handle normal paths + nested subSchemas
  schema.eachPath((path: string, schemaType: SchemaType) => {
    const opts = schemaType.options as RefOptions

    // direct field with ref
    if (opts?.ref) {
      createVirtual(path, schemaType)
    }

    // arrays / subDocs:
    // schemaType['schema'] exists when the field is an array of subDocuments
    const subSchema = (schemaType as any).schema as Schema | undefined
    if (subSchema) {
      subSchema.eachPath((subPath: string, subType: SchemaType) => {
        const fullPath = `${path}.${subPath}`
        const subOpts = subType.options as RefOptions

        if (subOpts?.ref) {
          createVirtual(fullPath, subType)
        }
      })
    }
  })
}
