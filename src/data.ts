import type { Event, Intervention, Participant } from './types'

// Ten completed Ludhiana Running Club events leading up to the October 20, 2026 demo.
const dates = ['Sep 27', 'Sep 30', 'Oct 3', 'Oct 4', 'Oct 7', 'Oct 10', 'Oct 11', 'Oct 14', 'Oct 17', 'Oct 18']
const history = (attended: boolean[]) => dates.map((date, index) => ({ eventId: `event-${index + 1}`, date, attended: attended[index] }))
const steady = (recent: boolean[]) => history([true, true, true, true, true, true, true, ...recent])
const partialHistory = (startIndex: number, attended: boolean[]) => dates.slice(startIndex).map((date, index) => ({ eventId: `event-${startIndex + index + 1}`, date, attended: attended[index] }))

export const events: Event[] = [
  { id:'event-10', name:'Sunday Morning Run', date:'Oct 18', attended:42, registered:48 }, { id:'event-9', name:'Saturday Community Run', date:'Oct 17', attended:31, registered:36 }, { id:'event-8', name:'Wednesday Evening Run', date:'Oct 14', attended:27, registered:30 }, { id:'event-7', name:'Sunday Morning Run', date:'Oct 11', attended:45, registered:50 }, { id:'event-6', name:'Saturday Community Run', date:'Oct 10', attended:34, registered:38 }, { id:'event-5', name:'Wednesday Evening Run', date:'Oct 7', attended:39, registered:43 }, { id:'event-4', name:'Sunday Morning Run', date:'Oct 4', attended:46, registered:51 }, { id:'event-3', name:'Saturday Community Run', date:'Oct 3', attended:40, registered:44 }, { id:'event-2', name:'Wednesday Evening Run', date:'Sep 30', attended:37, registered:42 }, { id:'event-1', name:'Sunday Morning Run', date:'Sep 27', attended:43, registered:47 }
]

export const initialParticipants: Participant[] = [
  { id:'aman-sharma', name:'Aman Sharma', joinedAt:'Mar 2026', status:'Drifting', lastAttended:'10 days ago', likelyReason:'Schedule conflict', history:history([true,true,true,true,true,true,false,false,false,false]) },
  { id:'simran-kaur', name:'Simran Kaur', joinedAt:'Apr 2026', status:'Drifting', lastAttended:'9 days ago', likelyReason:'Schedule conflict', history:history([true,true,true,true,true,true,true,false,false,false]) },
  { id:'rahul-verma', name:'Rahul Verma', joinedAt:'Oct 2026', status:'New', lastAttended:'6 days ago', likelyReason:'New participant drop-off', joinedRecently:true, history:partialHistory(7,[true,false,false]) },
  { id:'arjun-mehta', name:'Arjun Mehta', joinedAt:'Jan 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'neha-sharma', name:'Neha Sharma', joinedAt:'Feb 2026', status:'Returned', lastAttended:'2 days ago', likelyReason:'Schedule conflict resolved', returnedAt:'Oct 18, 2026', history:history([true,true,true,true,true,false,false,false,false,true]) },
  { id:'karan-singh', name:'Karan Singh', joinedAt:'May 2026', status:'Drifting', lastAttended:'9 days ago', likelyReason:'Changing engagement', history:history([true,true,true,true,false,false,true,false,false,false]) },
  { id:'priya-nair', name:'Priya Nair', joinedAt:'Jan 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'kavya-iyer', name:'Kavya Iyer', joinedAt:'Mar 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([false,true,true]) },
  { id:'rohan-mehta', name:'Rohan Mehta', joinedAt:'Feb 2026', status:'At Risk', lastAttended:'3 days ago', likelyReason:'Changing engagement', history:history([true,true,false,true,false,false,true,false,true,false]) },
  { id:'isha-kapoor', name:'Isha Kapoor', joinedAt:'Apr 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'dev-malhotra', name:'Dev Malhotra', joinedAt:'Jun 2026', status:'Healthy', lastAttended:'3 days ago', likelyReason:'—', history:steady([true,true,false]) },
  { id:'meera-joshi', name:'Meera Joshi', joinedAt:'Jan 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'vishal-patel', name:'Vishal Patel', joinedAt:'Mar 2026', status:'Drifting', lastAttended:'9 days ago', likelyReason:'Schedule conflict', history:history([true,true,true,true,true,true,true,false,false,false]) },
  { id:'ananya-reddy', name:'Ananya Reddy', joinedAt:'Feb 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'tanvi-shah', name:'Tanvi Shah', joinedAt:'May 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,false,true]) },
  { id:'aditya-rao', name:'Aditya Rao', joinedAt:'Oct 2026', status:'New', lastAttended:'3 days ago', likelyReason:'New participant drop-off', joinedRecently:true, history:partialHistory(7,[true,true,false]) },
  { id:'sneha-menon', name:'Sneha Menon', joinedAt:'Jan 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'manav-khanna', name:'Manav Khanna', joinedAt:'Feb 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'pooja-agarwal', name:'Pooja Agarwal', joinedAt:'Jun 2026', status:'Drifting', lastAttended:'9 days ago', likelyReason:'Schedule conflict', history:history([true,true,true,true,true,true,true,false,false,false]) },
  { id:'siddharth-jain', name:'Siddharth Jain', joinedAt:'Mar 2026', status:'Healthy', lastAttended:'3 days ago', likelyReason:'—', history:steady([true,true,false]) },
  { id:'riya-bose', name:'Riya Bose', joinedAt:'Apr 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'nishant-saxena', name:'Nishant Saxena', joinedAt:'May 2026', status:'At Risk', lastAttended:'3 days ago', likelyReason:'Changing engagement', history:history([true,false,true,true,false,true,false,false,true,false]) },
  { id:'aisha-khan', name:'Aisha Khan', joinedAt:'Feb 2026', status:'Healthy', lastAttended:'2 days ago', likelyReason:'—', history:steady([true,true,true]) },
  { id:'yash-chopra', name:'Yash Chopra', joinedAt:'Jun 2026', status:'Healthy', lastAttended:'3 days ago', likelyReason:'—', history:steady([true,true,false]) }
]

export const initialInterventions: Intervention[] = [
  { id:'i-neha', participantId:'neha-sharma', type:'Alternative event suggestion', date:'Oct 10, 2026', status:'Completed', result:'Returned', returnDate:'Oct 18, 2026', timeToReturnDays:8, channel:'Demo' },
  { id:'i-arjun', participantId:'arjun-mehta', type:'Welcome-back message', date:'Sep 23, 2026', status:'Completed', result:'Returned', returnDate:'Sep 30, 2026', timeToReturnDays:7, channel:'Demo' },
  { id:'i-karan', participantId:'karan-singh', type:'Ask reason', date:'Oct 12, 2026', status:'Completed', result:'No return yet', channel:'Demo' },
  { id:'i-vishal', participantId:'vishal-patel', type:'Low-pressure reminder', date:'Oct 13, 2026', status:'Completed', result:'No return yet', channel:'Demo' },
  { id:'i-demo-1', participantId:'priya-nair', type:'Alternative event suggestion', date:'Sep 28, 2026', status:'Completed', result:'Returned', returnDate:'Oct 4, 2026', timeToReturnDays:6, channel:'Demo' },
  { id:'i-demo-2', participantId:'rohan-mehta', type:'Welcome-back message', date:'Oct 9, 2026', status:'Completed', result:'No return yet', channel:'Demo' }
]
