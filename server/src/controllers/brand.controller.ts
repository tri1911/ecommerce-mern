import brandServices from "@services/brand.service";
import asyncHandler from "express-async-handler";

const getAllBrands = asyncHandler(async (_req, res) => {
  const brands = await brandServices.getAllBrands();
  res.status(200).json({ brands });
});

export default { getAllBrands };
