const Expense = require('../models/expense');

exports.addExpense = (req,res,next) =>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category

    Expense.create({
        description :description,
        amount : amount,
        category : category
    })
    .then((result) =>{
        res.status(201).json({message : result})
    })
    .catch((err) =>{
        res.json({message : err})
    })
};

exports.getExpense = (req,res,next) =>{
    Expense.findAll()
    .then((result) =>{
        res.status(201).json(result)
    })
    .catch((err) =>{
        res.json({message : err})
    })

};

exports.deleteExpense = (req,res,next) =>{
    const id = req.params.id;
    Expense.destroy({
        where :{
            id : id
        }
    })
    .then((result) =>{
        res.status(201).json({message : result})
    })
    .catch((err) =>{
        res.json({message : err})
    })
}

exports.updateExpense = (req,res,next) =>{
    const title = req.body.title;
    const amount = req.body.amount;
    const id = req.params.id;
    Expense.update(
       { title :title,
        amount:amount,
       },
        {
        where :{
            id :id
        }
       }
    )
    .then((result) =>{
        res.status(201).json({message : result})
    })
    .catch((err) =>{
        res.json({message : err})
    })
}


