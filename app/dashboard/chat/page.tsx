export default function ChatPage() {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://learngap.streamlit.app/?embed=true&embed_options=light_theme"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Streamlit Chatbot"
        allow="fullscreen"
      />
    </div>
  );
}
