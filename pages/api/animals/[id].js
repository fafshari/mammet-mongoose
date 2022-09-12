import dbConnect from '../../../lib/dbConnect'
import Animal from '../../../models/Animal'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const animal = await Animal.findById(id)
        if (!animal) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: animal })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const animal = await Animal.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!animal) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: animal })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedAnimal = await Animal.deleteOne({ _id: id })
        if (!deletedAnimal) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
