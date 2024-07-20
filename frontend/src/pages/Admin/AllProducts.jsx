import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../Redux/api/product.api.js";
import AdminMenu from "./AdminMenu.jsx";
import Loader from "../../components/Loader.jsx";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row text-white">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12 text-white">
            All Product ({products.length})
          </div>

          <div className="flex flex-wrap justify-around items-center">
            {products.map((product) => (
              <div
                key={product._id}
                className="block mb-4 overflow-hidden cursor-pointer"
                onClick={() =>
                  handleNavigate(`/admin/product/update/${product._id}`)
                }
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover"
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <h5 className="text-xl font-semibold mb-2">
                        {product?.name}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {moment(product.createAt).format("MMMM Do YYYY")}
                      </p>
                    </div>
                    <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                      {product?.description?.substring(0, 160)}...
                    </p>
                    <div className="flex justify-between">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Update Product
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p>{product?.price} đ</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
