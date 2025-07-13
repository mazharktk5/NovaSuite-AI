import { request } from "express";
import sql from "../configs/db.js"



// get all creation 

export const getUserCreation = async(req,res)=>{
    try {
        const {userId} = req.auth()

        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC `;

        res.json({
            success: true,
            creations

        })

        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


// get publish creations

export const getPublishedCreation = async(req,res)=>{
    try {
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC `;

        res.json({
            success: true,
            creations

        })

        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


// TOGLE LIKE 

export const toggleLikeCreation = async(req,res)=>{
    try {

        const{userId} = request.auth()
        const{id} =  req.body;
            
        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`

        if(!creation){
            return res.json({
                success: false,
                message: "Creation not found"
            })
        }

        const currentLikes = creations.likes;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if(currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter((user) => user !== userIdStr);
            message = "Creation Unlike";
        }else{
            updatedLikes = [...currentLikes, userIdStr];
            message = "Creation Liked";
        }

        const formattedArray =`{${updatedLikes.json(',')}}`


        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id =${id}`

     
        res.json({
            success: true,
            creations

        })

        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
}