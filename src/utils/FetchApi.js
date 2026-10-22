import { getApiBaseUrl } from "./apiBase";

const API_URL = getApiBaseUrl();

export const fetchAPI = async (
  url,
  method = "GET",
  data = null,
  token = null
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      // Strip any existing 'Bearer ' prefix to avoid double-Bearer headers
      const cleanToken = token.replace(/^Bearer\s+/i, "");
      headers["Authorization"] = `Bearer ${cleanToken}`;
    }

    const options = { method, headers, cache: "no-store" };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const fullUrl = `${API_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

    const response = await fetch(fullUrl, options);

    // 304 Not Modified: the server says our cached copy is still valid.
    // The API layer must never treat this as an error — otherwise polling
    // endpoints (e.g. the 5s /users/me balance poll) throw on every
    // unchanged response and the cached balance silently goes stale.
    if (response.status === 304) {
      return { success: true, notModified: true };
    }

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };

    // On 401 with an authenticated request, clear the stale user session.
    // Keep backend-provided messages for login/register style requests.
    if (response.status === 401 && token) {
      localStorage.removeItem("user");
    }

    const providerError =
      Number.isFinite(Number(result?.status_code)) &&
      Number(result.status_code) >= 400;

    if (
      !response.ok ||
      result?.success === false ||
      result?.status === false ||
      providerError
    ) {
      const fallbackMessage =
        response.status === 401 && token
          ? "Session expired. Please log in again."
          : "Something went wrong";

      const apiError = new Error(
        result?.message ||
          result?.status_description ||
          result?.error ||
          fallbackMessage
      );
      apiError.response = result;
      apiError.status = response.status;
      throw apiError;
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(error?.message || error?.error || "Something went wrong");
  }
};
