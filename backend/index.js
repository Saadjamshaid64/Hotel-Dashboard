










import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors';

const app = express()

app.use(express.json())

// Allow requests from any origin (for development)
app.use(cors());


// call router
app.use('/api/user',userRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

  app.listen(process.env.PORT , () => {
    console.log(`🔄 Auto-reload: Enabled via nodemon ✅`);
  });