import productModel from "../model/productSchema.js";

//---------------------------GETTING_PRODUCTS-------------------------------------------------------------------------------------
export const getProducts = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

    //getting total products count for pagination purpose in frontend
    const totalProductCount = await productModel.count();

    //calculating total pages
    const totalPages = Math.ceil(totalProductCount / itemsPerPage);

    // ensuring currentPage is within valid range
    if (currentPage < 1 || currentPage > totalPages) {
      return res.status(400).json({ message: "Invalid page number" });
    }

    //fetching products for current page
    const products = await productModel
      .find()
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({ totalProductCount, totalPages, currentPage, products });
  } catch (err) {
    res
      .status(500)
      .json({ message: "server failed please try after sometimes" });
  }
};
