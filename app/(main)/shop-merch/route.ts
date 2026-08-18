import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect("https://selar.com/m/ngm-conference1", {
    status: 301,
  });
}
