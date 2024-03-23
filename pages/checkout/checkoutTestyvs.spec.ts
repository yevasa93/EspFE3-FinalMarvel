// import { render, screen, fireEvent } from '@testing-library/react';
// import FormCheckout, { getServerSideProps } from 'dh-marvel/pages/checkout/[id].page';
// import { Comic } from 'interface/comic';
// import { useRouter } from 'next/router';

// // Mock de useRouter para simular una ruta dinámica
// jest.mock('next/router', () => ({
//     ...jest.requireActual('next/router'),
//     useRouter: jest.fn(),
// }));

// // Mock de getComic para simular la obtención de datos del cómic
// jest.mock('dh-marvel/services/marvel/marvel.service', () => ({
//     getComic: jest.fn().mockResolvedValue({
//         id: 82965,
//         title: 'Marvel Previews (2017)',
//         price: 72,
//         stock: 2,
//         images: [{ path: 'image_path', extension: 'jpg' }],
//     }),
// }));

// describe('FormCheckout component', () => {
//     beforeEach(() => {
//         // Simula una ruta dinámica con un id de comic
//         (useRouter as jest.Mock).mockReturnValue({
//             query: { id: '82965' }, // Ajusta el id según tus necesidades
//         });
//     });

//     it('renders correctly', async () => {
//         render(<FormCheckout/>);

//       // Verifica si se muestra el título
//       expect(screen.getByText(/Purchase Form/i)).toBeInTheDocument();

//         // Verifica si se muestran los pasos del stepper
//         expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
//         expect(screen.getByText(/Delivery address/i)).toBeInTheDocument();
//         expect(screen.getByText(/Details of payment/i)).toBeInTheDocument();

//         // Verifica si se muestran los campos del formulario
//         expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/LastName/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

//         // Verifica si se muestra el botón "Next" inicialmente
//         expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
//     });

// ----------------------------------------------


//     it('handles form submission correctly', async () => {
//         render(<FormCheckout comicDetail={{ id: 1, title: 'Test Comic', price: 10, stock: 5, images: [] }} />);

//     // Simula el llenado del formulario
//     fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
//     fireEvent.change(screen.getByLabelText(/LastName/i), { target: { value: 'Doe' } });
//     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Street' } });
//     fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'State' } });
//     fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'City' } });
//     fireEvent.change(screen.getByLabelText(/ZipCode/i), { target: { value: '12345' } });
//     fireEvent.change(screen.getByLabelText(/cardNumber/i), { target: { value: '1234 5678 9012 3456' } });
//     fireEvent.change(screen.getByLabelText(/cardName/i), { target: { value: 'John Doe' } });
//     fireEvent.change(screen.getByLabelText(/expirationDate/i), { target: { value: '12/24' } });
//     fireEvent.change(screen.getByLabelText(/cvc/i), { target: { value: '123' } });

//     // Simula el envío del formulario
//     fireEvent.click(screen.getByRole('button', { name: /Next/i }));
//     fireEvent.click(screen.getByRole('button', { name: /Next/i }));
//     fireEvent.click(screen.getByRole('button', { name: /Finish/i }));

//     // Verifica si se llamó a useRouter.push con la ruta correcta
//     expect((await import('next/router')).useRouter().push).toHaveBeenCalledWith({
//         pathname: '/confirmacion-compra',
//         query: {
//             name: 'John',
//             lastName: 'Doe',
//             email: 'john.doe@example.com',
//             address: '123 Street',
//             state: 'State',
//             city: 'City',
//             zipCode: '12345',
//             comicTitle: 'Test Comic',
//             comicPrice: 10,
//             comicImage: 'image_path.jpg',
//         },
//     });
// });
// });

// describe('getServerSideProps function', () => {
//     it('fetches comic detail correctly', async () => {
//         const { props } = await getServerSideProps({ query: { id: '1' } });

//         expect(props.comicDetail).toEqual({
//             id: 1,
//             title: 'Test Comic',
//             price: 10,
//             stock: 5,
//             images: [{ path: 'image_path', extension: 'jpg' }],
//         });
//     });
// });
