import React, {useState} from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Product from "./components/Product";
import data from "./data.json"
function App() {
  const [products,setProducts] = useState(data.products)
  const [size,setSize] = useState("")
  const [sort,setSort] = useState("")
  const [cartItems,setCartItems] = useState(
    localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [])
  // console.log( localStorage.getItem("cartItems"))
  // console.log( JSON.parse(localStorage.getItem("cartItems")))
  const  filterProducts = (event) =>{
    if (event.target.value === "") {
      setSize(event.target.value)
      setProducts(data.products)
    } else {
      setSize(event.target.value)
      setProducts( data.products.filter(
          (product) => 
          product.availableSizes.indexOf(event.target.value) >= 0
        ),
      )
    }
  } 
  const sortProducts = (event) =>{
    const sort = event.target.value;
    setSort(sort)
    // console.log(sort)
    setProducts(products.slice().sort(
      (a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    )
  }
  const addToCart = (product) => {
    const Cart = cartItems.slice();
    let alreadyInCart = false;
    Cart.forEach((item) => {
      // console.log(alreadyInCart)
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      Cart.push({ ...product, count: 1 });
    }
    setCartItems(Cart)
    localStorage.setItem("cartItems", JSON.stringify(Cart));
  }
  const removeFromCart = (product) => {
    const Cart = cartItems.slice();
    // console.log(Cart.filter((x) => x._id !== product._id))
    setCartItems(Cart.filter((x) => x._id !== product._id))
    localStorage.setItem(
      "cartItems",
      JSON.stringify(Cart.filter((x) => x._id !== product._id))
    );
  }

  return (
    <div className="grid-container">
      <header className="">
          <a href = "/">React Shopping Cart</a>
      </header>
      <main>
          <div className="content">
              <div className="main">
                 <Filter 
                        count={products.length}
                        size={size}
                        sort={sort}
                        filterProducts={filterProducts}
                        sortProducts={sortProducts}>
                  </Filter>
                 <Product products={products}
                          addToCart={addToCart}
                 />
              </div>
              <div className="sidebar">
                  <Cart cartItems={cartItems}
                        removeFromCart={removeFromCart}/>
              </div>
          </div>
      </main>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
}

export default App;
