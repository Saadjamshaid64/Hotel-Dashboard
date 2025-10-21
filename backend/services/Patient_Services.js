import { Role } from "../models/roleModels.js";
import { Patient } from "../models/Patient_Models.js";
import { user } from "../models/userModels.js";

// create patient service
export const createPatientService = async (data) => {
  try {
    const { First_Name, Last_Name, Email } = data;

    const PatientRole = await Role.findOne({
      where: { rolename: "Patient" },
    });

    if (!PatientRole) throw new Error("Patient role not found");

    let existinguser = await user.findOne({ where: { email: Email } });

    if (!existinguser) {
      existinguser = await user.create({
        firstname: First_Name,
        lastname: Last_Name,
        email: Email,
        role: "Patient",
        password: 12345,
        roleId: PatientRole.id,
      });

      console.log("User created Successfully in service");
    } else {
      console.log("⚠️ User already exists for this patient email:", Email);
      throw new Error("User with this email already exists");
    }

    const result = await Patient.create({
      ...data,
      UserId: existinguser.id,
    });
    console.log("Patient created Successfully");
    return result;
  } catch (error) {
    console.log("Something wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// edit patient service
export const editPatientService = async (id, data) => {
  try {
    const patientId = await Patient.findByPk(id);
    if (!patientId) {
      console.log("User not existed");
      return null;
    }

    const updatePatient = await patientId.update(data);
    console.log("Patient updated Successfully");
    return updatePatient;
  } catch (error) {
    console.log("Something wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// delete patient service
export const deletePatientService = async (id) => {
  try {
    // const res = await Patient.findByPk(id);
    // if (!res) {
    //   console.log("Patient not found in Service");
    //   throw new Error("Patient not found");
    // }
    // await Patient.destroy({ where: { id } });

    // delete associated user using UserId
    // if (res.UserId) {
    //   await user.destroy({ where: { id: res.UserId } });
    // }

    // console.log("Patient deleted successfully in service");

    const result = await Patient.destroy({ where: { id } });
    if (result == 0) {
      console.log("Patient not found");
      return null;
    }
    console.log("Patient deleted Successfully");
    return result;
  } catch (error) {
    console.log("Something wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// fetch patient service
export const fetchPatientService = async () => {
  try {
    const result = await Patient.findAll();
    // if(result?.data)
    // {
    console.log("Patient fetched successfully in service");
    return result;
    // }
  } catch (error) {
    console.log("Patient not fetched successfully in service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};
