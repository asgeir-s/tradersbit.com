

/** @ngInject */
export class BitfinexSocket {

  public dataStream: any;
  public lastRate: number;

  constructor($websocket: any) {
    this.dataStream = $websocket('wss://api2.bitfinex.com:3000/ws');

    this.dataStream.onMessage((message: any) => {
      let tick: Array<number> = JSON.parse(message.data)
      if (tick.length > 8) {
        this.lastRate = tick[7];
      }
    });

    this.dataStream.send(JSON.stringify({
      "event": "subscribe",
      "channel": "ticker",
      "pair": "BTCUSD"
    }));
  }

}