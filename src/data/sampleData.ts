import {
  User,
  Student,
  Faculty,
  Resident,
  Application,
  Building,
  Room,
  MaintenanceRequest,
  Payment,
  Contract,
} from '../types/hms';

export const usersData: User[] = [
  // Existing users
  {
    user_id: 1,
    nu_id: 202060823,
    email: 'dss_staff1@example.com',
    password_hash: '12345678',
    first_name: 'DSS',
    last_name: 'Manager',
    phone: 77771002003,
    gender: 'M',
    role: 'DSS_staff',
  },
  {
    user_id: 2,
    nu_id: 202060804,
    email: 'usm_staff1@example.com',
    password_hash: 'hashed_password',
    first_name: 'USM',
    last_name: 'Staff',
    phone: 77771002004,
    gender: 'F',
    role: 'USM_staff',
  },
  {
    user_id: 3,
    nu_id: 202060805,
    email: 'maintenance1@example.com',
    password_hash: 'hashed_password',
    first_name: 'Maintenance',
    last_name: 'Staff',
    phone: 77771002005,
    gender: 'M',
    role: 'maintenance',
  },
  // 10 Kazakh students
  {
    user_id: 4,
    nu_id: 202100001,
    email: 'nurlybek.n@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Nurlybek',
    last_name: 'Nurtayev',
    phone: 77771002006,
    gender: 'M',
    role: 'student',
  },
  {
    user_id: 5,
    nu_id: 202100002,
    email: 'aidana.s@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Aidana',
    last_name: 'Sarsenova',
    phone: 77771002007,
    gender: 'F',
    role: 'student',
  },
  {
    user_id: 6,
    nu_id: 202100003,
    email: 'zhanel.k@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Zhanel',
    last_name: 'Kairatkyzy',
    phone: 77771002008,
    gender: 'F',
    role: 'student',
  },
  {
    user_id: 7,
    nu_id: 202100004,
    email: 'daniyar.a@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Daniyar',
    last_name: 'Amanzhol',
    phone: 77771002009,
    gender: 'M',
    role: 'student',
  },
  {
    user_id: 8,
    nu_id: 202100005,
    email: 'aliya.m@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Aliya',
    last_name: 'Mukhamedzhan',
    phone: 77771002010,
    gender: 'F',
    role: 'student',
  },
  {
    user_id: 9,
    nu_id: 202100006,
    email: 'yerlan.t@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Yerlan',
    last_name: 'Tulegenov',
    phone: 77771002011,
    gender: 'M',
    role: 'student',
  },
  {
    user_id: 10,
    nu_id: 202100007,
    email: 'aigerim.k@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Aigerim',
    last_name: 'Kenzhebek',
    phone: 77771002012,
    gender: 'F',
    role: 'student',
  },
  {
    user_id: 11,
    nu_id: 202100008,
    email: 'askar.b@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Askar',
    last_name: 'Baitassov',
    phone: 77771002013,
    gender: 'M',
    role: 'student',
  },
  {
    user_id: 12,
    nu_id: 202100009,
    email: 'kaisar.z@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Kaisar',
    last_name: 'Zhalgasbek',
    phone: 77771002014,
    gender: 'M',
    role: 'student',
  },
  {
    user_id: 13,
    nu_id: 202100010,
    email: 'temirlan.s@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Temirlan',
    last_name: 'Sadvakasov',
    phone: 77771002015,
    gender: 'M',
    role: 'student',
  },

  // 5 Kazakh faculty
  {
    user_id: 14,
    nu_id: 202200001,
    email: 'zhanna.t@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Zhanna',
    last_name: 'Tulegenova',
    phone: 77771002016,
    gender: 'F',
    role: 'faculty',
  },
  {
    user_id: 15,
    nu_id: 202200002,
    email: 'nurlan.k@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Nurlan',
    last_name: 'Kurmangaliyev',
    phone: 77771002017,
    gender: 'M',
    role: 'faculty',
  },
  {
    user_id: 16,
    nu_id: 202200003,
    email: 'aliya.d@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Aliya',
    last_name: 'Duisenbekova',
    phone: 77771002018,
    gender: 'F',
    role: 'faculty',
  },
  {
    user_id: 17,
    nu_id: 202200004,
    email: 'askar.n@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Askar',
    last_name: 'Nurzhanov',
    phone: 77771002019,
    gender: 'M',
    role: 'faculty',
  },
  {
    user_id: 18,
    nu_id: 202200005,
    email: 'raushan.k@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Raushan',
    last_name: 'Kassymova',
    phone: 77771002020,
    gender: 'F',
    role: 'faculty',
  },
  {
    user_id: 19,
    nu_id: 202200006,
    email: 'nurzhan.k@nu.edu.kz',
    password_hash: 'hashed_password',
    first_name: 'Nurzhan',
    last_name: 'Kassymov',
    phone: 77771002021,
    gender: 'M',
    role: 'family_member',
  },
];


