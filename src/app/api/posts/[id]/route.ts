import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { comments: true },
  });

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}