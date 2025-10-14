import { Provider } from "../models/providerModels.js";
import { Role } from "../models/roleModels.js";
import { user } from "../models/userModels.js";

// create Provider
export const createProviderService = async (data) => {
  try {
    const { providername, email } = data;

    const providerRole = await Role.findOne({
      where: { rolename: "Provider" },
    });

    if (!providerRole) throw new Error("Provider role not found");

    let existingUser = await user.findOne({ where: { email } });

    if (!existingUser) {
      existingUser = await user.create({
        firstname: providername,
        lastname: "",
        email,
        role: "Provider",
        password: 12345,
        roleId: providerRole.id,
      });
      // console.log("✅ User record auto-created for provider:", email);
      console.log("User created Successfully in service");
    } else {
      console.log("⚠️ User already exists for this provider email:", email);
      throw new Error("User with this email already exists");
    }

    const result = await Provider.create({
      ...data,
      userId: existingUser.id,
    });
    console.log("✅ Provider created successfully:", providername);
    return result;
  } catch (error) {
    console.log("Error in service", error.message);
    throw new Error(error.message);
  }
};

// edit Provider
export const editProviderService = async (id, data) => {
  try {
    const user = await Provider.findByPk(id);
    if (!user) {
      console.log("User not existed");
    }
    const result = await user.update(data);
    console.log("User created Successfully in Service");
    return result;
  } catch (error) {
    console.log("Error in service", error.message);
    throw new Error(error.message);
  }
};

// delete Provider
export const deleteProviderService = async (id) => {
  try {
    const provider = await Provider.findByPk(id);
    // console.log(provider.toJSON());
    if (!provider) {
      console.log("Provider not found in Service");
      throw new Error("Provider not found");
    }

    await user.destroy({ where: { id: provider.userId } });
    console.log("User deleted successfully in service");

    // const deletedProvider = await Provider.destroy({ where: { id } });
    // if (deletedProvider === 0) {
    //   console.log("User not found in Service");
    // }
    // console.log("User deleted successfully in service");
    // return deletedProvider

    return {success: true}
  } catch (error) {
    console.log("Error in service", error);
    throw new Error(error.message || "Something went wrong");
  }
};

// fetch Provider
export const fetchProviderService = async () => {
  try {
    const result = await Provider.findAll();
    console.log("User fetched successfully");
    return result;
  } catch (error) {
    console.log("Error in Service", error);
    throw new Error(error.message);
  }
};
