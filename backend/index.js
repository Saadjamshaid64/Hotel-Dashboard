import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import roleRoutes from "./routes/roleRoutes.js"
import providerRoutes from "./routes/providerRoutes.js"
import medicineRouter from "./routes/medicineRoutes.js"
import labRoutes from "./routes/labRoutes.js"
import bundleRoutes from "./routes/bundleRoutes.js"
import Patient_Routes from "./routes/Patient_Routes.js"
import Schedule_Routes from "./routes/Schedule_Routes.js"
import cors from 'cors';

const app = express()

app.use(express.json())


// Allow requests from any origin (for development)
app.use(cors());


// call router for user
app.use('/api/user',userRoutes)

// call router for role
app.use('/api/role',roleRoutes)

// call router from provider
app.use("/api/provider",providerRoutes)

// call router for medicine
app.use("/api/medicine",medicineRouter)

// call router for lab
app.use("/api/lab",labRoutes)

// call router for bundle
app.use("/api/bundle",bundleRoutes)

// call router for patient
app.use("/api/patient", Patient_Routes)

// call router for patient
app.use("/api/schedule", Schedule_Routes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

  app.listen(process.env.PORT , () => {
    console.log(`🔄 Auto-reload: Enabled via nodemon ✅`);
  });