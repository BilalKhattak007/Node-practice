const express = require('express')
const Contact = require('../model/contact')


//getting all contacts:
exports.getAllContact = async (req, res) => {
    try{
        const contacts = await Contact.find({user_id:req.user.id})
        const len = contacts.length
        res.status(200).json({
            status:"success",
            len,
            data:{
                contacts
            }
        })
        }catch(err){
            console.log(err,"peroblem beroo")
        }
};

//getting single contact by id:
exports.getContact = async (req, res) => {
    try{
    const singleContact = await Contact.findById(req.params.id)
    if(!singleContact){
        throw new Error("Contact doesnot exsists!")
    }
    res.status(200).json({
        status:"success",
        data:{
            singleContact
        }
    })
    }catch(err){
        console.log(err,"peroblem beroo")
    }
};
//creating a contact:
exports.createContact = async (req, res) => {
    try{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        throw new Error("Mandatory fields are absent")
    }
    const newContact = await Contact.create({
        name,email,phone,user_id:req.user.id
    })
    res.status(200).json({
        status:"success",
        data:{
            name,email
        }
    })
}catch(err){
    console.log(err,"peroblem beroo")
}
}
//deleting a contact with id:
exports.deleteContact = async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.id);
        if(contact.user_id.toString() !== req.user.id){
            res.status(403)
            throw new Error("You cannot delete this contact")
        }
        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"success",
            message:"contact deleted"
        })
        }catch(err){
            console.log(err,"peroblem beroo")
        }
};
//updating contact with id:
exports.updateContact = async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.id);
        if(contact.user_id.toString() !== req.user.id){
            res.status(403)
            throw new Error("You cannot update this contact")
        }
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            status:"success",
            message:"Contact updated",
            data:{
                updatedContact
            }
        })
        }catch(err){
            console.log(err,"peroblem beroo")
        }
};