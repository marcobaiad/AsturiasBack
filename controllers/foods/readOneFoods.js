const FoodsModel = require('../../models/foods.model');

exports.GetOneFood =  async function (req, res) {
    try {
        const Onefood = await FoodsModel.findById(req.params.id)
        res.send(Onefood)
        console.log(Onefood)
    } catch (err) {
        res.status(500).send(err);
    }
}
