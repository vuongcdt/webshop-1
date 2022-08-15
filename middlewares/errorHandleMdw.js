const errorHandleMdw = (err, req, res, next) => {
   if (err) {
      const{url,body,headers}=req
      const message= {url,body,headers,stack:err.stack}
      res.status(err.status||400).send(message);
   } else {
      next();
   }
};

module.exports = { errorHandleMdw };
