const form = document.querySelector("#contact-form");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/send/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) throw new Error("Failed to send message");

    // Add toast to DOM if not already there
    if (!document.querySelector("#liveToast")) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">Email</strong>
              <small>Enviado</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              Email enviado com sucesso!
            </div>
          </div>
        </div>
      `
      );
    }

    // Show the toast using Bootstrap's JS API
    const toastElement = document.getElementById("liveToast");
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    form.reset();
  } catch (error) {
    console.error(error);
    alert("Ocorreu um erro ao enviar sua mensagem.");
  }
}
