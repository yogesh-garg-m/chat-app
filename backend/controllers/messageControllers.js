
const Message = require("../models/messages.js");
const Conversation = require("../models/conversation.js")

async function handleSendMessage(req,res){
    try{
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            messages: message
        });


        
        
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await newMessage.save();
        // await conversation.save();

        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);
    }
    catch (err){
        console.log("Error in sending messages" +" " + err);
        res.status(500).json({message: "Error in sending messages"});
    }
};

async function handleRecieveMessage(req,res){
    try{
        const userToChatId = req.params.id;
        //const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        console.log("Sender is" , senderId );
        console.log("Receiver is" , userToChatId );
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages)
    }
    catch (err){
        console.log("Error in recieve messages" +" " + err.message);
        res.status(500).json({message: "Error in recieve messages"});
    }
};

module.exports = {
    handleSendMessage,
    handleRecieveMessage
}
