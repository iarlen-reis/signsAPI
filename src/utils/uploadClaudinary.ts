import { v2 as cloudinary } from 'cloudinary'
import { IFile } from '../@types/ISignController'
import { IUploadClaudinary } from '../@types/IUploadClaudinary'

export const uploadClaudinary = async (
  file: IFile,
): Promise<IUploadClaudinary> => {
  const uploadToCloudinary = (file: IFile) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            console.error('Erro durante o upload para o Cloudinary:', error)
            reject(new Error('Erro durante o upload para o Cloudinary'))
          } else {
            resolve(result)
          }
        },
      )

      file.file.pipe(uploadStream)
    })
  }
  try {
    const uploadResult = (await uploadToCloudinary(
      file,
    )) as unknown as IUploadClaudinary

    return uploadResult
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao fazer upload para o Cloudinary')
  }
}
