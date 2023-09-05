import 'dotenv/config'

const PORT = process.env.PORT
const DATABASE_URL: string = process.env.DATABASE_URL as string

export default { PORT, DATABASE_URL }