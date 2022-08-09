import * as yup from 'yup'

const regx = {
  image: ['image/jpeg', 'image/jpg', 'image/png'],
  password:
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  mobile: /(\+088)?-?01[0-9]\d{8}/g,
  alphabet: /^[A-Z a-z]+$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const proudctAddSchema = yup.object().shape({
  name: yup
    .string()
    .matches(regx.alphabet, 'Character Only')
    .min(3, 'Too Short !')
    .max(50, 'Too Long !')
    .required('Should Not Be Empty'),
  brand: yup
    .string()
    .min(3, 'Too Short !')
    .max(20, 'Too Long !')
    .required('Should Not Be Empty'),
  category: yup.string().required('Should Not Be Empty'),
  description: yup
    .string()
    .min(10, 'Too Short !')
    .max(1000, 'Too Long !')
    .required('Should Not Be Empty'),
  price: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .max(5, 'Maximum Price Limit!')
    .required('Price is Required!'),
  countInStock: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .max(5, 'Maximum Stock Limit!')
    .required('Stock is Required!'),
  images: yup.array().min(1, 'Minimum 1 Product Image Required'),
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(regx.email, 'Invalid Email Address!')
    .required('Email is Required!'),
  password: yup
    .string()
    .matches(regx.password, 'Invalid Password!')
    .required('Password Is Required!'),
})
export const addUserSchema = yup.object().shape({
  name: yup.string().required('Name is Required!'),
  email: yup
    .string()
    .matches(regx.email, 'Invalid Email Address!')
    .required('Email is Required!'),
  mobile: yup
    .string()
    .matches(regx.mobile, 'Invalid Mobile Number!')
    .required('Mobile Number is Required!'),
  password: yup
    .string()
    .matches(regx.password, 'Invalid Password!')
    .required('Password Is Required!'),
})
export const addDonorSchema = yup.object().shape({
  name: yup.string().required('Name is Required!'),
  email: yup
    .string()
    .matches(regx.email, 'Invalid Email Address!')
    .required('Email is Required!'),
  mobile: yup
    .string()
    .matches(regx.mobile, 'Invalid Mobile Number!')
    .required('Mobile Number is Required!'),
  organization: yup.string().required('Organization or Self Name!'),
  amount: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be digits only!')
    .required('Donation amount is required!'),
})
export const addCharitySchema = yup.object().shape({
  item: yup.string().required('Charity Item is Required!'),
  category: yup.string().required('Charity Category is Required!'),
  charityFor: yup.string().required('Charity For Field is Required!'),
  quantity: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be digits only!')
    .required('Quantity is Rquired!'),
  unit: yup.string().required('Charity Unit is Required!'),
  netPrice: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be digits only!')
    .required('Net Price is Rquired!'),
  city: yup.string().required('Charity City is Requied!'),
  division: yup.string().required('Charity division is Requied!'),
})

export const updateUserSchema = yup.object().shape({
  name: yup.string().required('Name is Required!'),
  email: yup
    .string()
    .matches(regx.email, 'Invalid Email Address!')
    .required('Email is Required!'),
  mobile: yup
    .string()
    .matches(regx.mobile, 'Invalid Mobile Number!')
    .required('Mobile Number is Required!'),
  password: yup.string().matches(regx.password, 'Invalid Password!'),
})
export const updateDonorSchema = yup.object().shape({
  name: yup.string().required('Name is Required!'),
  email: yup
    .string()
    .matches(regx.email, 'Invalid Email Address!')
    .required('Email is Required!'),
  mobile: yup
    .string()
    .matches(regx.mobile, 'Invalid Mobile Number!')
    .required('Mobile Number is Required!'),
  organization: yup.string().required('Organization or Self Name!'),
})
export const updateCharitySchema = yup.object().shape({
  item: yup.string().required('Charity Item is Required!'),
  charityFor: yup.string(),
  unit: yup.string().required('Charity Unit is Required!'),
  city: yup.string().required('Charity City is Requied!'),
  division: yup.string().required('Charity division is Requied!'),
})
