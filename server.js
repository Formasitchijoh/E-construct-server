require('dotenv').config();
const express = require('express');
const materialRoutes = require('./src/routes/material.routes');
const projectRoutes = require('./src/routes/project.routes')
const houseplanRoutes = require('./src/routes/houseplan.routes')
const ordersRoutes = require('./src/routes/orders.routes')
const paymentRoutes = require('./src/routes/payment.routes')
const bidRoutes = require('./src/routes/bid.routes')
const usersRoutes = require('./src/routes/auth.routes')
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser') 
const corsOptions = require('../server/config/corsOptions')
const refreshRoutes = require('./src/routes/refresh.route')
const logOutRoute = require('./src/routes/logOut.route')
const verifyJwt = require('./src/middleware/verifyJWT')
const supplierDashboardRoute = require('./src/routes/supplierDashboard.route')
// Creating an express app
const app = express();

const port = process.env.PORT || 4000;

// Parse request of Content-type -application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// Parse request of content-type - application/json
// app.use(bodyParser.json());


app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:false}))

//middleware of cookies
app.use(cookieParser())

// Define a root route
app.get('/', (req, res) => {
  res.send('Hello World!');
  // req.
});




// Using employeeRoutes as middleware
app.use('/api/user', usersRoutes )
app.use('/api/v1/refresh', refreshRoutes )
app.use('/api/v1/logout', logOutRoute) 

app.use(verifyJwt)
app.use('/api/supplier/dashboard', supplierDashboardRoute)
app.use('/api/v1/material', materialRoutes);
app.use('/api/v1/project', projectRoutes )
app.use('/api/v1/bid', bidRoutes )
app.use('/api/v1/orders', ordersRoutes )
app.use('/api/v1/payment', paymentRoutes )

app.use('/api/v1/houseplan', houseplanRoutes )


// Listen to requests
app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});