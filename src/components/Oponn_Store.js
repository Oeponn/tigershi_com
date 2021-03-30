import React from "react";
import Products from './shopify/Products';
import { connect } from 'react-redux'
import store from '../store';


// const CounterComponent = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       Click the button below to see the number go up: {count}
//       <br />
//       <br />
//       <button onClick={() => setCount(count => {
//         // console.log("Hullo", count)
//         return (count + 1)
//       })}>I have too much time on my hands</button>
//       <br />
//       <p>If you log in it will store the counts :^) unfortunately the create account page isn't read yet</p>
//     </div>
//   );
// }

class Store extends React.Component {
  constructor() {
    super();
    this.addVariantToCart = this.addVariantToCart.bind(this);
  }
  addVariantToCart(variantId, quantity) {
    const state = store.getState(); // state from redux store
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({ type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res } });
    });
  }
  render() {
    const state = store.getState(); // state from redux store
    let oProducts = <Products
      products={state.products}
      client={state.client}
      addVariantToCart={this.addVariantToCart}
    />;
    return (
      <div>
        {/* <div className="container-main">
          <div>
            <p>Store will open at next drop</p>
            <div> <CounterComponent /> </div>
          </div>
        </div> */}
        {oProducts}
      </div>
    )
  }
}

export default connect((state) => state)(Store);