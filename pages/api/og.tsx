import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const hasDescription = searchParams.has("description");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Koda.";
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 100)
      : "Join a Community of business owners, techies, artists and aspiring enthusiasts who share their journeys and expertise.";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url("https://via.placeholder.com/800x418.png?text=+")`,
            width: 800,
            height: 418,
            padding: "0 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "110px" }}>{title}</h1>
          <p style={{ fontSize: "24px" }}>{description}</p>
        </div>
      ),
      {
        width: 800,
        height: 418,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
