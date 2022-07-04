const database = require('../models');
var path = require('path');
// SDK do Mercado Pago
const mercadopago = require ('mercadopago');
// Adicione as credenciais
mercadopago.configure({
  access_token: 'TEST-955896192475306-062215-6b0160d96f5bd32973edce49c6513dde-228477385'
});

class PayController {
  static async createPay(req, res) {
    console.log(req);
    const { eventId, memberId } = req.body;
    try {
      var eventPayExistent = await database.EventsPayments.findOne({ where: {event_id: Number(eventId), member_id: Number(memberId)}});
      if (eventPayExistent)
      {
        return res.status(200).json("https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=" + eventPayExistent.guid);
      }
      var eventConfirm = await database.EventsConfirmations.findOne({ where: {event_id: Number(eventId), member_id: Number(memberId)}, include: [database.Members, database.Events]});
      if (eventConfirm)
      {
        // Cria um objeto de preferência
        let preference = {
          payer: {
            name: eventConfirm.Member.name,
            phone: {
              area_code: '48',
              number: Number(eventConfirm.Member.number.replace("5548", ""))
            },
            identification: {
              type: "MemberId",
              number: eventConfirm.Member.id + ""
            }
          },
          notification_url: "https://sharkwpbotapi.herokuapp.com/pay/update",
          items: [
            {
              title: 'Pagamento do evento ' + eventConfirm.Event.name,
              unit_price: eventConfirm.Event.price,
              quantity: 1,
            }
          ]
        };
        try
        {
          console.log("Creating payment...");
          const payId = await new Promise((res, rej) => {
            mercadopago.preferences.create(preference)
              .then(function(response){
                res(response.body);
              }).catch(function(error){
                rej(error);
              });
            mercadopago.payment.create()
          });
          console.log("Insercing payment no DB...");
          const paid = await database.EventsPayments.create({guid: payId.id, event_id: Number(eventId), member_id: Number(memberId), status: "WAITING"});
          console.log(payId)
          return res.status(200).json(payId);
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
    const { guid } = req.params;
    res.redirect("https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=" + guid);
  }
  static async payUpdate(req, res) {
    const {id} = req.query;
    const {topic} = req.body;
    try
    {
      if (topic == "payment")
      {
        const payment = await mercadopago.payment.findById(id);
        const { payer } = payment.additional_info;
        if (payment.status == 'approved')
        {
          await database.EventsPayments.update({status: 'APPROVED'}, { where: {member_id: Number(payer.identification.number)}});
          res.status(200).json("Approved");
        }
      }
      res.status(200).json(payment);
    }
    catch(err)
    {
      res.status(500).json(err);
    }
  }
}

module.exports = PayController;
