export type UploadFileMutationVars = {
    base64Str: string
    category: string
    extension: string
    fileName: string
}

export type UploadFileMutationRes = {
    uploadFile: {
        filePath: string
    }
}