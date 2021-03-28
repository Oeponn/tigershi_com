import React, { Component } from "react";
import InnerWrapper from './InnerWrapper';
import CuratedProducts from './CuratedProducts';
import { withRouter } from "react-router-dom";
import Pagination from './Pagination'

const RESULTS_PER_PAGE = 12

class Curation extends Component {
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
    this.fetchResults()
    // Load the page number from the url
    const path = window.location.pathname.toString().split('/')
    if (path.length === 3 && !isNaN(path[2]) && +path[2] !== this.state.pageNum) {
      this.setState({
        pageNum: +path[2]
      })
    }
  }

  componentDidUpdate() {
    // Load the page number from the url
    const path = window.location.pathname.toString().split('/')
    if (path.length === 3 && !isNaN(path[2]) && +path[2] !== this.state.pageNum) {
      this.setState({
        pageNum: +path[2]
      })
    }
  }

  fetchResults = () => {
    // console.log("FETCHING RESULTS AGAIN")
    fetch("/api/mercari/")
      .then((resp) => {
        console.log("Response:", resp)

        return resp.json()
      }).then(mercari => {
        // console.log("PRODUCTS:", this.state.products)
        // var concatData = JSON.parse(this.state.products).concat(mercari['results'])
        var concatData = [].concat(mercari['results'])
        this.setState({
          products: JSON.stringify(concatData),
        }, () => {
          this.setState({
            loading: false,
          });
          console.log("Finished fetching, now push to history to refresh")
          this.props.history.push(`/curation/0`)
        });
      })
  }

  refreshResults = (e) => {
    e.preventDefault()
    console.log("Fetching New Results")
    this.setState({
      loading: true,
    })
    fetch("/api/mercari_refresh/")
      .then(() => {
        this.fetchResults()
      })
  }

  // using settimeout because of https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing
  // scrollToTop = () => {
  //   setTimeout(function () {
  //     window.scrollTo({
  //       top: 0,
  //       //behavior: "smooth"
  //     });
  //   }, 1);
  // }

  changePageNum = (num) => {
    var numberOfResults = JSON.parse(this.state.products).length

    if (num < 0) {
      num = 0
    }
    else if (numberOfResults > 0 && (num * RESULTS_PER_PAGE) > numberOfResults) {
      num -= 1
    }
    else {
      this.props.history.push(`/curation/${num}`)
    }

    this.setState({
      pageNum: num,
    })
  }


  render() {
    return (
      <div className="container-main">
        {
        this.state.loading ?
          <p>Loading</p>
          :
          <div>
            <CuratedProducts
              loading={this.state.loading}
              products={this.state.products}
              resultsPerPage={RESULTS_PER_PAGE}
              pageNum={this.state.pageNum}
            />
            <Pagination
              changePageNum={this.changePageNum}
              pageNum={this.state.pageNum}
            />
          </div>
        }
        


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
              <div>
                {this.props.loggedIn && <button onClick={(e) => this.refreshResults(e)}>refresh</button>}
              </div>
            </div>
          } />

      </div>
    )
  }
}

export default withRouter(Curation);