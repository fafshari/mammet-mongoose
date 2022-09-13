import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const ItemForm = ({ formId, objectForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: objectForm.name,
    item_type: objectForm.item_type.options[0],
    description: objectForm.description,
    untradable: objectForm.untradable,
    unique: objectForm.unique,
    image_url: objectForm.image_url
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/items/${id}`, {
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

      mutate(`/api/items/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      console.log(form)
      const res = await fetch('/api/items', {
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
    const value = 
        target.name === 'untradable' || target.name === 'unique' ? 
            target.checked : target.value
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
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          maxLength="60"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="item_type">Item Type</label>
        <select name="item_type" onChange={handleChange} defaultValue={objectForm.item_type.value} required>
            {
              objectForm.item_type.options.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })
            }
        </select>

        <label htmlFor="description">Item Description</label>
        <input
          type="textarea"
          maxLength="255"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        
        <label htmlFor="untradable">Untradable</label>
        <input
          type="checkbox"
          name="untradable"
          checked={form.untradable}
          onChange={handleChange}
        />

        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          checked={form.unique}
          onChange={handleChange}
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

export default ItemForm
