import { createContext, useContext, useState, ReactNode } from 'react';

type PomodoroConfigType = {
    pomodoro: number;
    pausa: number;
    pausaLonga: number;
    setPomodoro: (valor: number) => void;
    setPausa: (valor: number) => void;
    setPausaLonga: (valor: number) => void;
};

const PomodoroContext = createContext<PomodoroConfigType | undefined>(undefined);

export function PomodoroProvider({ children }: { children: ReactNode}) {
    const [pomodoro, setPomodoro] = useState(25);
    const [pausa, setPausa] = useState(5);
    const [pausaLonga, setPausaLonga] = useState(15);

    return (
        <PomodoroContext.Provider
            value={{ pomodoro, pausa, pausaLonga, setPomodoro, setPausa, setPausaLonga }}>
                {children}
            </PomodoroContext.Provider>
    );
    
}

export function usePomodoroConfig() {
    const contexto = useContext(PomodoroContext);
    if (!contexto) {
        throw new Error('UsePomodoroConfig precisa estar dentro de um PomodoroProvider');
    }
    return contexto;
}