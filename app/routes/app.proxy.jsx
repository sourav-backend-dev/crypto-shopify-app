import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const action = async ({ request }) => {
  console.log("------------hit app proxy-------------");
  const { account, email, name } = await request.json();
  console.log("Received data:", { account, email, name });

  try {
    // Check if the token already exists
    const existingToken = await prisma.token.findUnique({
      where: { tokenId: account }, // Assuming tokenId is the unique field
      select: { tokenId: true }
    });  

    if (existingToken) {
      // Handle the case where the token already exists
      console.log("Token already exists:", existingToken);
      return new Response('Token already exists', { status: 400 });
    }

    // Store the tokenId, email, and name in the database
    await prisma.token.create({
      data: {
        tokenId: account,
        email: email,
        name: name,
      },
    });
    console.log("Data stored successfully");
  } catch (error) {
    console.error("Error storing data:", error);
    return new Response('Error storing data', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

  return new Response('Data processed successfully');
};
