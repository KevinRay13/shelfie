import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import Product from "./components/product/Product";
import Form from "./components/form/Form";
import Dashboard from "./components/dashboard/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import routes from "./routes";

class App extends Component {
  constructor() {
    super();

    this.state = {
      imgInput: "",
      productInput: "",
      priceInput: "",
      inventoryList: [],
      input: ""
    };
    this.cancelAdd = this.cancelAdd.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    axios.get("http://localhost:3030/api/inventory").then(results => {
      this.setState({ inventoryList: results.data });
      console.log(results.data);
    });
  }
  createProduct() {
    axios
      .post("http://localhost:3030/api/product")
      //{

      //   img: {this.state.imgInput},
      //   product: "http://kuroganehammer.com/Smash4/logo2/Corrin.png",
      //   price:
      //})
      .then(results => {
        //console.log(results.data);
        this.setState({ inventoryList: results.data });
      });
  }

  handleImgInputChange(value) {
    this.setState({ imgInput: value });
  }
  handleProductInputChange(value) {
    this.setState({ productInput: value });
  }
  handlePriceInputChange(value) {
    this.setState({ priceInput: value });
  }
  cancelAdd() {
    this.setState({
      imgInput: " ",
      productInput: " ",
      priceInput: " "
    });
  }
  handleDelete(id) {
    axios.delete("http://localhost:3030/api/product/:id", id).then(results => {
      this.setState({ inventoryList: results.data });
      console.log(results.data);
    });
  }
  handleAdd() {
    this.setState({
      inventoryList: [
        ...this.state.inventoryList,
        this.state.imgInput,
        this.state.productInput,
        this.state.priceInput
      ],
      imgInput: "",
      productInput: "",
      priceInput: ""
    });
  }
  render() {
    let invlist = this.state.inventoryList.map((element, index) => {
      return (
        <div key={index}>
          <img src={element.img} alt="img here" />
          <br />
          <div> product: {element.product}</div>
          <br />
          <p> price: {element.price}</p>
          <button onClick={() => this.handleDelete()}>delete</button>
          <button>edit</button>
        </div>
      );
    });
    return (
      <div className="App">
        <Header />

        <Form />
        <Dashboard />
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/add">add</Link>

          <input
            type="text"
            value={this.state.imgInput}
            onChange={e => this.handleImgInputChange(e.target.value)}
          />
          <p>{this.state.imgInput}</p>
          <input
            type="text"
            value={this.state.productInput}
            onChange={e => this.handleProductInputChange(e.target.value)}
          />
          <p>{this.state.productInput}</p>
          <input
            type="text"
            value={this.state.priceInput}
            onChange={e => this.handlePriceInputChange(e.target.value)}
          />
          <p>{this.state.priceInput}</p>
        </div>
        <div>
          <button onClick={() => this.cancelAdd()}>cancel</button>
          <button
            //onClick={() => this.handleAdd()}
            onClick={() => this.createProduct()}
          >
            Add to Inventory
          </button>
          <div>{invlist}</div>
        </div>
      </div>
    );
  }
}

export default App;
