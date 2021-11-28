import express from 'express';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

app.use('/api', authRoutes);
app.use('/api', studentRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ 
      message: "Welcome to amategeko y' umuhanda API." 
    });
});


app.use((req, res) => {
  res.type('json').status(404).json({
      message: '404 Endpoint not found',
      status: 404
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
