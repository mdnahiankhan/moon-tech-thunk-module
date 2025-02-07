import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { toggle, toggleBrands } from "../../features/cart/filter/filterSlice";

const Home = () => {
  const filter = useSelector((state) => state.filter);
const dispatch = useDispatch();
const {brands,stock}=filter;
    // useEffect(() => {
    //   fetch("http://localhost:5000/products")
    //   .then(res=>res.json())
    //   .then(data=>setProducts(data))
    // }, []);
    const {data,isLoading,isError}= useGetProductsQuery(null,{refetchOnMountOrArgChange : true})
    const activeClass = "text-white bg-indigo-500 border-white";
    const products=data
    let content;
   if (isLoading) {
    return <p className="text-center mt-4 text-xl text-green-600">Loading ...</p>
   }
    if (isError) {
      return <p className="text-center mt-4 text-3xl text-red-600">Something went wrong please try again.</p>
    }
    if (products.length) {
      content = products.map((product) => (
        <ProductCard key={product.model} product={product} />
      ));
    }
  
    if (products.length && (filter.stock || filter.brands.length)) {
      content = products
        .filter((product) => {
          if (stock) {
            return product.status === true;
          }
          return product;
        })
        .filter((product) => {
          if (filter.brands.length) {
            return filter.brands.includes(product.brand);
          }
          return product;
        })
        .map((product) => <ProductCard key={product.model} product={product} />);
    }



  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
         className={`border px-3 py-2 rounded-full font-semibold ${stock?activeClass: null 
          } `}
          onClick={()=>dispatch(toggle())}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd")?activeClass:null}`}
          onClick={()=>dispatch(toggleBrands("amd"))}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel")?activeClass:null}`}
          onClick={()=>dispatch(toggleBrands("intel"))}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
      {
        content
      }
      </div>
    </div>
  );
};

export default Home;
