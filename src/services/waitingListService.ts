
import { v4 as uuidv4 } from 'uuid';

export interface WaitingPatient {
  id: string;
  name: string;
  age: number;
  department: string;
  priority: "normal" | "urgent" | "emergency";
  waitingSince: string;
  timeWaiting: string;
  diagnosis: string;
}

// Using localStorage to persist the waiting list between page refreshes
const STORAGE_KEY = 'hospital_waiting_list';

export const getWaitingList = (): WaitingPatient[] => {
  const storedList = localStorage.getItem(STORAGE_KEY);
  return storedList ? JSON.parse(storedList) : [];
};

export const addToWaitingList = (patient: Omit<WaitingPatient, 'id' | 'waitingSince' | 'timeWaiting'>): WaitingPatient => {
  const waitingList = getWaitingList();
  
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 10) + ' ' + 
                        now.getHours().toString().padStart(2, '0') + ':' + 
                        now.getMinutes().toString().padStart(2, '0');
  
  const newPatient: WaitingPatient = {
    ...patient,
    id: `W-${1000 + waitingList.length + 1}`,
    waitingSince: formattedDate,
    timeWaiting: "Just now"
  };
  
  const updatedList = [...waitingList, newPatient];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  
  return newPatient;
};

export const updateWaitingList = (updatedList: WaitingPatient[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
};
