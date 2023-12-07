import mongoose from "mongoose";
import { Product, OrderItem, Order } from "../models/product.js";
import { DateTimeScalar } from 'graphql-date-scalars';
import { ApolloError } from "apollo-server";

export const ProductResolvers = {
    DateTime: DateTimeScalar,

    Query: {
        async getProducts(_, args){
            
            return await Product.find()
            
            
        },
        async getOrders(_, args, context){
            const {user_id} = context
            
            if(!user_id) throw new ApolloError("User not logged in, please login")
            return await Order.find({userId: user_id})
        }
        
    },
    Mutation: {
        async createProduct(_, {input}){
            const {name, price} = input
            const newProduct = new Product({
                name: name,
                price: price
            })
            const res = await newProduct.save()
            
            return{
                _id: res.id,
                ...res._doc
            }
        },
        async createOrder(_, args, context){
            const {input: {orderItems}} = args
            const {user_id} = context
            
            const order = new Order({items: [], userId: user_id})
            for (let i = 0; i < orderItems.length; i++) {
                const element = orderItems[i];
                
                const currProduct = await Product.findById(element.productId)
                
                const orderItem = new OrderItem({product: currProduct._id, quantity: element.quantity})
                const res = await orderItem.save()
                order.items.push(res.id)
            }
            const res = await order.save()

            return {
                _id: res.id,
                ...res._doc
            }
        },
        

    },
    OrderItem: {
        product : async (parent) => {
            return await Product.findById(parent.product)
        }
    },
    Order: {
        items: async (parent) => {
            let retItems = []
            const order = await Order.findById(parent.id)
            for (let index = 0; index < order.items.length; index++) {
                const element = order.items[index]
                retItems.push(await OrderItem.findById(new mongoose.Types.ObjectId(element)))
            }
            return retItems
        }
        
    }


}