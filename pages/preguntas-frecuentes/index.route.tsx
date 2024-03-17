import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { getFaqs } from 'dh-marvel/services/getFaqs';
import { GetStaticProps, NextPage } from 'next';
import { FaqsType } from 'dh-marvel/components/faqs/faqsData';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



/* -------------------->   AQUI EMPIEZA EL COMPONENTE  <-------------------- */

interface FaqsPageProps {
  faqs: FaqsType[];
};

const FaqsPage: NextPage<FaqsPageProps> = ({ faqs }) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <LayoutGeneral>
      <div style={{ width: '70%', margin: '5rem' }}>


      {/* {faqs.map((faq) => (
          <Accordion expanded={expanded === `panel${faq.id}`} onChange={handleChange(`panel${faq.id}`)} key={faq.id}>
            <AccordionSummary aria-controls={`panel${faq.id}d-content`} id={`panel${faq.id}d-header`}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))} */}
      </div>
    </LayoutGeneral>
  );
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const faqs = await getFaqs();
//   return {
//     props: {
//       faqs
//     },
//   }
// }

/* OJO!!!: este archivo y el que esta dentro de Api deben llamarse igual*/
export default FaqsPage;