export const getFaqs = async () => {
    try {
         // cambiar ruta antes de hacer push para la construcción de vercel:
		                            //local ---> http://localhost:3000/api/preguntas-frecuentes  
                                    //vercel ---> https://esp-fe-3-final-marvel.vercel.app/api/preguntas-frecuentes (2d19acb cargue con faqs v2)
        const response = await fetch('https://esp-fe-3-final-marvel.vercel.app/api/preguntas-frecuentes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el fetch de getFaqs:', error);
        throw new Error('Ocurrió un error al obtener los datos en FAQs para preguntas frecuentes');
    }
};
