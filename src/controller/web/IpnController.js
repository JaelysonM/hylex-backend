
const localStorage = require('../../services/localStorage');

const api = require('../../services/api');

module.exports = {
    async store(req, res) {
    const { topic, type, id, authorize } = req.query;

      if (topic == 'merchant_order') {
        localStorage.setItem(authorize,id);
        console.log('order');
      }else {

        if (type !=null && type == 'payment') {
          if (localStorage.getItem(authorize) == id) {
            console.log('SUCESSO removendo item id:' + id);
          }
       }
       console.log('else');
    }
      return res.json({
        message: 'Success'
      }).status(200);
  }  
  ,
}