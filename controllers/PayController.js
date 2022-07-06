const database = require('../models');
const axios = require('axios');
const friendlyUrl = require('friendly-url')
// SDK do Mercado Pago
const mercadopago = require ('mercadopago');
// Adicione as credenciais
mercadopago.configure({
  access_token: 'APP_USR-955896192475306-062215-be3dd45f006923e8f148aba62ebe519b-228477385'
  //access_token: 'TEST-955896192475306-062215-6b0160d96f5bd32973edce49c6513dde-228477385'
});

class PayController {
  static async createPay(req, res) {
    const { eventId, memberId } = req.body;
    try {
      var eventPayExistent = await database.EventsPayments.findOne({ where: {event_id: Number(eventId), member_id: Number(memberId)}});
      if (eventPayExistent)
      {
        return res.status(200).json("http://www.sharkrunners.com.br/pay/" + eventPayExistent.url);
      }
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(eventId), member_id: Number(memberId)}, include: [database.Members, database.Events]});
      if (eventConfirm)
      {
        // Cria um objeto de preferência
        let preference = {
          payer: {
            name: eventConfirm.Member.name
          },
          notification_url: "https://sharkwpbotapi.herokuapp.com/pay/update",
          items: [
            {
              id: eventConfirm.Event.id + "",
              title: 'Pagamento do evento ' + eventConfirm.Event.name,
              unit_price: eventConfirm.Event.price,
              quantity: 1,
            }
          ]
        };
        try
        {
          const url = friendlyUrl(`evento ${eventConfirm.Event.name} ${eventConfirm.Member.name}`);
          const pref = await new Promise((res, rej) => {
            mercadopago.preferences.create(preference)
              .then(function(response){
                res(response.body);
              }).catch(function(error){
                rej(error);
              });
          });
          const paid = await database.EventsPayments.create(
            {
              pref_id: pref.id, 
              url: url,
              event_id: Number(eventId), 
              member_id: Number(memberId), 
              status: "WAITING"
            });
          return res.status(200).json("http://www.sharkrunners.com.br/pay/" + url);
        }
        catch(error)
        {
          throw error;
        }
      }
      else
      {
        return res.status(409).json("Membro ainda não confirmou presença");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async payPage(req, res) {
    const { url } = req.params;
    const paid = await database.EventsPayments.findOne({ where: {url:url}});
    res.redirect("https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=" + paid.pref_id);
  }
  static async payUpdate(req, res) {
    try
    {
      if (req.query["type"] == "payment" || req.query["topic"] == "payment")
      {
        const payment = await mercadopago.payment.findById(req.query["data.id"]||req.query["id"]);
        const order = await mercadopago.merchant_orders.findById(payment.body.order.id);
        if (payment.body.status == 'approved')
        {
          const paid = await database.EventsPayments.findOne({ where: {pref_id: order.body.preference_id}});
          if (paid.status == 'APPROVED')
          {
            return res.status(200).json({});
          }

          const pay = (await database.EventsPayments.update(
            {
              status: 'APPROVED',
              order_id: order.body.id,
              pay_id: payment.body.id
            }, 
            { 
              where: {
                pref_id: order.body.preference_id
              }, 
              returning: true,
              plain: true
            }))[1].dataValues;
          
          await database.EventsConfirmations.update({paid: true}, { where: {member_id:pay.member_id, event_id: pay.event_id}})
          //Send to BOT payment receive
          await axios.post("https://sharkwpbot.herokuapp.com/payReceive", {memberId: pay.member_id, eventId: pay.event_id});
          return res.status(200).json(payment.body);
        }
      }
      if (req.query["type"] == "merchant_order" || req.query["topic"] == "merchant_order")
      {
        const merchant = await mercadopago.merchant_orders.findById(req.query["data.id"]||req.query["id"])
        return res.status(200).json(merchant.body);
      }
      return res.status(500).json(req.query);
    }
    catch(err)
    {
      return res.status(500).json(err);
    }
  }
  static async checkPay(req, res) {
    const { eventId, memberId } = req.query;
    try {
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(eventId), member_id: Number(memberId)}});
      if (eventConfirm)
      {
        res.status(200).json(eventConfirm.paid);
        return;
      }
      res.status(500).json("Não confirmado no evento");
    }
    catch(err)
    {
      res.status(500).json(err);
    }
  }
}

module.exports = PayController;
