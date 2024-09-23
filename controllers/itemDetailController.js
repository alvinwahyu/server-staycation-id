const Category = require('../models/Category');
const Item = require('../models/Item');
const Feature = require('../models/Feature');
const Activity = require('../models/Activity');
const Image = require('../models/Image');
const path = require("path");
const fs = require("fs-extra");

module.exports = {
    viewDetailItem: async (req, res) => {
        const { itemId } = req.params;
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            const feature = await Feature.find({ itemId: itemId });
            const activity = await Activity.find({ itemId: itemId });
            res.render('admin/item/detail_item/view_detail_item', {
                title: 'Staycation | Detail Item',
                alert,
                itemId,
                feature,
                activity,
                user: req.session.user,
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    addFeature: async (req, res) => {
        const { name, qty, itemId } = req.body;
        try {
            if(!req.file){
                req.flash('alertMessage', 'Image Not Found');
                req.flash('alertStatus', 'danger');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            const feature = await Feature.create({ 
                name,
                qty,
                itemId,
                imageUrl: `images/${req.file.filename}`
            });

            const item = await Item.findOne({_id: itemId});
            item.featureId.push({_id: feature._id});
            await item.save();

            req.flash('alertMessage', 'Success Add Feature');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    editFeature: async (req, res) => {
        const { id, name, qty, itemId } = req.body;
        try {
            const feature = await Feature.findOne({ _id: id });
            if(req.file == undefined){
                feature.name = name;
                feature.qty = qty;
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            } else {
                await fs.unlink(path.join(`public/${feature.imageUrl}`));
                feature.name = name;
                feature.qty = qty;
                feature.imageUrl = `images/${req.file.filename}`
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }   
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    deleteFeature: async (req, res) => {
        const { id, itemId } = req.params;
        try {
            const feature = await Feature.findOne({ _id: id });
            const item = await Item.findOne({ _id: itemId }).populate('featureId');
            for (let i = 0; i < item.featureId.length; i++) {
                if(item.featureId[i]._id.toString() === feature._id.toString()){
                    item.featureId.pull({ _id: feature._id })
                    await item.save()
                }
                
            }
            await fs.unlink(path.join(`public/${feature.imageUrl}`));
            await feature.remove();
            req.flash('alertMessage', 'Success Delete Feature');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },


    addActivity: async (req, res) => {
        const { name, type, itemId } = req.body;
        try {
            if(!req.file){
                req.flash('alertMessage', 'Image Not Found');
                req.flash('alertStatus', 'danger');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            const activity = await Activity.create({ 
                name,
                type,
                itemId,
                imageUrl: `images/${req.file.filename}`
            });

            const item = await Item.findOne({_id: itemId});
            item.activityId.push({_id: activity._id});
            await item.save();

            req.flash('alertMessage', 'Success Add Activity');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    editActivity: async (req, res) => {
        const { id, name, type, itemId } = req.body;
        try {
            const activity = await Activity.findOne({ _id: id });
            if(req.file == undefined){
                activity.name = name;
                activity.type = type;
                await activity.save();
                req.flash('alertMessage', 'Success Update Activity');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            } else {
                await fs.unlink(path.join(`public/${activity.imageUrl}`));
                activity.name = name;
                activity.type = type;
                activity.imageUrl = `images/${req.file.filename}`
                await activity.save();
                req.flash('alertMessage', 'Success Update Activity');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }   
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    deleteActivity: async (req, res) => {
        const { id, itemId } = req.params;
        try {
            const activity = await Activity.findOne({ _id: id });
            const item = await Item.findOne({ _id: itemId }).populate('activityId');
            for (let i = 0; i < item.activityId.length; i++) {
                if(item.activityId[i]._id.toString() === activity._id.toString()){
                    item.activityId.pull({ _id: activity._id })
                    await item.save()
                }
                
            }
            await fs.unlink(path.join(`public/${activity.imageUrl}`));
            await activity.remove();
            req.flash('alertMessage', 'Success Delete Activity');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
}