export const studentsData: Student[] = [
  { user_id: 4, program: 'NUFYP' },
  { user_id: 5, program: 'MS' },
  { user_id: 6, program: 'PHD' },
  { user_id: 7, program: '2YUG' },
  { user_id: 8, program: '1YUG' },
  { user_id: 9, program: 'MS' },
  { user_id: 10, program: 'PHD' },
  { user_id: 11, program: '3YUG' },
  { user_id: 12, program: 'NUFYP' },
  { user_id: 13, program: '4YUG' },
];

export const facultyData: Faculty[] = [
  {
    user_id: 14,
    school: 'SSH',
    department: 'History',
    position: 'Senior Lecturer',
  },
  {
    user_id: 15,
    school: 'SEDS',
    department: 'Mechanical Engineering',
    position: 'Associate Professor',
  },
  {
    user_id: 16,
    school: 'NUSOM',
    department: 'Biomedical Sciences',
    position: 'Assistant Professor',
  },
  {
    user_id: 17,
    school: 'GSB',
    department: 'Management',
    position: 'Professor',
  },
  {
    user_id: 18,
    school: 'SMG',
    department: 'Public Administration',
    position: 'Lecturer',
  },
];


export const residentsData: Resident[] = [
  {
    resident_id: 1,
    user_id: 1,
    application_id: 1,
    check_in_date: new Date(),
    check_out_date: new Date(),
    room_id: 1,
  },
  {
    resident_id: 2,
    user_id: 2,
    application_id: 2,
    check_in_date: new Date(),
    check_out_date: new Date(),
    room_id: 2,
  },
];

export const applicationsData: Application[] = [
  // 5 applications with housing_type "Dormitory" and no family members
  {
    application_id: 1,
    nu_id: 202100001,
    application_date: new Date('2025-04-01'),
    roommate_preferences: [202100009],
    status: 'pending',
    housing_type: 'Dormitory',
  },
  {
    application_id: 2,
    nu_id: 202100002,
    application_date: new Date('2025-04-05'),
    status: 'approved',
    housing_type: 'Dormitory',
  },
  {
    application_id: 3,
    nu_id: 202100003,
    application_date: new Date('2025-04-10'),
    
    status: 'rejected',
    housing_type: 'Dormitory',
  },
  {
    application_id: 4,
    nu_id: 202100004,
    application_date: new Date('2025-04-12'),
    status: 'pending',
    housing_type: 'Dormitory',
  },
  {
    application_id: 5,
    nu_id: 202100009,
    application_date: new Date('2025-04-15'),
    roommate_preferences: [202100001],
    status: 'approved',
    housing_type: 'Dormitory',
  },
  {
    application_id: 6,
    nu_id: 202200001,
    application_date: new Date('2025-04-15'),
    status: 'pending',
    housing_type: 'Apartment',
  },
  {
    application_id: 7,
    nu_id: 202200002,
    application_date: new Date('2025-04-15'),
    status: 'pending',
    housing_type: 'Cottage',
    family_members: [
      {
        id: '1',
        name: 'Nurzhan Kassymov',
        nuid: '202200006',
        relationship: 'Father',
      },
    ],
  },
];


