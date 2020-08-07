const express = require('express');
const { check } = require('express-validator')
const authorize = require('../middlewares/authorize')
const router = express.Router();
const formData = require('express-form-data');

const ControllerCreateFoods = require('../controllers/foods/createFoods')
const ControllerReadFoodsTrue = require('../controllers/foods/readSeveralTrueFoods')
const ControllerReadFoodsAll = require('../controllers/foods/readSeveralAllFoods')
const ControllerReadFoods = require('../controllers/foods/readOneFoods')
const ControllerUpdateFoods = require('../controllers/foods/updateFoods')
const ControllerDeleteFoods = require('../controllers/foods/deleteFoods')
const ControllerFoodsND = require('../controllers/foods/notAvailableFoods')
const ControllerFoodsDis = require('../controllers/foods/availableFoods')
const ControllerFoodsImages = require('../controllers/foods/uploadImagesFoods')

router.post('/',authorize('admin'), [  
    
    check('title', 'Campo Titulo esta Vacio').notEmpty(),
    check('summary', 'Campo Resumen esta en Vacio').notEmpty(),
    check('description', 'Campo Descripcion esta en Vacio').notEmpty(),
    check('price', 'Campo Precio Vacio').notEmpty(),
    check('category', 'Campo Categoria Vacio').notEmpty()
     
],
ControllerCreateFoods.CreateFoods)



router.get('/todas',authorize('admin'), ControllerReadFoodsAll.GetFoods)
router.get('/:id', ControllerReadFoods.GetOneFood)
router.get('/', ControllerReadFoodsTrue.GetFoodsTrue)

router.put('/:id/dis',authorize('admin'), ControllerFoodsDis.FoodsDis)
router.put('/:id/nd',authorize('admin'), ControllerFoodsND.FoodsND)
router.put('/:id',authorize('admin'), ControllerUpdateFoods.ModifyFoods)

router.delete('/:id',authorize('admin'), ControllerDeleteFoods.RemoveFoods)
router.use(formData.parse());
router.post('/:resourceId/upload',authorize('admin'), ControllerFoodsImages.uploadImages);
module.exports = router; 
