'use client'
import { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FileWithPath, useDropzone } from 'react-dropzone'

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    fieldChange(acceptedFiles)
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    }
  })

  return (
    <div {...getRootProps()} className="flex cursor-pointer flex-col bg-dark-3">
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className='flex h-80 w-full flex-1 flex-col p-5 lg:p-10'>
          <img src={fileUrl} alt="image" className="h-80 w-full rounded-[24px] object-cover object-top lg:h-[480px]" />
          <p className="small-regular w-full border-t border-t-dark-4 p-4 text-center text-light-4">Click or drag photo to replace</p>
        </div>
      ) : (
        <div className='flex-center h-80 flex-col p-7 lg:h-[612px]'>
          <img src="/assets/icons/file-upload.svg" alt="file upload" width={96} height={77} />
          <h3 className="base-medium mt-8 text-light-2">Drag photo here</h3>
          <p className="small-regular text-light-4">SVG, PNG, JPG</p>
          <Button type="button" className="mt-5 bg-dark-4">Select from computer</Button>
        </div>
      )}
    </div >
  )
}

export default FileUploader