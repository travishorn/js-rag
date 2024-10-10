<script>
  let messages = [
    {
      from: "app",
      content: "Hello! How can I help you today?"
    }
  ];

  let outgoingMessage = "";
  let appTyping = false;

  /** @param {KeyboardEvent} e */
  async function handleKeypress(e) {
    if (e.key === "Enter") {
      const freezeMessage = outgoingMessage;
      outgoingMessage = "";

      messages = [...messages, {
        from: "user",
        content: freezeMessage
      }];

      appTyping = true;

      const res = await fetch("http://localhost:3000/prompt?" + new URLSearchParams({
        q: freezeMessage
      }));
      const json = await res.json();
      
      messages = [...messages, {
        from: "app",
        content: json.response
      }];

      appTyping = false;
    }
  }
</script>

<div class="min-h-screen bg-white-linen-100">
  <div class="max-w-lg mx-auto py-10">
    <div class="flex flex-col gap-4">
      {#each messages as message}
        <div class={`flex ${message.from === "app" ? "" : "justify-end"}`}>
          <div class={`bg-white px-4 py-2 rounded shadow ${message.from === "app" ? "bg-white" : "bg-snow-flurry-100"}`}>
            {message.content}
          </div>
        </div>
      {/each}

      {#if appTyping}
        <div class="flex">
          <div class="bg-white px-4 py-2 rounded shadow">
            <img class="w-6 h-6" src="/typing.svg" alt="Typing..." />
          </div>
        </div>
      {/if}

      <textarea class="bg-white rounded-xl w-full px-4 py-1 shadow-md" on:keyup={handleKeypress} bind:value={outgoingMessage}></textarea>
    </div>
  </div>
</div>