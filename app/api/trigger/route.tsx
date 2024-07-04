import { NextResponse } from "next/server"
export async function GET(request: Request) {
	try {
		console.log("***** manaual trigger *****")

		return NextResponse.json("OK")
	} catch (error: any) {
		return NextResponse.json("error", { status: 500 })
	}
}
