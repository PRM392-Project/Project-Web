import instance from "./customize-axios";

// =============Auth============
const loginDesignerAPI = async (email, password) => {
  try {
    const response = await instance.post("/api/auth/designer/login", {
      email,
      password,
    });
    console.log("Login success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const resetPasswordAPI = async (token, newPassword) => {
  try {
    const response = await instance.post("/api/auth/reset-password", null, {
      params: {
        token,
        newPassword,
      },
    });
    console.log("Reset password success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Reset password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const forgetPasswordAPI = async (email, role) => {
  try {
    const response = await instance.post("/api/auth/forget-password", null, {
      params: {
        email,
        role,
      },
    });
    console.log("Forgot password request success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Forgot password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const registerDesignerAPI = async (name, email, password, applicationUrl) => {
  try {
    const response = await instance.post("/api/auth/designer/register", {
      name,
      email,
      password,
      applicationUrl: applicationUrl,
    });
    console.log("Register success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

const applicationResultAPI = async (email, isApproved) => {
  try {
    const response = await instance.post(
      `/api/auth/application-result`,
      {}, // Request body rỗng
      {
        params: {
          email: email,
          isApproved: isApproved,
        },
      }
    );
    console.log("Application result submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Application result error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updatePasswordAPI = async (password, newPassword) => {
  try {
    const response = await instance.post("/api/auth/update-password", null, {
      params: {
        password,
        newPassword,
      },
    });
    console.log("Password update success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Password update error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// =============Furniture============
const getAllFurnituresAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/furnitures", {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log("Get furnitures success:", response);
    return response;
  } catch (error) {
    console.error("Get furnitures error:", error);
    throw error;
  }
};

const getAllFursByDesAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/designer/furnitures", {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log("Get furnitures success:", response);
    return response;
  } catch (error) {
    console.error("Get furnitures error:", error);
    throw error;
  }
};

const createFurnitureAPI = async (formData) => {
  try {
    const response = await instance.post("/api/furnitures", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Create furniture success:", response);
    return response;
  } catch (error) {
    console.error(
      "Error creating furniture:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// =============Design============
const getAllDesignsAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/designs", {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log("Get designs success:", response);
    return response;
  } catch (error) {
    console.error("Get designs error:", error);
    throw error;
  }
};

const getAllDesignsByDesAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/designer/designs", {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log("Get designs success:", response);
    return response;
  } catch (error) {
    console.error("Get designs error:", error);
    throw error;
  }
};

// =============Order============

const getAllOrdersByDesAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/designer/orders", {
      params: { pageNumber, pageSize },
    });
    console.log("Get all orders by designer success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting orders by designer:", error);
    throw error;
  }
};

const getOrdersById = async (orderId) => {
  try {
    const response = await instance.get(`/api/orders/${orderId}`);
    console.log("Get order by ID success:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error getting order with ID ${orderId}:`, error);
    throw error;
  }
};

const getAllOrdersAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/orders", {
      params: { pageNumber, pageSize },
    });
    console.log("Get all orders by designer success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting orders by designer:", error);
    throw error;
  }
};

// =============User============

const getAllAccountsAPI = async (
  role = null,
  pageNumber = -1,
  pageSize = -1
) => {
  try {
    const params = {};

    if (role !== null) {
      params.role = role;
    }

    if (pageNumber !== -1) {
      params.pageNumber = pageNumber;
    }

    if (pageSize !== -1) {
      params.pageSize = pageSize;
    }

    const response = await instance.get("/api/accounts", { params });
    console.log("Get all accounts success:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting accounts:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getAwaitingDesignersAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const params = {};

    if (pageNumber !== -1) {
      params.pageNumber = pageNumber;
    }

    if (pageSize !== -1) {
      params.pageSize = pageSize;
    }

    const response = await instance.get("/api/accounts/awaiting-designers", {
      params,
    });
    console.log("Get awaiting designers success:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting awaiting designers:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// =============Category============

const getAllCategoriesAPI = async (
  style = null,
  pageNumber = -1,
  pageSize = -1
) => {
  try {
    const params = {};

    if (style !== null) {
      // Giữ style là kiểu boolean ngay từ đầu (true hoặc false)
      params.style = style;
    }

    if (pageNumber !== -1) {
      params.pageNumber = pageNumber;
    }

    if (pageSize !== -1) {
      params.pageSize = pageSize;
    }

    const response = await instance.get("/api/categories", { params });
    console.log("Get all categories success:", response);
    return response.data.items;
  } catch (error) {
    console.error(
      "Error getting categories:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// =============Product============

const getNewProductsAPI = async (pageNumber = -1, pageSize = -1) => {
  try {
    const response = await instance.get("/api/products/new", {
      params: {
        pageNumber,
        pageSize,
      },
    });
    console.log("Get new products success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting new products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createNewProductAPI = async (id) => {
  try {
    const response = await instance.post("/api/products/new", null, {
      params: { id },
    });
    console.log("Create new product success:", response);
    return response;
  } catch (error) {
    console.error(
      "Error creating new product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export {
  loginDesignerAPI,
  getAllFurnituresAPI,
  getAllDesignsAPI,
  getAllDesignsByDesAPI,
  getAllFursByDesAPI,
  getAllOrdersByDesAPI,
  getOrdersById,
  getAllOrdersAPI,
  registerDesignerAPI,
  applicationResultAPI,
  updatePasswordAPI,
  forgetPasswordAPI,
  resetPasswordAPI,
  getAllAccountsAPI,
  getAwaitingDesignersAPI,
  createFurnitureAPI,
  getAllCategoriesAPI,
  getNewProductsAPI,
  createNewProductAPI,
};
