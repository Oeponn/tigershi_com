import InnerWrapper from './InnerWrapper';
// import CurationWrapper from './CurationWrapper';

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
    );
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
    );
  } else {
    const parsedProducts = JSON.parse(props.products);
    const productDivs = parsedProducts.map((product, index) => {
      return (
        <div className="product-box" key={index}>
          <div className="product-name">{product.name}</div>
          <div className="product-image-container">
            <a href={product.url} rel="noreferrer" target="_blank" >
              <img className="product-image" src={product.imageURL} alt={product.name} ></img>
            </a>
          </div>
          <div className="product-price">{product.price} Yen</div>
        </div>
        // <CurationWrapper
        //   addClass=""
        //   innerContent=
        //   {
        //     <div>
        //       <div>{product.name}</div>
        //       <div>
        //         <a href={product.url} rel="noreferrer" target="_blank" >
        //           <img className="productImage" src={product.imageURL} alt={product.name} ></img>
        //         </a>
        //       </div>
        //       <div>{product.price} Yen</div>
        //     </div>
        //   } />
      );
    });

    const start = props.pageNum * props.resultsPerPage;
    const end = Math.min(props.pageNum * props.resultsPerPage + props.resultsPerPage, productDivs.length - 1);
    const pageToDisplay = productDivs.slice(start, end);

    // var arr = [1,2,3,4,5,6,7,8]
    // var renderedOutput = arr.map((item, index) => <div> {item},{index} </div>)

    return (
      <div className="curated-container">
        {pageToDisplay}
      </div>
    );
  }
}
