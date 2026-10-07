const submitContact = async (data) => {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  const endpoint = `${baseUrl}/api/contact`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      return {
        success: false,
        message:
          payload?.message ||
          (response.status === 429
            ? "Too many requests"
            : "Unable to send message"),
        status: response.status,
      };
    }

    return {
      success: Boolean(payload?.success),
      message: payload?.message || "Request submitted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Unable to send message",
      status: 0,
    };
  }
};

export default submitContact;
