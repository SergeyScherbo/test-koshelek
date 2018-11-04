import React, { Component } from 'react';
import Table from './components/table';
import Greet from './components/greet';
import fetch from 'cross-fetch';

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    fetch('https://api.coincap.io/v2/assets')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState(currentState => {
          return {
            data: data.data.splice(0, 15)
          };
        });

        const currencies = this.state.data.map(item => item.id).join(',');

        this.updatePrices(currencies);
        // this.updateTrades();
      })
      .catch(err => {
        console.log(err);
      })
  }

  updatePrices(list) {
    const priceWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${list}`);

    priceWs.onmessage = (message) => {
      const price = JSON.parse(message.data);

      this.setState(currentState => {
        return {
          data: currentState.data.map(item => {
            for (let key in price) {
              if (key === item.id) {
                item.priceUsd = price[key];
              }
            }

            return item;
          })
        };
      });
    };
  }

  updateTrades() {
    const tradeWs = new WebSocket(`wss://ws.coincap.io/trades/binance`);

    tradeWs.onmessage = (message) => {
      const trade = JSON.parse(message.data);
      console.log(trade);
    }
  }

  render() {
    return (
      <div className="container">
        <Greet />
        <Table data={this.state.data} />
      </div>
    );
  }
}

export default App;
