import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import roleRoutes from "./routes/roleRoutes.js"
import cors from 'cors';

const app = express()

app.use(express.json())


// Allow requests from any origin (for development)
app.use(cors());


// call router for user
app.use('/api/user',userRoutes)

// call router for role
app.use('/api/role',roleRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

  app.listen(process.env.PORT , () => {
    console.log(`🔄 Auto-reload: Enabled via nodemon ✅`);
  });