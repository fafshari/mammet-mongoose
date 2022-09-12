import dbConnect from '../../../lib/dbConnect'
import Animal from '../../../models/Animal'

export default async function handler(req, res) {

  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const animals = await Animal.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: animals })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const animal = await Animal.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: animal })
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
      }
      break
    default:
      console.log('something bad happened');
      res.status(400).json({ success: false })
      break
  }
}
