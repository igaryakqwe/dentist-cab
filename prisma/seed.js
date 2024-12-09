const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Generate 50 users
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      emailVerified: faker.datatype.boolean() ? faker.date.recent() : null,
      image: faker.image.avatar(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['ADMIN', 'MANAGER', 'USER']),
      birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      position: faker.person.jobTitle(),
      gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });
  }

  await prisma.user.createMany({
    data: users,
  });
  console.log('50 Users created.');

  // Fetch doctors with role = ADMIN or MANAGER
  const doctors = await prisma.user.findMany({
    where: {
      role: {
        in: ['ADMIN', 'MANAGER'],
      },
    },
  });

  if (doctors.length === 0) {
    console.error(
      'No doctors found with roles ADMIN or MANAGER. Seeding aborted.'
    );
    return;
  }

  // Fetch patients with role = USER
  const patients = await prisma.user.findMany({
    where: { role: 'USER' },
  });

  // Generate 20 services
  const services = [];
  for (let i = 0; i < 20; i++) {
    services.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      duration: faker.number.int({ min: 30, max: 120 }),
      price: faker.number.int({ min: 50, max: 25000 }),
    });
  }
  await prisma.service.createMany({
    data: services,
  });
  console.log(' Services created.');

  const allServices = await prisma.service.findMany();

  // Generate 200 events for this or next week
  const events = [];
  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay() + 1; // Monday
  const startOfNextWeek = startOfWeek + 7;

  for (let i = 0; i < 100; i++) {
    const doctor = faker.helpers.arrayElement(doctors);
    const patient = faker.helpers.arrayElement(patients);
    const service = faker.helpers.arrayElement(allServices);

    // Generate random date this or next week
    const randomDayOffset = faker.helpers.arrayElement(
      [...Array(28)].map((_, idx) => idx) // Days 0-13 (this week + next week)
    );
    const startDate = new Date(today);
    startDate.setDate(startOfWeek + randomDayOffset);
    startDate.setHours(faker.number.int({ min: 9, max: 18 }));
    startDate.setMinutes(faker.helpers.arrayElement([0, 15, 30, 45]));

    const duration = service.duration * 60 * 1000; // Convert minutes to milliseconds
    const endDate = new Date(startDate.getTime() + duration);

    events.push({
      id: faker.string.uuid(),
      title: `${service.name} Appointment`,
      startDate,
      endDate,
      serviceId: service.id,
      doctorId: doctor.id,
      patientId: patient.id,
    });
  }

  await prisma.event.createMany({
    data: events,
  });
  console.log('200 Events created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
