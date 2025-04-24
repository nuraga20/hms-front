export const UserRole = [
  'student',
  'faculty',
  'DSS_staff',
  'USM_staff',
  'maintenance',
  'family_member',
] as const;
type UserRoleType = (typeof UserRole)[number];

export const ApplicationStatus = [
  'pending',
  'approved',
  'rejected',
  'more docs needed',
] as const;
type ApplicationStatusType = (typeof ApplicationStatus)[number];

// export const HousingStatus = ['empty', 'partially occupied', 'fully occupied'] as const;
// type HousingStatusType = typeof HousingStatus[number];

export const PaymentStatus = ['paid', 'due', 'overdue'] as const;
type PaymentStatusType = (typeof PaymentStatus)[number];

export const MaintenanceStatus = [
  'pending',
  'in_progress',
  'completed',
  'rejected',
] as const;
type MaintenanceStatusType = (typeof MaintenanceStatus)[number];

// export const InventoryItemType = ['bed', 'table', 'chair', 'closet'] as const;
// type InventoryItemType = typeof InventoryItemType[number];

export const StudyProgram = [
  'NUFYP',
  '1YUG',
  '2YUG',
  '3YUG',
  '4YUG',
  '5YUG',
  'MS',
  'PHD',
] as const;
type StudyProgramType = (typeof StudyProgram)[number];

export const BuildingType = [
  'Dormitory',
  'Apartment',
  'Townhouse',
  'Cottage',
  'Residential Complex',
] as const;
type BuildingTypeType = (typeof BuildingType)[number];

export interface User {
  user_id: number;
  nu_id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone?: number; //7777800999
  gender: 'M' | 'F';
  role: UserRoleType;
}

export interface Student {
  user_id: number;
  program: StudyProgramType;
}

export interface Faculty {
  user_id: number;
  school: string;
  department: string;
  position: string;
}

export interface Resident {
  resident_id: number;
  user_id: number;
  application_id: number;
  check_in_date?: Date;
  check_out_date?: Date;
  room_id: number;
}

export interface Application {
  application_id: number;
  nu_id: number;
  application_date: Date;
  roommate_preferences?: number[];
  status: ApplicationStatusType;
  review_notes?: string;
  housing_type?: string;
  family_members?: Array<{
    id: string;
    name: string;
    nuid: string;
    relationship: string;
  }>;
}

export interface Contract {
  contract_id: number;
  resident_id: number;
  room_id: number;
  building_id: 1;
  contract_type: string;
  start_date: Date;
  end_date: Date;
  rent_amount: number;
  contract_status: string;
}

export interface Building {
  id: number;
  name: string;
  address: string;
  type: BuildingTypeType;
  allowed_residents: (StudyProgramType | 'Faculty')[];
}

export interface Room {
  room_id: number;
  building_id: number;
  room_number: string;
  capacity: number;
  resident_ids?: number[];
  apartment_type?: 'Studio' | '1-Bedroom' | '2-Bedroom' | '3-Bedroom';
  unit_type?: 'Townhouse' | 'Cottage';
  //   inventory: RoomInventory;
}

// export interface RoomInventory {
//   bed: InventoryItem[];
//   table: InventoryItem[];
//   chair: InventoryItem[];
//   closet: InventoryItem[];
// }

// export interface InventoryItem {
//   item_id: number;
//   room_id: number;
//   type: InventoryItemType;
//   barcode: string;
// }

export interface MaintenanceRequest {
  request_id: number;
  resident_id: number;
  room_id?: number;
  staff_id?: number;
  request_date: Date;
  status: MaintenanceStatusType;
  description: string;
}

export interface Payment {
  payment_id: number;
  resident_id: number;
  amount: number;
  payment_date: Date;
  status: PaymentStatusType;
}
