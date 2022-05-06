import React, { Component } from "react";
import UAHToken from "./contracts/UAHToken.json";
import UAHTokenSale from "./contracts/UAHTokenSale.json";
import KYC from "./contracts/KYC.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, KYCAddress: "0x123..." };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.UAHTokenInstance = new this.web3.eth.Contract(
       UAHToken.abi,
       UAHToken.networks[this.networkId] && UAHToken.networks[this.networkId].address,
      );

      this.UAHTokenSaleInstance = new this.web3.eth.Contract(
        UAHTokenSale.abi,
        UAHTokenSale.networks[this.networkId] && UAHTokenSale.networks[this.networkId].address,
      );

      this.KYCInstance = new this.web3.eth.Contract(
        KYC.abi,
        KYC.networks[this.networkId] && KYC.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKYCWhitelisting = async () => {
    await this.KYCInstance.methods.setKYCCompleted(this.state.KYCAddress).send({from: this.accounts[0]});
    alert("KYC for" + this.state.KYCAddress+ " is completed!");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>UAH Token Sale</h1>
        <p>Создатель UAH токенов: tu4k0</p>
        <p>Вы можете купить UAH tokens здесь!</p>
        <h2>KYC авторизация</h2>
       Введите аккаунт, который хотите внести в вайтлист: <input type="text" name="KYCAddress" value={this.state.KYCAddress} onChange={this.handleInputChange} />
       <div className="App">
        <button type="button" onClick={this.handleKYCWhitelisting}>Добавить аккаунт в вайтлист</button>
        </div>
      </div>
    );
  }
}

export default App;
