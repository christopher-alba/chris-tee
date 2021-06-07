import axios from 'axios'

export async function fileUpload(formData) {
  const config = {
    method: 'POST',
    url: '/api/product',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  }

  return await axios(config).data
}
