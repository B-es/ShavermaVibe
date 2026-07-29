import { defineStore } from "pinia";

function genId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

export interface SavedAddress {
  id: number;
  address: string;
  ent: string;
  floor: string;
  apt: string;
  def: boolean;
}

interface LocalSettings {
  sessionId: string;
  lastAddress: string;
  apartment: string;
  entrance: string;
  floor: string;
  deliveryType: "delivery" | "pickup";
  coordinates: { lat: number; lng: number };
  addresses: SavedAddress[];
}

export const useSessionStore = defineStore("session", {
  state: () => ({
    sessionId: "",
    lastAddress: "",
    apartment: "",
    entrance: "",
    floor: "",
    deliveryType: "delivery" as "delivery" | "pickup",
    coordinates: { lat: 0, lng: 0 },
    addresses: [] as SavedAddress[],
  }),
  actions: {
    load() {
      const raw = localStorage.getItem("session");
      if (raw) {
        try {
          const d = JSON.parse(raw) as LocalSettings;
          this.sessionId = d.sessionId;
          this.lastAddress = d.lastAddress || "";
          this.apartment = d.apartment || "";
          this.entrance = d.entrance || "";
          this.floor = d.floor || "";
          this.deliveryType = d.deliveryType || "delivery";
          this.coordinates = d.coordinates || { lat: 0, lng: 0 };
          this.addresses = d.addresses || [];
        } catch {
          /* ignore */
        }
      }
      if (!this.sessionId) {
        this.sessionId = genId();
        this.save();
      }
    },
    save() {
      const data: LocalSettings = {
        sessionId: this.sessionId,
        lastAddress: this.lastAddress,
        apartment: this.apartment,
        entrance: this.entrance,
        floor: this.floor,
        deliveryType: this.deliveryType,
        coordinates: this.coordinates,
        addresses: this.addresses,
      };
      localStorage.setItem("session", JSON.stringify(data));
    },
    addAddress(a: SavedAddress) {
      this.addresses.push(a);
      this.save();
    },
    removeAddress(id: number) {
      this.addresses = this.addresses.filter((a) => a.id !== id);
      this.save();
    },
    setDefaultAddress(id: number) {
      this.addresses.forEach((a) => { a.def = a.id === id; });
      this.save();
    },
  },
});