export const buildingsData: Building[] = [
  {
    id: 1,
    name: 'D1',
    address: 'Astana, Qabanbay Batyr Ave 53 D1',
    type: 'Dormitory',
    allowed_residents: ['NUFYP'],
  },
  {
    id: 2,
    name: 'D3',
    address: 'Astana, Qabanbay Batyr Ave 53 D3',
    type: 'Dormitory',
    allowed_residents: ['NUFYP'],
  },
  {
    id: 3,
    name: 'D4',
    address: 'Astana, Qabanbay Batyr Ave 53 D4',
    type: 'Dormitory',
    allowed_residents: ['NUFYP'],
  },
  {
    id: 4,
    name: 'D5',
    address: 'Astana, Qabanbay Batyr Ave 53 D1',
    type: 'Dormitory',
    allowed_residents: ['1YUG'],
  },
  {
    id: 5,
    name: 'D6',
    address: 'Astana, Qabanbay Batyr Ave 53 D6',
    type: 'Dormitory',
    allowed_residents: ['2YUG', '3YUG', '4YUG', '5YUG', 'MS'],
  },
  {
    id: 6,
    name: 'D7',
    address: 'Astana, Qabanbay Batyr Ave 53 D7',
    type: 'Dormitory',
    allowed_residents: ['2YUG', '3YUG', '4YUG', '5YUG', 'MS'],
  },
  {
    id: 7,
    name: 'D8',
    address: 'Astana, Qabanbay Batyr Ave 53 D8',
    type: 'Dormitory',
    allowed_residents: ['2YUG', '3YUG', '4YUG', '5YUG', 'MS'],
  },
  {
    id: 8,
    name: 'D9',
    address: 'Astana, Qabanbay Batyr Ave 53 D9',
    type: 'Dormitory',
    allowed_residents: ['2YUG', '3YUG', '4YUG', '5YUG', 'MS'],
  },
  {
    id: 9,
    name: 'D10',
    address: 'Astana, Qabanbay Batyr Ave 53 D10',
    type: 'Dormitory',
    allowed_residents: ['2YUG', '3YUG', '4YUG', '5YUG', 'MS'],
  },
  {
    id: 10,
    name: 'A1',
    address: 'Astana, Qabanbay Batyr Ave 53 A1',
    type: 'Apartment',
    allowed_residents: ['PHD', 'Faculty'],
  },
  {
    id: 11,
    name: 'A2',
    address: 'Astana, Qabanbay Batyr Ave 53 A2',
    type: 'Apartment',
    allowed_residents: ['PHD', 'Faculty'],
  },
  {
    id: 12,
    name: 'A3',
    address: 'Astana, Qabanbay Batyr Ave 53 A3',
    type: 'Apartment',
    allowed_residents: ['PHD', 'Faculty'],
  },
  {
    id: 13,
    name: 'A4',
    address: 'Astana, Qabanbay Batyr Ave 53 A4',
    type: 'Apartment',
    allowed_residents: ['PHD', 'Faculty'],
  },
  { id: 14, name: 'K1', address: 'Astana, Qabanbay Batyr Ave 53 K1', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 15, name: 'K2', address: 'Astana, Qabanbay Batyr Ave 53 K2', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 16, name: 'K3', address: 'Astana, Qabanbay Batyr Ave 53 K3', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 17, name: 'K4', address: 'Astana, Qabanbay Batyr Ave 53 K4', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 18, name: 'K5', address: 'Astana, Qabanbay Batyr Ave 53 K5', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 19, name: 'K6', address: 'Astana, Qabanbay Batyr Ave 53 K6', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 20, name: 'K7', address: 'Astana, Qabanbay Batyr Ave 53 K7', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 21, name: 'K8', address: 'Astana, Qabanbay Batyr Ave 53 K8', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 22, name: 'K9', address: 'Astana, Qabanbay Batyr Ave 53 K9', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 23, name: 'K10', address: 'Astana, Qabanbay Batyr Ave 53 K10', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 24, name: 'K11', address: 'Astana, Qabanbay Batyr Ave 53 K11', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 25, name: 'K12', address: 'Astana, Qabanbay Batyr Ave 53 K12', type: 'Townhouse', allowed_residents: ['Faculty'] },
  { id: 26, name: 'K13', address: 'Astana, Qabanbay Batyr Ave 53 K13', type: 'Townhouse', allowed_residents: ['Faculty'] },
  {
    id: 27,
    name: 'K14',
    address: 'Astana, Qabanbay Batyr Ave 53 K14',
    type: 'Cottage',
    allowed_residents: ['Faculty'],
  },
  {
    id: 28,
    name: 'K15',
    address: 'Astana, Qabanbay Batyr Ave 53 K15',
    type: 'Cottage',
    allowed_residents: ['Faculty'],
  },
  {
    id: 29,
    name: 'K16',
    address: 'Astana, Qabanbay Batyr Ave 53 K16',
    type: 'Cottage',
    allowed_residents: ['Faculty'],
  },
  {
    id: 30,
    name: 'K17',
    address: 'Astana, Qabanbay Batyr Ave 53 K17',
    type: 'Cottage',
    allowed_residents: ['Faculty'],
  },
  {
    id: 31,
    name: 'K18',
    address: 'Astana, Qabanbay Batyr Ave 53 K18',
    type: 'Cottage',
    allowed_residents: ['Faculty'],
  },
];

