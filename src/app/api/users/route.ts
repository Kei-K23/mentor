import { db } from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const username = searchParams.get('name') ?? "";
    try {

        if (username === "undefined") {

            const users = await db.userProgress.findMany({
                orderBy: {
                    points: "desc"
                },
                take: 3,
                include: {
                    user: true
                }
            });

            return Response.json(users);

        } else {
            const users = await db.userProgress.findMany({
                where: {
                    user: {
                        username: {
                            contains: username
                        }
                    }
                },
                orderBy: {
                    points: "desc"
                },
                include: {
                    user: true
                }
            });
            return Response.json(users);
        }
    } catch (e: any) {
        return new Response("Something went wrong", { status: 500 });
    }
}