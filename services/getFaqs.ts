export const getFaqs = async () => {
    try {
         // cambiar ruta antes de hacer push para la construcción de vercel:
		                                            //http://localhost:3000/api/faqs ----> en vercel seria ----> https://esp-fe-3-final-marvel.vercel.app/faqs
        const response = await fetch('https://esp-fe-3-final-marvel.vercel.app/faqs');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el fetch de getFaqs:', error);
        throw new Error('Ocurrió un error al obtener los datos en FAQs para preguntas frecuentes');
    }
};
