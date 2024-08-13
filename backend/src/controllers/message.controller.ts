import { Request, Response } from "express"
import prisma from "../db/prisma.js";

export const sendMessage = async (req:Request, res: Response) => {
    try {
        const {message} = req.body;
        const { id: receiverId } = req.params; //:id와 같이 변수 형태의 URL에서 값을 가져올때
        const senderId = req.user.id;

        console.log("In message.controller-", "receiverId:",receiverId,"senderId:", senderId, "message:",message, )

        // 저장하기전 기존에 sender와 receiver의 대화 있는 지 확인
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        })

        //the very first message is being sent, that's why we need to create a new conversation.
        //없으면 새로운 대화 생성
        if(!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId]
                    }
                }
            })
        }

        //대화 생성후 새로운 메세지를 생성하고
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id
            }
        });

        //새로운 메세지를 업데이트한다.
        if(newMessage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            });
        }

        console.log("req.user in sendMessage:", req.user)
        // Socket io will go here.
        res.status(201).json(newMessage)

    } catch (error: any) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMessage = async (req:Request, res: Response) => {
    try {
        console.log("req.user in getMessage:", req.user)
        const {id: userToChatId}=req.params; //senderId or receiverId
        const senderId = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                hasEvery: [senderId, userToChatId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if(!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);

    } catch (error: any) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getUserForSidebar = async (req:Request, res: Response) => {
    try {
        console.log("req.user in getUserForSidebar:", req.user)
        const authUserId = req.user.id;
        console.log("authUserId: ",authUserId)

        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId, //로그인된 유저를 제외하고 받아옴
                }
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            }
        })
        res.status(200).json(users);

    } catch (error: any) {
        console.error("Error in getUserForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};