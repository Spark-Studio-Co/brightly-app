import { create } from 'zustand';

interface ICitySwitch {
    switched: boolean;
    active: string;
    setActive: (active: string) => void;
    toggleSwitch: () => void;
}

export const useCitySwitch = create<ICitySwitch>((set, get) => ({
    switched: false,
    active: 'Домодедово',
    setActive: (active) => set({ active }),
    toggleSwitch: () => {
        const switched = !get().switched;
        set({
            switched,
            active: switched ? 'Коммунарка' : 'Домодедово',
        });
    },
}));