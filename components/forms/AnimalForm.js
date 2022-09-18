import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Input from './Input'
import Select from './Select'
import Button from '../Button'

const AnimalForm = ({ formId, objectForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: objectForm.name,
    size: objectForm.size.value,
    leaving: objectForm.leaving.value,
    rare_leaving: objectForm.rare_leaving.value,
    time: objectForm.time.value,
    weather: objectForm.weather.value,
    location_x: objectForm.location_x,
    location_y: objectForm.location_y,
    image_url: objectForm.image_url
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/animals/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/animals/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      console.log(form)
      const res = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        console.log(res)
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      console.log(error)
      setMessage('Failed to add')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    console.log([name, value])

    setForm({
      ...form,
      [name]: value,
    })
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.location_x) err.location_x = 'Coordinates are required'
    if (!form.location_y) err.location_y = 'Coordinates are required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    console.log(form);
    if (Object.keys(errs).length === 0) {
      forNewObject ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <div className="max-w-screen-md mx-auto ">
      <form id={formId} onSubmit={handleSubmit} className="mt-6">
        <Input 
          type="text" 
          id="name" 
          name="name" 
          defaultValue={form.name} 
          onChange={handleChange}
          required
          maxLength="60"
          label="Animal Name" />

        <Select
          id="size"
          name="size"
          label="Size"
          onChange={handleChange}
          defaultValue={objectForm.size.value}
          elements={objectForm.size.options}
        />
        
        <div className="flex">
          <Select
            id="leaving"
            name="leaving"
            label="Primary Leaving"
            onChange={handleChange}
            defaultValue={objectForm.leaving.value}
            elements={objectForm.leaving.options}
            className="flex-1 mr-6"
          />
          
          <Select
            id="rare_leaving"
            name="rare_leaving"
            label="Rare Leaving"
            onChange={handleChange}
            defaultValue={objectForm.rare_leaving.value}
            elements={objectForm.rare_leaving.options}
            className="flex-1"
          />
        </div>

        
        <div className="flex">
          <Select
            id="time"
            name="time"
            label="Spawn Time"
            onChange={handleChange}
            defaultValue={objectForm.time.value}
            elements={[ "", ...objectForm.time.options ]}
            className="flex-1 mr-6"
          />
          
          <Select
            id="weather"
            name="weather"
            label="Weather Condition"
            onChange={handleChange}
            defaultValue={objectForm.weather.value}
            elements={[ "", ...objectForm.weather.options ]}
            className="flex-1"
          />
        </div>

        <div className="flex max-w-sm">
          <Input 
            type="number" 
            id="location_x" 
            name="location_x" 
            defaultValue={form.location_x} 
            onChange={handleChange}
            required
            label="X Coordinate"
            className="mr-6" />
          <Input 
            type="number" 
            id="location_y" 
            name="location_y" 
            defaultValue={form.location_y} 
            onChange={handleChange}
            required
            label="Y Coordinate" />
        </div>
        <Input 
            type="url" 
            id="image_url" 
            name="image_url" 
            defaultValue={form.image_url} 
            onChange={handleChange}
            required
            label="Image URL" />

        <Button type="submit">Submit</Button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </div>
  )
}

export default AnimalForm
