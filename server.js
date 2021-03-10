const io = require("socket.io")(5000)

io.on("connection", socket => {
	const id = socket.handshake.query.id
	socket.join(id)

	socket.on("send-message", ({ receivers, message }) => {
		receivers.forEach(receiver => {
			const editedReceivers = receivers.filter(r => r !== receiver)
			editedReceivers.push(id)

			socket.broadcast.to(receiver).emit("receive-message", {
				receivers: editedReceivers,
				sender: id,
				message
			})
		})
	})
})
