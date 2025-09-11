import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import calloglogo from "../../assets/img/calloglogo.png";

const SendMail = () => {
  const navigate = useNavigate();

  // Initial messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "CalLogFit",
      subject: "Welcome to the Community",
      body: "Welcome to CalLogFit! Start your fitness journey today!",
      received: "Aug 12 10:00 AM",
      blocked: false,
    },
    {
      id: 2,
      from: "Admin",
      subject: "Update on New Features",
      body: "We have added new features in your dashboard. Check it out!",
      received: "Aug 20 2:30 PM",
      blocked: false,
    },
    {
      id: 3,
      from: "Coach",
      subject: "Your Weekly Tips",
      body: "Remember to hydrate and track your calories daily for best results.",
      received: "Sep 1 9:00 AM",
      blocked: false,
    },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [currentTab, setCurrentTab] = useState("Inbox");
  const [viewMessage, setViewMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    body: "",
  });

  // Toggle individual message selection
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  // Toggle select all messages
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        messages.filter((msg) => !msg.blocked).map((msg) => msg.id)
      );
    }
    setSelectAll(!selectAll);
  };

  // Delete selected messages
  const deleteSelected = () => {
    setMessages(messages.filter((msg) => !selectedIds.includes(msg.id)));
    setSelectedIds([]);
    setSelectAll(false);
    setViewMessage(null);
  };

  // Block selected messages/users
  const blockSelected = () => {
    setMessages(
      messages.map((msg) =>
        selectedIds.includes(msg.id) ? { ...msg, blocked: true } : msg
      )
    );
    setSelectedIds([]);
    setSelectAll(false);
    setViewMessage(null);
  };

  // Send new message
  const sendMessage = () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.body) return;
    const newMsg = {
      id: messages.length + 1,
      from: "You",
      to: newMessage.to,
      subject: newMessage.subject,
      body: newMessage.body,
      received: "Just now",
      blocked: false,
    };
    setMessages([newMsg, ...messages]);
    setNewMessage({ to: "", subject: "", body: "" });
    setShowCompose(false);
    setCurrentTab("Sent Messages");
  };

  // Reply to a message
  const replyMessage = (msg) => {
    setShowCompose(true);
    setNewMessage({ to: msg.from, subject: "Re: " + msg.subject, body: "" });
  };

  // Delete a single message
  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    setViewMessage(null);
  };

  // Block a single message/user
  const blockMessage = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, blocked: true } : msg))
    );
    setViewMessage(null);
  };

  // Filter messages by current tab
  const filteredMessages = messages.filter((msg) => {
    if (currentTab === "Inbox") return !msg.blocked && msg.from !== "You";
    if (currentTab === "Sent Messages")
      return !msg.blocked && msg.from === "You";
    if (currentTab === "Blocked Users") return msg.blocked;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-[#1D2D44] px-6 py-3 shadow-md">
        <div className="flex items-center space-x-3">
          <img src={calloglogo} alt="Logo" className="h-10 w-auto" />
        </div>
        <button
          onClick={() => navigate("/checkin")}
          className="px-4 py-2 bg-[#FFFFFF] text-[#1D2D44] rounded-lg shadow hover:bg-[#FF4B4B] transition"
        >
          Back to Check-In
        </button>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4">
          {["Inbox", "Sent Messages", "Blocked Users"].map((tab) => (
            <div
              key={tab}
              onClick={() => {
                setCurrentTab(tab);
                setViewMessage(null);
              }}
              className={`cursor-pointer p-2 mb-2 rounded ${
                currentTab === tab
                  ? "bg-[#1D2D44] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {!viewMessage ? (
            <>
              <h2 className="text-2xl font-bold text-[#1D2D44] mb-6">
                {currentTab}
              </h2>

              <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#1D2D44] text-white">
                    <tr>
                      <th className="p-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="p-3 text-left">From</th>
                      <th className="p-3 text-left">Subject</th>
                      <th className="p-3 text-left">Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((msg) => (
                      <tr
                        key={msg.id}
                        className={`border-t hover:bg-gray-50 cursor-pointer ${
                          msg.blocked ? "bg-red-100 text-gray-500" : ""
                        }`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(msg.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleSelect(msg.id);
                            }}
                          />
                        </td>
                        <td
                          className="p-3"
                          onClick={() =>
                            currentTab !== "Sent Messages" &&
                            setViewMessage(msg)
                          }
                        >
                          {msg.from}
                        </td>
                        <td
                          className="p-3"
                          onClick={() =>
                            currentTab !== "Sent Messages" &&
                            setViewMessage(msg)
                          }
                        >
                          {msg.subject}
                        </td>
                        <td
                          className="p-3"
                          onClick={() =>
                            currentTab !== "Sent Messages" &&
                            setViewMessage(msg)
                          }
                        >
                          {msg.received}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-3">
                  <button
                    onClick={deleteSelected}
                    disabled={selectedIds.length === 0}
                    className={`px-4 py-2 rounded-lg ${
                      selectedIds.length === 0
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    DELETE SELECTED
                  </button>
                  <button
                    onClick={blockSelected}
                    disabled={selectedIds.length === 0}
                    className={`px-4 py-2 rounded-lg ${
                      selectedIds.length === 0
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    BLOCK SELECTED
                  </button>
                </div>
                <button
                  onClick={() => setShowCompose(true)}
                  className="px-6 py-2 bg-[#1D2D44] text-white rounded-lg hover:bg-blue-700 transition"
                >
                  COMPOSE MESSAGE
                </button>
              </div>
            </>
          ) : (
            // Full message view
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#1D2D44] mb-2">
                {viewMessage.subject}
              </h3>
              <p className="text-gray-600 mb-2">
                From: <strong>{viewMessage.from}</strong>
              </p>
              <p className="text-gray-600 mb-4">
                Received: {viewMessage.received}
              </p>
              <p className="text-gray-700 mb-6">{viewMessage.body}</p>

              <div className="flex space-x-3">
                <button
                  onClick={() => replyMessage(viewMessage)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply
                </button>
                <button
                  onClick={() => deleteMessage(viewMessage.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => blockMessage(viewMessage.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Block
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold text-[#1D2D44] mb-4">
              Compose Message
            </h3>
            <input
              type="text"
              placeholder="To"
              value={newMessage.to}
              onChange={(e) =>
                setNewMessage({ ...newMessage, to: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              placeholder="Subject"
              value={newMessage.subject}
              onChange={(e) =>
                setNewMessage({ ...newMessage, subject: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <textarea
              placeholder="Message"
              value={newMessage.body}
              onChange={(e) =>
                setNewMessage({ ...newMessage, body: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded h-28"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMail;