export const roomsData: Room[] = [
  // D1 rooms (capacity 4)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 1,
      building_id: 1,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 4,
      resident_ids: [],
    };
  }),
  // D3 rooms (capacity 4)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 309,
      building_id: 2,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 4,
      resident_ids: [],
    };
  }),
  // D4 rooms (capacity 4)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 617,
      building_id: 3,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 4,
      resident_ids: [],
    };
  }),
  // D5 rooms (capacity 3)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 925,
      building_id: 4,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 3,
      resident_ids: [],
    };
  }),
  // D6 rooms (capacity 2)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 1233,
      building_id: 5,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 2,
      resident_ids: [],
    };
  }),
  // D7 rooms (capacity 2)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 1541,
      building_id: 6,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 2,
      resident_ids: [],
    };
  }),
  // D8 rooms (capacity 2)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 1849,
      building_id: 7,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 2,
      resident_ids: [],
    };
  }),
  // D9 rooms (capacity 2)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 2157,
      building_id: 8,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 2,
      resident_ids: [],
    };
  }),
  // D10 rooms (capacity 2)
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    return {
      room_id: i + 2465,
      building_id: 9,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity: 2,
      resident_ids: [],
    };
  }),
  // A1 apartments
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    const apartmentType = ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom'][Math.floor(i / 7) % 4];
    const capacity = apartmentType === 'Studio' ? 1 : 
                    apartmentType === '1-Bedroom' ? 2 :
                    apartmentType === '2-Bedroom' ? 4 : 6;
    return {
      room_id: i + 2773,
      building_id: 10,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity,
      resident_ids: [],
      apartment_type: apartmentType,
    };
  }),
  // A2 apartments
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    const apartmentType = ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom'][Math.floor(i / 7) % 4];
    const capacity = apartmentType === 'Studio' ? 1 : 
                    apartmentType === '1-Bedroom' ? 2 :
                    apartmentType === '2-Bedroom' ? 4 : 6;
    return {
      room_id: i + 3081,
      building_id: 11,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity,
      resident_ids: [],
      apartment_type: apartmentType,
    };
  }),
  // A3 apartments
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    const apartmentType = ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom'][Math.floor(i / 7) % 4];
    const capacity = apartmentType === 'Studio' ? 1 : 
                    apartmentType === '1-Bedroom' ? 2 :
                    apartmentType === '2-Bedroom' ? 4 : 6;
    return {
      room_id: i + 3389,
      building_id: 12,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity,
      resident_ids: [],
      apartment_type: apartmentType,
    };
  }),
  // A4 apartments
  ...Array.from({ length: 11 * 28 }, (_, i) => {
    const floor = Math.floor(i / 28) + 2;
    const room = (i % 28) + 1;
    const apartmentType = ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom'][Math.floor(i / 7) % 4];
    const capacity = apartmentType === 'Studio' ? 1 : 
                    apartmentType === '1-Bedroom' ? 2 :
                    apartmentType === '2-Bedroom' ? 4 : 6;
    return {
      room_id: i + 3697,
      building_id: 13,
      room_number: `${floor}${String(room).padStart(2, '0')}`,
      capacity,
      resident_ids: [],
      apartment_type: apartmentType,
    };
  }),
  // Townhouses (K1-K13)
  ...Array.from({ length: 13 }, (_, i) => ({
    room_id: i + 4005,
    building_id: i + 14,
    room_number: '1',
    capacity: 4,
    resident_ids: [],
    unit_type: 'Townhouse',
  })),
  // Cottages (K14-K18)
  ...Array.from({ length: 5 }, (_, i) => ({
    room_id: i + 4018,
    building_id: i + 27,
    room_number: '1',
    capacity: 6,
    resident_ids: [],
    unit_type: 'Cottage',
  })),
];

export const maintenanceRequestsData: MaintenanceRequest[] = [
  {
    request_id: 5001,
    resident_id: 1,
    room_id: 1,
    staff_id: undefined,
    request_date: new Date(),
    status: 'pending',
    description: 'Broken bed frame',
  },
  {
    request_id: 5002,
    resident_id: 2,
    room_id: 2,
    staff_id: undefined,
    request_date: new Date(),
    status: 'completed',
    description: 'Light bulb change',
  },
];

export const paymentsData: Payment[] = [
  {
    payment_id: 2001,
    resident_id: 1,
    amount: 140000,
    payment_date: new Date(),
    status: 'paid',
  },
  {
    payment_id: 2002,
    resident_id: 2,
    amount: 200000,
    payment_date: new Date(),
    status: 'paid',
  },
];

export const contractData: Contract[] = [];

export default {
  usersData,
  studentsData,
  facultyData,
  residentsData,
  applicationsData,
  buildingsData,
  roomsData,
  maintenanceRequestsData,
  paymentsData,
  contractData,
};
