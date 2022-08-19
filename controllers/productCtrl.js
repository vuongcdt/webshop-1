const { findOneProductBySlugDb, findAllProductsByQueryDb } = require("../database/productsDb");

const productCtrl = async (slug) => {
   const product = await findOneProductBySlugDb({ slug });

   return { product, per_page: 1, page: 1, total_products: 1, total_page: 1 };
};

const productsFilterCtrl = async (query) => {
   if (query.order === "desc") {
      query.order = -1;
   } else query.order = 1;

   // if (!["date_created", "price", "name", "average_rating", "_id", "regular_price", ""].includes(query.orderby)) throw new Error("Field not correct");

   if (query.orderby === "date" || !query.orderby) query.orderby = "date_created";
   if (!query.per_page) query.per_page = 20;
   if (query.per_page > 50) query.per_page = 50;
   if (!query.page) query.page = 1;

   const { per_page, page, list_products, total_products, filterSidebar } = await findAllProductsByQueryDb(query);
   const total_page = Math.ceil(total_products / per_page);

   return { per_page, page, list_products, total_products, total_page, filterSidebar };
};

module.exports = { productCtrl, productsFilterCtrl };
