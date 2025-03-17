export default function ChatPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://langchain-chatbot-aumtjk6hwbdbfxxjpgsvwr.streamlit.app/?embed=true&embed_options=light_theme"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
        title="Streamlit Chatbot"
        allow="fullscreen"
      />
    </div>
  );
}
