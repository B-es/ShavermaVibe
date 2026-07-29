import { defineStore } from "pinia";

interface User {
  id: string;
  phone: string;
  name?: string;
  role?: 'user' | 'admin';
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isLoading: false,
    error: null as string | null,
    step: "phone" as "phone" | "code" | "done",
    phone: "",
    code: "",
    codeSent: false,
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.user !== null;
    },
    initials(): string {
      return this.user?.name
        ? this.user.name[0].toUpperCase()
        : this.user?.phone.slice(-2) || "?";
    },
    displayName(): string {
      return this.user?.name || this.user?.phone || "";
    },
    isAdmin(): boolean {
      return this.user?.role === 'admin';
    },
  },
  actions: {
    async sendCode(phone: string) {
      this.isLoading = true;
      this.error = null;
      await new Promise((r) => setTimeout(r, 600));
      this.phone = phone;
      this.codeSent = true;
      this.step = "code";
      this.isLoading = false;
    },
    async verifyCode(code: string) {
      this.isLoading = true;
      this.error = null;
      await new Promise((r) => setTimeout(r, 500));
      if (code.length < 4) {
        this.error = "Неверный код";
        this.isLoading = false;
        return false;
      }
      this.user = {
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(36),
        phone: this.phone,
        name: this.phone.slice(-4),
      };
      this.code = code;
      this.isLoading = false;
      this.error = null;
      localStorage.setItem("auth_user", JSON.stringify(this.user));
      return true;
    },
    logout() {
      this.user = null;
      this.phone = "";
      this.code = "";
      this.step = "phone";
      this.codeSent = false;
      this.error = null;
      localStorage.removeItem("auth_user");
    },
    loadFromLocalStorage() {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          if (u && u.id && u.phone) {
            this.user = u;
          }
        } catch {
          /* ignore */
        }
      }
    },

    loginAsTest(role: 'user' | 'admin') {
      this.user = {
        id: role === 'admin' ? 'admin-001' : 'user-001',
        phone: role === 'admin' ? '+7 (999) 000-00-01' : '+7 (999) 123-45-67',
        name: role === 'admin' ? 'Администратор' : 'Иван Петров',
        role,
      };
      this.step = 'done';
      this.error = null;
      localStorage.setItem("auth_user", JSON.stringify(this.user));
    },
  },
});
