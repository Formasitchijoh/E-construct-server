const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  findAllUsers,
  findUserByEmail,
  createAllUser,
  updateUserById,
  createUser,
  updateUserToken
} = require("../models/user.model");

const getAllUsers = (req, res) => {
  findAll((err, users) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log(users);
    res.send(users);
  });
};

const handleNewUser = async (req, res) => {
  try {
    const {
      name,
      email,
      home_owner_id,
      technician_id,
      supplier_id,
      contact,
      location_id,
      user_type,
      password,
      confirm_password,
      expertise,
      specialties,
      ratings,
    } = req.body;
    if (!name || !email || !location_id || !user_type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
   let user = {
      name,
      email,
      location_id,
      user_type,
      password: hashPassword,
      confirm_password: hashPassword,
    };
    switch (user_type) {
      case "HW":
       user = { ...user, home_owner_id}
        break;
      case "SP":
        user = { ...user, supplier_id}
        break;
      case "TC":
        user = { ...user, technician_id}
      default:
        break;
    }

    const otherUsers = {
      name,
      contact,
      user_type,
      email,
    };

    let userType = "";
    console.log(`user type`, user_type);
    switch (user_type) {
      case "HW":
        const homeOwnerData = await createUser(otherUsers, "homeOwner");
        userType = "homeOwner";
        console.log(`value of the homeowner\n`, homeOwnerData);
        break;
      case "SP":
        const supplierData = await createUser(
          { ...otherUsers, specialties, ratings },
          "supplier"
        );
        userType = "supplier";
        console.log(`value of the supplierr\n`, supplierData);
        break;
      case "TC":
        const technicianData = await createUser(
          { ...otherUsers, expertise, ratings },
          "technician"
        );
        userType = "technician";
        console.log(`value of the technician\n`, technicianData);
        break;
      default: 
         console.log(`User type does not exist`);
        break;
    }

    const userData = await findUserByEmail(email, userType);
    const saveduser = userData[0];
    console.log("user", saveduser);
    let id ;
    switch (userType) {
      case "homeOwner":
        id = saveduser.homeOwner_id;
        break;
      case "supplier":
        id = saveduser.supplier_id;
        break;
      case "technician":
        id = saveduser.technician_id;
      default:
        break;
    }
    console.log(`value of the current User`, id);
    console.log(`valuf of the user type\n`, userType);
   
    switch (userType) {
      case "homeOwner":
        const newHomeOwner = await createAllUser({ ...user, home_owner_id: id });
        console.log(`iiiiiiiiiiiiii`);
        res.status(200).json(newHomeOwner);
        break;
      case "supplier":
        const  newSupplier = await createAllUser({ ...user, supplier_id: id });
        console.log(`iiiiiiiiiiiiii`);
        res.status(200).json(newSupplier);
        break;
      case "technician":
        const  newTechnician = await createAllUser({ ...user, technician_id: id });
        console.log(`iiiiiiiiiiiiii`);
        res.status(200).json(newTechnician);
      default:
        break;
    }
    
  } catch (error) {
    console.log(`Server error`, error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

const handleLogin = async(req, res) =>{
  const { email, password } = req.body

  if(!email || !password)  return res.status(400).json({message:"Email and password required"}) 

  
  const foundUser = await findUserByEmail(email, "user")
  if(!foundUser[0]) return res.sendStatus(401) 
  console.log(`Found user`, foundUser[0].user_type);
 

  const match = await bcrypt.compare(password, foundUser[0].password) 

  if(match){
    let userType = foundUser[0].user_type;
    let loggedInUser  = {}

    const accessToken = jwt.sign(
      { "Username":foundUser[0].name },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'300s'}
    )

    const refreshToken = jwt.sign(
      {"Username":foundUser[0].name},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn:"1d"}
    )

    const savedToken = await updateUserToken(email, refreshToken)
    if(!savedToken) return res.status(500).json({message:"Server Error Unable to update User"})

    console.log(`Logged in user saved token \n`, savedToken);
    switch (userType) {
      case "HW":
        const homeOwnerUser = await findUserByEmail(email, "homeOwner")
        loggedInUser  = homeOwnerUser[0]
        break;
        case "SP":
          const supplierUser = await findUserByEmail(email, "supplier")
          loggedInUser  = supplierUser[0]
          break;
          case "TC":
          const technicianUser = await findUserByEmail(email, "technician")
          loggedInUser  = technicianUser[0]
          break;
        default:
        res.status(400).json({message:"No User found this"})
        break;
    }

    console.log(`ggggggggggg`, loggedInUser);

    console.log(`saved Users and their token\n`, savedToken);
    res.cookie('jwt', refreshToken, { httpOnly:true, sameSite:'None', maxAge:24 * 60 * 60* 1000})
    res.json({accessToken})
  }else{
    res.sendStatus(401)
  }


}
module.exports = { getAllUsers, handleNewUser, handleLogin };
