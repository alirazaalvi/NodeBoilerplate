export default class MainController {
  constructor(request, reply) {
    this.request = request;
    this.reply = reply;
  }
  returnView() {
    this.reply.view('index');
  }

}
