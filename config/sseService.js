// Replace the clients object with a Map
const clients = new Map();

function eventsHandler(req, res, next) {
  const { userId } = req.params;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  console.log("New client connected with id", userId);
  clients.set(userId, res); // Use set() to store the client

  res.write(`data: Connected to the server\n\n`);

  // Close the connection if the client disconnects
  req.on("close", () => {
    res.end();
    if (clients.has(userId)) {
      clients.delete(userId); // Use delete() to remove the client
    }
  });
}

// Initialize the SSE route
function initSSERoute(app) {
  app.get("/events/:userId", eventsHandler);
  app.get(
    "/status",
    (request, response) => response.json({ clients: clients.size }) // Use the size property to get the number of clients
  );
}

module.exports = { initSSERoute, clients };
