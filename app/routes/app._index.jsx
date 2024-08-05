import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Page, DataTable, Button } from "@shopify/polaris";
import db from "../db.server";
import shopify from '../shopify.server';

export const loader = async ({request}) => {
  const tokens = await db.Token.findMany();
  const { admin, session } = await shopify.authenticate.admin(request);
  
  // Fetch all orders
  const ordersData = await admin.rest.resources.Order.all({
    session: session,
    status: "any",
  });

  // Aggregate total amount spent by email
  const emailSpending = {};
  ordersData.data.forEach(order => {
    const email = order.customer.email;
    const totalSpent = parseFloat(order.total_price);

    if (email) {
      if (!emailSpending[email]) {
        emailSpending[email] = 0;
      }
      emailSpending[email] += totalSpent;
    }
  });

  return json({ tokens, emailSpending });
};

export default function Index() {
  const { tokens, emailSpending } = useLoaderData();

  // Prepare rows with email, name, total amount spent data, and button
  const rows = tokens.map((token) => {
    const totalSpent = emailSpending[token.email] || 0;

    return [
      token.id,
      token.tokenId,
      token.email,
      token.name,
      `$${totalSpent.toFixed(2)}`, // Format as currency
      <Button 
        primary 
        onClick={() => handleButtonClick(token.id)}
      >
        Action
      </Button>
    ];
  });

  // Handler function for button click
  const handleButtonClick = (tokenId) => {
    // Handle the button click action here
    console.log(`Button clicked for Token ID: ${tokenId}`);
  };

  return (
    <Page title="Token IDs">
      <Card>
        <DataTable
          columnContentTypes={["numeric", "text", "text", "text", "text", "text"]}
          headings={["ID", "Token ID", "Email", "Name", "Total Spent", "Action"]}
          rows={rows}
        />
      </Card>
    </Page>
  );
}
