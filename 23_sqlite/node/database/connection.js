import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await 
export default await (async () => {
    // open the database
    return await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
})()