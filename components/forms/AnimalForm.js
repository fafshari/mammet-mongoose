import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const AnimalForm = ({ formId, objectForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: objectForm.name,
    size: objectForm.size.options[0],
    leaving: objectForm.leaving.options[0],
    rare_leaving: objectForm.rare_leaving.options[0],
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
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Animal Name</label>
        <input
          type="text"
          maxLength="60"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="size">Size</label>
        <select name="size" onChange={handleChange} defaultValue={objectForm.size.value}>
            {
              objectForm.size.options.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })
            }
        </select>

        <label htmlFor="leaving">Primary Leaving</label>
        <select name="leaving" onChange={handleChange} defaultValue={objectForm.leaving.value}>
            {
              objectForm.leaving.options.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })
            }
        </select>

        <label htmlFor="rare_leaving">Rare Leaving</label>
        <select name="rare_leaving" onChange={handleChange} defaultValue={objectForm.rare_leaving.value}>
            {
              objectForm.rare_leaving.options.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })
            }
        </select>

        <label htmlFor="time">Spawn Time</label>
        <select name="time" onChange={handleChange} defaultValue={objectForm.time.value}>
          <option value="">None</option>
            {
              objectForm.time.options.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })
            }
        </select>
        

        <label htmlFor="weather">Weather Condition</label>
        <select name="weather" onChange={handleChange} defaultValue={objectForm.weather.value}>
          <option value="">None</option>
            {
              objectForm.weather.options.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })
            }
        </select>
        
        <label htmlFor="location_x">X Coordinate</label>
        <input
          type="number"
          name="location_x"
          value={form.location_x}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="location_y">Y Coordinate</label>
        <input
          type="number"
          name="location_y"
          value={form.location_y}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default AnimalForm
