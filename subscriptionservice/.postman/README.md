# Postman / Newman collection for Subscriptionservice ✅

Quick notes:

- Auth request: `POST {{baseUrl}}/auth/login` (body: { email, password })
- The login request **tests script** saves the returned token into environment variable `jwt` using:

  pm.environment.set("jwt", pm.response.json().token);

  (This is included exactly as requested and compatible with Newman.)

- Protected requests should set header:

  Authorization: Bearer {{jwt}}

Running with Newman:

- Install: `npm i -g newman` or add to your CI image.
- Run the collection with the included environment:

  newman run .postman/Subscriptionservice.postman_collection.json -e .postman/Subscriptionservice.postman_environment.json --delay-request 200

Notes:
- The collection assumes `{{baseUrl}}` points to your running backend (default `http://localhost:8081`).
- You can also import the collection into Postman and run manually. Ensure you use the provided environment or create one with `baseUrl` and `jwt` variables.

If you want, I can add a small CI job that runs this collection with Newman after the backend starts in CI.