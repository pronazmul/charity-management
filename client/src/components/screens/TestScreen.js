import { Formik } from 'formik'
import SelectOption from '../elements/SelectOption'
import { StudentRegistrationSchema } from '../validationSchemas/yupSchema'
import TextInput from './../elements/TextInput'
import RadioInput from './../elements/RadioInput'
import { toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'
import { truthyValuesFromObject } from '../utilities/helperFunctions'
import ImageInput from '../elements/ImageInput'

export default function EditStudent({ modalHandler, id }) {
  const [loading, setLoading] = React.useState(false)
  const [student, setStudent] = React.useState({})

  const updateStudentHandler = async (values) => {
    setLoading(true)
    try {
      let truthyValues = truthyValuesFromObject(values)
      let config = {
        method: 'put',
        url: `https://alauddinapi.pronazmul.com/api/v1/students/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { ...truthyValues },
      }
      await axios(config)
      toast.success('Student Updated Successfully!')
      setLoading(false)
      modalHandler()
    } catch (error) {
      toast.error('Failed to update Student!')
      setLoading(false)
    }
  }

  React.useEffect(() => {
    async function fechData() {
      try {
        setLoading(true)
        let { data } = await axios.get(
          `https://alauddin-academy.herokuapp.com/api/v1/students/${id}`
        )
        setStudent(data.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error('Failed to load Student')
        modalHandler()
      }
    }
    fechData()
  }, [])

  return (
    <>
      <div className='bg-primary rounded px-4 py-6'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-active'></div>
          </div>
        ) : student ? (
          <Formik
            initialValues={{
              name: student?.name,
              class: student?.class,
              section: student?.section,
              email: student?.email,
              gender: student?.gender,
              bloodGroup: student?.bloodGroup,
              studentPhone: student?.studentPhone,
              roll: student?.roll,
              fathersName: student?.fathersName,
              fathersProfession: student.fathersProfession,
              mothersName: student?.mothersName,
              mothersProfession: student?.mothersProfession,
              parentsPhone: student?.parentsPhone,
              address: student?.address,
            }}
            validationSchema={StudentRegistrationSchema}
            onSubmit={updateStudentHandler}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-3'>
                <div className='col-span-full md:col-span-2'>
                  <TextInput
                    name='name'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                    required
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <SelectOption
                    name='class'
                    options={['8', '9', '10', '11', '12']}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                    required
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <SelectOption
                    name='section'
                    options={['a', 'b', 'c', 'd']}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                    required
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <RadioInput
                    name='gender'
                    options={['male', 'female']}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                    required
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <SelectOption
                    name='bloodGroup'
                    options={['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-']}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='studentPhone'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='roll'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='fathersName'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='fathersProfession'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='mothersName'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='mothersProfession'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='parentsPhone'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                  />
                </div>
                <div className='col-span-full md:col-span-1'>
                  <TextInput
                    name='address'
                    type='text'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    label
                    errorMessage
                    required
                  />
                </div>
                <div className='col-span-full'>
                  <ImageInput values={student} id={id} />
                </div>
                <div className='col-span-full'>
                  <button
                    className='btn-primary bg-active text-white hover:bg-opacity-80  text-sm transition duration-300 ease-in-out'
                    type='submit'
                  >
                    Update Student
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <h3>NO Data Fond</h3>
        )}
      </div>
    </>
  )
}
