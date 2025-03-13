// @ts-ignore
export const patchObject = (original, patch) => {
  Object.entries(patch).forEach(([key, value]) => {
    typeof value === 'object' && patch[key] ? patchObject(original[key], patch[key]) : (original[key] = patch[key])
  })
}

export const getCode = Math.random().toString(36).toUpperCase().slice(6)

export const getFileExtensionFromName = (name: string) => name.split('.').pop()
