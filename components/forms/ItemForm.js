import { useEffect, useState } from 'react'
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
    image_url: objectForm.image_url,
    sell_price: objectForm.sell_price,
    sell_currency: objectForm.sell_currency.options[0],
    attainability: objectForm.attainability.value,
    usability: objectForm.usability.value,
    custom_meta: objectForm.custom_meta.value
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

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleCustomMetaChange = (e) => {
    const target = e.target
    const idx_key = target.name.substring('custom_meta_'.length).split('_')
    const new_meta = form.custom_meta.map((meta) => {
      if (meta.index == idx_key[0]) {
        return { ...meta, [idx_key[1]] : target.value }
      }
      return meta
    })

    form.custom_meta = new_meta
    setForm({...form})
  }

  const handleCheckboxChange = (e, key, value) => {
    const target = e.target
    if (!target.checked) {
      form[key] = form[key].filter((item) => {
        return item !== value
      })
    } else {
      form[key].push(value)
    }
    setForm({...form})
  }

  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      form.custom_meta = form.custom_meta.map(({ index, ...item }) => item)
      forNewObject ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  const handleMetaAdd = (e) => {
    e.preventDefault()
    form.custom_meta.push({...objectForm.custom_meta.meta_fields, 
      index: form.custom_meta.at(-1) ? 
        form.custom_meta.at(-1).index + 1 : 0 })
    setForm({...form})
  }

  const handleMetaDelete = (e, data) => {
    e.preventDefault()
    const new_meta = form.custom_meta.filter((meta) => {
      return meta !== data
    })
    form.custom_meta = new_meta
    setForm({...form})
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          maxLength="60"
          name="name"
          defaultValue={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="item_type">Item Type</label>
        <select name="item_type" onChange={handleChange} defaultValue={objectForm.item_type.value} required>
          {objectForm.item_type.options.map((value, index) => {
            return <option key={index} value={value}>{value}</option>
          })}
        </select>

        <label htmlFor="description">Item Description</label>
        <input
          type="textarea"
          maxLength="255"
          name="description"
          defaultValue={form.description}
          onChange={handleChange}
        />

        <div className="checkbox">
          <input
            type="checkbox"
            name="untradable"
            checked={form.untradable}
            onChange={handleChange}
          />
          <label htmlFor="untradable">Untradable</label>
        </div>
            
        <div className="checkbox">
          <input
            type="checkbox"
            name="unique"
            checked={form.unique}
            onChange={handleChange}
          />
          <label htmlFor="unique">Unique</label>
        </div>

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          defaultValue={form.image_url}
          onChange={handleChange}
        />
        
        <label htmlFor="sell_price">Sell Price</label>
        <input
          type="number"
          name="sell_price"
          defaultValue={form.sell_price}
          onChange={handleChange}
        />

        <label htmlFor="sell_currency">Sell Currency</label>
        <select name="sell_currency" onChange={handleChange} defaultValue={objectForm.sell_currency.value} required>
          {objectForm.sell_currency.options.map((value, index) => {
            return <option key={index} value={value}>{value}</option>
          })}
        </select>

        <h4>Attainability</h4>
        <ul>
          {objectForm.attainability.options.map((value, index) => {
            return (
              <li key={index} className="checkbox">
                <input 
                  type="checkbox" 
                  id={`attainability-${index}`}
                  name={`attainability-${index}`}
                  value={value}
                  checked={form.attainability.includes(value)}
                  onChange={(e) => handleCheckboxChange(e, 'attainability', value)}/> <label>{value}</label>
              </li>
            )
          })}
        </ul>

        <h4>Usability</h4>
        <ul>
          {objectForm.usability.options.map((value, index) => {
            return (
              <li key={index} className="checkbox">
                <input 
                  type="checkbox" 
                  id={`usability-${index}`}
                  name={`usability-${index}`}
                  value={value}
                  checked={form.usability.includes(value)}
                  onChange={(e) => handleCheckboxChange(e, 'usability', value)}/> <label>{value}</label>
              </li>
            )
          })}
        </ul>
        
        <h4>Custom Meta</h4>
        <div className="subdoc-list">
          {form.custom_meta.map((value) => {
            return (
              <div key={value.index} className="subdoc">
                <label htmlFor={`custom_meta_${value.index}_key`}>Key</label>
                <input
                  type="text"
                  name={`custom_meta_${value.index}_key`}
                  defaultValue={value.key}
                  onChange={handleCustomMetaChange}
                />
                <label htmlFor={`custom_meta_${value.index}_value`}>Value</label>
                <input
                  type="text"
                  name={`custom_meta_${value.index}_value`}
                  defaultValue={value.value}
                  onChange={handleCustomMetaChange}
                />
                <label htmlFor={`custom_meta_${value.index}_description`}>Description</label>
                <input
                  type="text"
                  name={`custom_meta_${value.index}_description`}
                  defaultValue={value.description}
                  onChange={handleCustomMetaChange}
                />
                <button onClick={((e) => handleMetaDelete(e, value))} className="btn delete">Delete</button>
              </div>
            )
          })}
          <button onClick={handleMetaAdd} className="btn edit">Add New</button>
        </div>

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
