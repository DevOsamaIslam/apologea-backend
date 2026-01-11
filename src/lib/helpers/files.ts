import { Request } from 'express'
import fileUpload from 'express-fileupload'
import fs from 'fs'
import path from 'path'
import { getFileExtensionFromName } from './util'
import { SERVER_ADDRESS } from 'app/settings'

export const handleFileUpload = async ({
  files,
  targetFolder,
}: {
  files: fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined
  targetFolder: string
}) => {
  if (!files) return []

  const uploadedFiles: string[] = []

  // Ensure the target folder exists, create it if it doesn't
  const uploadPath = path.join('uploads', targetFolder)
  await fs.promises.mkdir(path.join('src/public', uploadPath), { recursive: true })

  for (const file of Array.isArray(files) ? files : [files]) {
    const uploadedFile = file as fileUpload.UploadedFile

    const filePath = path.join(
      uploadPath,
      `${uploadedFile.md5}.${getFileExtensionFromName(uploadedFile.name)}`,
    )

    // Move the uploaded file to the desired path
    await uploadedFile.mv(path.join('src/public', filePath))
    uploadedFiles.push('http://' + path.join(SERVER_ADDRESS, filePath))
  }

  return uploadedFiles
}

export const handleFileDeletion = async (filePath: string) => {
  // check if the file exists
  if (!fs.existsSync(path.join('src/public', filePath))) return false

  // delete the file
  await fs.promises.unlink(path.join('src/public', filePath))
  return true
}
