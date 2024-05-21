const { db } = require("@vercel/postgres");

async function seedUsers(client) {
  try {
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          is_verified BOOL DEFAULT FALSE
        );
      `;

    // const hashedPassword = await bcrypt.hash("katepleskatch02906", 10);
    console.log(`Created "users" table`);
    return { createTable };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCarouselContent(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS carousel (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150),
        description VARCHAR(500),
        image_src TEXT,
      );`;

    console.log("successfully created carousel posts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

async function seedPosts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS carousel (
        id SERIAL PRIMARY KEY,
        author_id INTEGER NOT NULL REFERENCES users(id),
        title VARCHAR(255),
        description VARCHAR(500),
        image_src TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_published BOOLEAN DEFAULT TRUE
    );`;

    console.log("successfully created posts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCarouselContent(client);
  await seedPosts(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the databases:",
    err
  );
});
