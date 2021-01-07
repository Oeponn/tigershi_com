import React, { Component } from "react";
import InnerWrapper from './InnerWrapper';
import CuratedProducts from './CuratedProducts';

export default class Curation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "[]",
      loading: true,
    };
  }

  componentDidMount() {
    console.log("Curation Mounted")

    fetch("/api/mercari/")
      .then((resp) => {
        console.log("Response:", resp)

        return resp.json()
      }).then(mercari => {
        // console.log(mercari)
        for (var key in mercari) {
          var concatData = JSON.parse(this.state.products).concat(mercari[key])



          this.setState({
            loading: true,
            products: JSON.stringify(concatData),
          });
          this.setState({
            loading: false,
            products: this.state.products,
          });
          // console.log("STATE PRODUCTS:", this.state.products)
        }
      })
  }




  render() {
    return (
      <div className="container-main">
        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div>____</div>
              <div>curation page</div>
              <div>why not create instead</div>
              <div>what are you curating</div>
              <div>in what way is your vision unique</div>
            </div>
          } />
        
        <CuratedProducts 
          loading={this.state.loading}
          products={this.state.products}
        />

        {/* <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              {this.state.products}
            </div>
          } /> */}

      </div>
    )
  }
}