export default class Connection {
  ws: WebSocket

  constructor(ws: WebSocket) {
    this.ws = ws
  }
}
