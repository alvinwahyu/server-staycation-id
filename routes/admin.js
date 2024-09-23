const router = require('express').Router();
const signinController = require('../controllers/signincontroller');
const adminController = require('../controllers/adminController');
const categoryController = require('../controllers/categoryController');
const bankController = require('../controllers/bankController');
const itemController = require('../controllers/itemController');
const itemDetailController = require('../controllers/itemDetailController');
const bookingController = require('../controllers/bookingController');
const { upload, uploadMultiple } = require('../middlewares/multer');

const auth = require('../middlewares/auth');

router.get('/signin', signinController.viewSignin);
router.post('/signin', signinController.actionSignin);
router.get('/signout', signinController.actionSignout);
router.use(auth);

router.get('/dashboard', adminController.viewDashboard);

router.get('/category', categoryController.viewCategory);
router.post('/category', categoryController.addCategory);
router.put('/category', categoryController.editCategory);
router.delete('/category/:id', categoryController.deleteCategory);

router.get('/bank', bankController.viewBank);
router.post('/bank', upload, bankController.addBank);
router.put('/bank', upload, bankController.editBank);
router.delete('/bank/:id', bankController.deleteBank);

router.get('/item', itemController.viewItem);
router.post('/item', uploadMultiple, itemController.addItem);
router.get('/item/show-image/:id', itemController.showImageItem);
router.get('/item/:id', itemController.showEditItem);
router.put('/item/:id', uploadMultiple, itemController.editItem);
router.delete('/item/:id/delete', itemController.deleteItem);

router.get('/item/show-detail-item/:itemId', itemDetailController.viewDetailItem);
router.post('/item/add/feature', upload, itemDetailController.addFeature);
router.put('/item/update/feature', upload, itemDetailController.editFeature);
router.delete('/item/:itemId/feature/:id', itemDetailController.deleteFeature);

router.post('/item/add/activity', upload, itemDetailController.addActivity);
router.put('/item/update/activity', upload, itemDetailController.editActivity);
router.delete('/item/:itemId/activity/:id', itemDetailController.deleteActivity);

router.get('/booking', bookingController.viewBooking);
router.get('/booking/:id', bookingController.showDetailBooking);
router.put('/booking/:id/confirmation', bookingController.actionConfirmation);
router.put('/booking/:id/reject', bookingController.actionReject);

module.exports = router;