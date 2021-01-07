import React from "react";
import InnerWrapper from './InnerWrapper';

export default function CuratedProducts(props) {
  if (props.loading) {
    return (
      <InnerWrapper
        addClass=""
        innerContent={
          <div>
            <div>Loading...</div>
            <div>Thank you for waiting</div>
          </div>}
      />
    )
  }
  if (!props.products) {
    return (
      <InnerWrapper
        addClass=""
        innerContent={
          <div>
            <div>no good products right now</div>
            <div>maybe add more keywords</div>
          </div>}
      />
    )
  }
  else {
    const parsedProducts = JSON.parse(props.products)
    console.log(parsedProducts.length)
    var productDivs = parsedProducts.map((product, index) => {
      return (
        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div>____</div>
              <div>{product.name}</div>
              <div>
                <a href={product.url} rel="noreferrer" target="_blank" >
                  <img className="productImage" src={product.imageURL} alt={product.name} ></img>
                </a>
              </div>
              <div>{product.price} Yen</div>
            </div>
          } />
      )
    });

    var firstProducts = productDivs.slice(0,10)

    // var arr = [1,2,3,4,5,6,7,8]
    // var renderedOutput = arr.map((item, index) => <div> {item},{index} </div>)

    return (
      <div>
        {firstProducts}
      </div>
    );

  }
}