import { faqsData } from 'dh-marvel/components/faqs/faqsData';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FaqsType } from 'dh-marvel/components/faqs/faqsData';

type Data = FaqsType[] | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  // Consultar el metodo de la peticion
    if (req.method === 'GET') {
        // Se puede hacer una consulta a la base de datos, un archivo, etc.
        res.status(200).json(faqsData);
    } else {
        res.status(405).json({ message: 'Metodo no permitido' });
    };
}