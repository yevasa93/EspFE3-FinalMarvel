import { Box, Button, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "dh-marvel/components/mui/CustomInput";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ComicDetailPage from "../comic/[id].page";
import { useContext } from "react";
import { ComicContext } from "../comicContext";


const steps = [
    'Personal Information',
    'delivery address',
    'Details of payment',
];

const FormCheckout = () => {

    const comicContext = useContext(ComicContext); 
    if (!comicContext) {
        throw new Error('ComicContext no está definido'); // Manejar el caso en el que el contexto sea undefined
    }
    const { ComicId, setComicId } = comicContext;

    const schema = yup.object({
        name: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),
        lastName: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),
        email: yup
            .string()
            .required("Este campo es requerido")
            .email("Correo inválido")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
        address: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 50 caracteres"),
        addressDetail: yup
            .string()
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 50 caracteres"),
        state: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),
        city: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),
        zipCode: yup
            .string()
            .required("Este campo es requerido")
            .matches(/^\d{6}$/, "El código postal debe tener exactamente 6 dígitos"),
        cardNumber: yup
            .string()
            .required("Este campo es requerido")
            .matches(/^\d{12}$/, "El código postal debe tener exactamente 12 dígitos"),
        cardName: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(30, "Máximo 20 caracteres"),
        expirationDate: yup
            .string()
            .required("Este campo es requerido")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),
        cvc: yup
            .string()
            .required("Este campo es requerido")
            .matches(/^\d{3}$/, "El código postal debe tener exactamente 3 dígitos"),
    });

    type DataForm = yup.InferType<typeof schema>; // Importante esta línea para que sea compatible con TypeScript

    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<DataForm>({
        resolver: yupResolver(schema), // Utiliza yupResolver
        mode: "onChange",
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            address: "",
            addressDetail: "",
            state: "",
            city: "",
            zipCode: "",
            cardNumber: "",
            cardName: "",
            expirationDate: "",
            cvc: ""
        },
    });

    const onSubmit = (data: DataForm) => {
        console.log(data);
    };

    //a continaucion uso useWatch para poder luego hacer la validacion de que no dejen los campos vacios
    const name = useWatch({ control, name: 'name' });
    const lastName = useWatch({ control, name: 'lastName' });
    const email = useWatch({ control, name: 'email' });

    const address = useWatch({ control, name: 'address' });  //Recordar que addressDetail se coloco como opcional por eso no esta con useWatch()
    const state = useWatch({ control, name: 'state' });
    const city = useWatch({ control, name: 'city' });
    const zipCode = useWatch({ control, name: 'zipCode' });

    const cardNumber = useWatch({ control, name: 'cardNumber' });
    const cardName = useWatch({ control, name: 'cardName' });
    const expirationDate = useWatch({ control, name: 'expirationDate' });
    const cvc = useWatch({ control, name: 'cvc' });

    const isStepValid = (step: number) => {
        switch (step) {
            case 0: // Primer paso
                return (!errors.name && !errors.lastName && !errors.email && name.trim() !== '' && lastName.trim() !== '' && email.trim() !== '');
            case 1: // Segundo paso
                return (!errors.address && !errors.addressDetail && !errors.state && !errors.city && !errors.zipCode && address.trim() !== '' && state.trim() !== '' && city.trim() !== '' && zipCode.trim() !== '');
            case 2: // Tercer paso
                return (!errors.cardNumber && !errors.cardName && !errors.expirationDate && !errors.cvc && cardNumber.trim() !== '' && cardName.trim() !== '' && expirationDate.trim() !== '' && cvc.trim() !== '');
            default:
                return true; // Por defecto
        }
    };


    // ------------------------------------ STEPPER ------------------------------------------
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <LayoutCheckout>
            <Box sx={{ width: '70%' }}>
                <Typography variant="h4" align="center" margin="2rem">
                    Purchase Form
                </Typography>


                <Box sx={{ margin: '20px', display: 'flex', flexDirection: 'row' }}>

                    <Box sx={{ width: '30%' }}>
                        {/* <ComicDetailPage comicDetail={undefined}/> */}
                        {ComicId}
                    </Box>

                    <Box sx={{ width: '70%' }}>
                        <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: '2rem' }}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you are finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {activeStep === 0 && (
                                        <>
                                            <CustomInput name="name" label="Name" type="text" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.name?.message}
                                            </Typography>

                                            <CustomInput name="lastName" label="LastName" type="text" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.lastName?.message}
                                            </Typography>

                                            <CustomInput name="email" label="Email" type="email" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.email?.message}
                                            </Typography>
                                        </>
                                    )}
                                    {activeStep === 1 && (
                                        <>
                                            <CustomInput name="address" label="Address" type="text" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.address?.message}
                                            </Typography>

                                            <CustomInput name="state" label="State" type="text" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.state?.message}
                                            </Typography>

                                            <CustomInput name="city" label="City" type="text" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.city?.message}
                                            </Typography>

                                            <CustomInput name="zipCode" label="ZipCode" type="text" control={control} defaultValue="" required={true} />
                                            <Typography variant="caption" color="error">
                                                {errors.zipCode?.message}
                                            </Typography>
                                        </>
                                    )}
                                    {activeStep === 2 && (
                                        <Typography sx={{ mt: 2, mb: 1 }}>Tercera parte del formulario</Typography>
                                    )}
                                </form>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button size="small" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Button size="small" variant="contained" onClick={handleNext} disabled={!isStepValid(activeStep)}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </Box>

            </Box>
        </LayoutCheckout>
    );
};
export default FormCheckout;