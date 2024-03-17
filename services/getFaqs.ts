export const getFaqs = async () => {
    try {
         // cambiar ruta antes de hacer push para la construcción de vercel:
		                            //http://localhost:3000/api/preguntas-frecuentes ----> en vercel seria ----> https://esp-fe-3-final-marvel.vercel.app/api/preguntas-frecuentes
        const response = await fetch('http://localhost:3000/api/preguntas-frecuentes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el fetch de getFaqs:', error);
        throw new Error('Ocurrió un error al obtener los datos en FAQs para preguntas frecuentes');
    }
};
