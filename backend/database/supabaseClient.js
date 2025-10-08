







// import { createClient } from '@supabase/supabase-js'
// import { Pool } from 'pg';
import {Sequelize} from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);


// console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
// console.log("SUPABASE_SECRET_KEY:", process.env.SUPABASE_SECRET_KEY ? "Loaded ✅" : "Missing ❌");

// Initialize Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SECRET_KEY
// );

// export const pool = new Pool({ 
//   connectionString: process.env.DATABASE_URL,
// });

// pool.connect()
// .then(console.log("✅ Connected to Supabase Postgres"))
// .catch(err => console.error("❌ Database connection error:", err));


// Create Sequelize instance connected to Supabase PostgreSQL
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log
})

try {
  await sequelize.authenticate();
  console.log('✅ Connected to Supabase PostgreSQL successfully.')
} catch (error) {
  console.log('❌ Database connection failed:', error)
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// export default supabase;