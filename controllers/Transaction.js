const Transaction = require("../models/Transaction");

exports.getAllTransactions = async (req, res, next) => {
  const transactions = await Transaction.find();

  if (transactions.length === 0) {
    res.json({
      success: true,
      item:transactions,
      message: `No data found`,
    });
  } else {
    res.json({
      success: true,
      count: transactions.length,
      item: transactions,
    });
  }
};

exports.getTransaction = async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.json({
      success: true,
      messages: `No data found`,
    });
  } else {
    res.json({
      success: true,
      data: transaction,
    });
  }
};

exports.createTransaction = async (req, res, next) => {
 
      const transaction = await Transaction.create(req.body);

      if (!transaction) {
        res.json({
          success: true,
          messages:`Kindly check the entries`
        });
      } else {
        res.json({
          success: true,
          data: transaction,
        });
      }
    }


exports.updateTransaction =  async(req, res, next) => {

      const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      //Only Trans Status and Trans Resolve would be updated
      if (transaction.length === 0) {
        res.json({
          success: true,
          messages: `No data found`,
        });
      } else {
        res.json({
          success: true,
          data: transaction,
        });
      }
    }





