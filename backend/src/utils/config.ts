import 'dotenv/config'

const PORT = process.env.PORT

//if node_env is in production use live database, set database to test if in development
let DATABASE_URL: string = process.env.NODE_ENV === 'production' 
  ? process.env.DATABASE_URL as string
  : process.env.TEST_DATABASE_URL as string


const SECRET: string = process.env.SECRET as string

export default { PORT, DATABASE_URL, SECRET }