Local development notes

Backend quick start:

```bash
./mvnw spring-boot:run
# or build and run jar
./mvnw -DskipTests package
java -jar target/subscriptionservice-0.0.1-SNAPSHOT.jar
```

Quick smoke test (login):

```bash
curl -i -X POST http://localhost:8081/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

Endpoints:

- POST `/auth/login`  - accepts `{ email, password }` and returns `{ token }`
- GET  `/auth/me`     - returns `{ email }` when `Authorization: Bearer <token>` provided
- GET  `/subscriptions` (protected) - list subscriptions
- POST `/subscriptions` (protected) - create subscription
- GET  `/dashboard` (protected) - aggregated summary

Notes:

- A demo JWT secret is used in `JwtService` for local development — replace with a secure, environment-driven secret in production.
- Mobile notes: see `subtrack-mobile/README.md` for installing `expo-blur` and `@react-native-async-storage/async-storage` and emulator host hints.
