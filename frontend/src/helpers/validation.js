import * as yup from 'yup'

export const CreateDatasetSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  deviceName: yup.string().required('Device name is required'),
  endDate: yup.date().required('End date is required'),
  interval: yup
    .number()
    .min(1, 'Enter a number greater or equal than 1')
    .max(1000, 'Enter a number less than 1000')
    .required('Interval is required'),
})

export const SettingEmailSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email'),
})

export const SettingFullNodeIotaUrlSchema = yup.object().shape({
  fullNodeIotaUrl: yup.string().url('Please enter a valid url'),
})

export const SettingExplorerUrlSchema = yup.object().shape({
  explorerUrl: yup.string().url('Please enter a valid url'),
})
