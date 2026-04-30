export function getAdminPass() {
  return process.env.PROJUICE_ADMIN_PASS || "";
}

export function isAdminRequestAuthorized(request) {
  const expectedPass = getAdminPass();
  const providedPass = request.headers.get("x-admin-pass") || "";

  return !expectedPass || providedPass === expectedPass;
}

export function adminAuthResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
