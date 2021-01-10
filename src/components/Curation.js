import React, { Component } from "react";
import InnerWrapper from './InnerWrapper';
import CuratedProducts from './CuratedProducts';
import Pagination from './Pagination'

const RESULTS_PER_PAGE = 12

export default class Curation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "[]",
      loading: true,
      pageNum: 0,
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

  // using settimeout because of https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing
  scrollToTop = () => {
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        //behavior: "smooth"
      });
    }, 1);
  }

  changePageNum = (num) => {
    console.log('In change page num, num=' + num)
    if (num < 0) {
      num = 0
    }
    else if (this.state.products.length > 0 && num * RESULTS_PER_PAGE > this.state.products.length) {
      num -= 1
    }
    this.scrollToTop()
    this.setState({
      pageNum: num,
    })
  }


  render() {
    return (
      <div className="container-main">

        <div>
          <CuratedProducts
            loading={this.state.loading}
            products={this.state.products}
            resultsPerPage={RESULTS_PER_PAGE}
            pageNum={this.state.pageNum}
          />
        </div>

        <Pagination
          changePageNum={this.changePageNum}
          pageNum={this.state.pageNum}
        />

        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div>____</div>
              <div className="home-title">curation page</div>
              <div className="home-inspo">this is a page of items i could be interested in</div>
              <div className="home-inspo">it is mostly japanese fashion and anime franchise related items</div>
              <div className="home-inspo">evangelion, serial experiments lain, akira, cav empt, 20471120</div>
            </div>
          } />

      </div>
    )
  }
}