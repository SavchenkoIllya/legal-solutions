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
        title_ru VARCHAR(150),
        title_ua VARCHAR(150),
        title_pl VARCHAR(150),
        title_en VARCHAR(150),
        description_ru VARCHAR(500),
        description_ua VARCHAR(500),
        description_pl VARCHAR(500),
        description_en VARCHAR(500),
        image_src TEXT,
      );`;

    console.log("successfully created carousel posts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding carousel posts:", error);
  }
}

async function seedPosts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        author_id INTEGER NOT NULL REFERENCES users(id),
        title_ru VARCHAR(255),
        title_ua VARCHAR(255),
        title_pl VARCHAR(255),
        title_en VARCHAR(255),
        description_ru TEXT,
        description_ua TEXT,
        description_pl TEXT,
        description_en TEXT,
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

async function seedGroups(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        title_ru VARCHAR(255),
        title_ua VARCHAR(255),
        title_pl VARCHAR(255),
        title_en VARCHAR(255),
        description_ru VARCHAR(500),
        description_ua VARCHAR(500),
        description_pl VARCHAR(500),
        description_en VARCHAR(500),
        price_range VARCHAR(100),
        posts_id INTEGER[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );`;

    console.log("successfully created posts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

async function seedContacts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contacts (
        work_hours VARCHAR(255) NOT NULL,
        telephone VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telegram VARCHAR(255) NOT NULL,
        instagram VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(255) NOT NULL
    );`;

    console.log("successfully created contacts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding contacts:", error);
  }
}

async function seedMails(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS mails (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        comment TEXT,
        region VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );`;

    console.log("successfully created contacts table");
    return createTable;
  } catch (error) {
    console.error("Error seeding contacts:", error);
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCarouselContent(client);
  await seedPosts(client);
  await seedContacts(client);
  await seedGroups(client);
  await seedMails(client);

  await client.end();
}

main().catch((_) => {
  console.error(
    "An error occurred while attempting to seed the databases:"
  );
});
