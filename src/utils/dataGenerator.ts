import { faker } from '@faker-js/faker';

const multilingualFaker = {
  ...faker,
  person: {
    ...faker.person,
    fullName: () => {
      const locales = ['vi', 'hi', 'mr', 'en'];
      const locale = faker.helpers.arrayElement(locales);
      return faker.person.fullName({ locale });
    },
    jobTitle: () => {
      const locales = ['vi', 'hi', 'mr', 'en'];
      const locale = faker.helpers.arrayElement(locales);
      return faker.person.jobTitle({ locale });
    },
  },
  company: {
    ...faker.company,
    name: () => {
      const locales = ['vi', 'hi', 'mr', 'en'];
      const locale = faker.helpers.arrayElement(locales);
      return faker.company.name({ locale });
    },
  },
  location: {
    ...faker.location,
    streetAddress: () => {
      const locales = ['vi', 'hi', 'mr', 'en'];
      const locale = faker.helpers.arrayElement(locales);
      return faker.location.streetAddress({ locale });
    },
  },
};

const addEmoji = (text: string) => {
  const emojis = ['😀', '😎', '🚀', '💼', '🌍', '📱', '💡', '🎉'];
  const emoji = faker.helpers.arrayElement(emojis);
  return `${text} ${emoji}`;
};

const shouldAddEmoji = () => faker.datatype.boolean({ probability: 0.3 });

export const generateFakeData = (types: string[], count: number, domains: string[] = [], isMultilingual: boolean = false) => {
  const data = [];
  const fakerInstance = isMultilingual ? multilingualFaker : faker;

  for (let i = 0; i < count; i++) {
    const row: Record<string, string> = {};
    types.forEach((type) => {
      let value: string;
      switch (type) {
        case 'Full Name':
          value = fakerInstance.person.fullName();
          break;
        case 'Email':
          const domain = domains.length > 0 ? faker.helpers.arrayElement(domains) : faker.internet.domainName();
          value = faker.internet.email({ provider: domain });
          break;
        case 'Phone Number':
          value = faker.phone.number();
          break;
        case 'Date of Birth':
          value = faker.date.birthdate().toISOString().split('T')[0];
          break;
        case 'Address':
          value = fakerInstance.location.streetAddress();
          break;
        case 'Company':
          value = fakerInstance.company.name();
          break;
        case 'Job Title':
          value = fakerInstance.person.jobTitle();
          break;
        case 'Credit Card Number':
          value = faker.finance.creditCardNumber();
          break;
        case 'UUID':
          value = faker.string.uuid();
          break;
        case 'IP Address':
          value = faker.internet.ip();
          break;
        default:
          value = 'Unknown';
      }
      row[type] = isMultilingual && ['Full Name', 'Job Title', 'Address', 'Company'].includes(type) && shouldAddEmoji() ? addEmoji(value) : value;
    });
    data.push(row);
  }

  return data;
};