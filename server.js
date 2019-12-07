const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

router.render = (req, res) => {
  if (req.method !== "GET") return res.jsonp(res.locals.data);
  let queryString = req.originalUrl.split("?")[1];
  let queryArray = queryString && queryString.split("&");
  if (queryArray) {
    let queryField = queryArray.find(
      e => e.split("=")[0] === "fields"
    );
    if (queryField) var fieldArray = queryField.split("=")[1].split(",");
    if (fieldArray) return res.jsonp(res.locals.data.map(e => {
      let obj = {};
      fieldArray.forEach(element => {
        obj[element] = e[element]
      });
      return obj;
    }))
  }
  
  
  res.jsonp(res.locals.data);
}
server.listen(port, () => {
  console.log('Server is running on port ' + port);
});
