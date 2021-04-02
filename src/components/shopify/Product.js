import React, {Component} from 'react';
import VariantSelector from './VariantSelector';

// constants
const ONE_SIZE_FITS_MOST = "One Size Fits Most";

class Product extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let aOptionNames = [];
    // Change image to be the selected pic
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let price = variant.price
    
    let variants = this.props.product.variants
    let availability = {}
    var i = 0
    for (i = 0; i < variants.length; i++) {
      availability[variants[i].title] = variants[i].available
    // }
    }

    let variantSelectors = this.props.product.options.map((option) => {
      aOptionNames.push(option.name);
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
          availability={availability}
        />
      );
    });
    let bShowOneSizeFitsMost = (variantSelectors.length === 1 && aOptionNames[0] === "Title");

    let thisarray = [<div>Hello</div>]
    const temp = this.props.product
    for (const key in temp) {
      thisarray.push(<div>{key}</div>)
      if (key === "options") {
        thisarray.push(<div>{JSON.stringify(temp[key])}</div>)
      }
      // if (key === "variants") {
      //   // thisarray.push(<div>{temp[key]}</div>)
      //   thisarray.push(<p>____</p>)
      //   for (variant in temp[key]) {
      //     thisarray.push(<div>Variant: {variant}</div>)
      //     thisarray.push(<div>Variant item: {JSON.stringify(temp[key][variant])}</div>)
      //     thisarray.push(<p>End Variant</p>)
      //   }
      //   thisarray.push(<p>____</p>)
      // }
    }
    return (
      <div className="Product">
        {/* I will assume I always have an image */}
        {/* {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`} /> : null} */}
        {
          this.props.product.availableForSale ?
          <img src={variantImage.src} alt={`${this.props.product.title} product shot`} className="Product__image"/> :
          <img src={variantImage.src} alt={`${this.props.product.title} product shot`} className="Product__image Sold_out_image"/>
        }
        <h5 className="Product__title">{this.props.product.title}</h5>
        <p className="Product__price">${price}</p>
        <p className="Product__description">{this.props.product.description}</p>
        {bShowOneSizeFitsMost ? <h5 className="Product__title">{ONE_SIZE_FITS_MOST}</h5> : variantSelectors}
        <label className="Product__option">
          Quantity: <input className="form-control" min="1" max="2" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label>
        {
          this.props.product.availableForSale ?
          <button className="Product__buy" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
          : null
        }
        {/* <div>Variants: {JSON.stringify(variants)}</div> */}
        {/* {thisarray} */}
      </div>
    );
  }
}

export default Product;
