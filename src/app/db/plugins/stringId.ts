import { ObjectId, Schema, SchemaType, SchemaTypeOptions } from 'mongoose'

interface RefOptions extends SchemaTypeOptions<any> {
  ref?: string
}

export function addStringIds(schema: Schema) {
  schema.virtual('id').get(function () {
    return (this._id as ObjectId)?.toString()
  })
}
