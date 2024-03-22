import React, { createContext, useState, useContext } from 'react';

// Definir el tipo para el contexto
interface ComicContextType {
    ComicId: number;
    setComicId: React.Dispatch<React.SetStateAction<number>>;
}

// Crear el contexto
export const ComicContext = createContext<ComicContextType | undefined>(undefined);

// Proveedor del contexto
export const ComicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ComicId, setComicId] = useState<number>(0);

    return (
        <ComicContext.Provider value={{ ComicId, setComicId }}>
            {children}
        </ComicContext.Provider>
    );
};

// Función personalizada para usar el contexto
export const useComicContext = () => {
    const context = useContext(ComicContext);
    if (!context) {
        throw new Error('useComicContext debe ser usado dentro de un ComicProvider');
    }
    return context;
};
