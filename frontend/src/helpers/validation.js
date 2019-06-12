import * as yup from 'yup'

export const CreateDatasetSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  deviceName: yup.string().required('Device name is required'),
  endDate: yup.date().required('End date is required'),
})
