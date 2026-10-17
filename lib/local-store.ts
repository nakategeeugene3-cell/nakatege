export type ChatMessage = {
  id: string;
  name: string;
  phone: string;
  message: string;
  created_at: string;
};

export type Agency = {
  city: string;
  phone: string;
};

type LocalStore = {
  messages: ChatMessage[];
  agencies: Agency[];
};

const state = globalThis as typeof globalThis & { kingShippingStore?: LocalStore };

export function getLocalStore(): LocalStore {
  if (!state.kingShippingStore) {
    state.kingShippingStore = {
      messages: [],
      agencies: [
        { city: "Kinshasa", phone: "+243 000 000 001" },
        { city: "Lubumbashi", phone: "+243 000 000 002" },
        { city: "Nairobi", phone: "+254 700 000 003" },
        { city: "Goma", phone: "+243 000 000 004" },
      ],
    };
  }
  return state.kingShippingStore;
}
