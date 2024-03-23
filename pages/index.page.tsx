import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Comic } from 'interface/comic';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from '@mui/material';

interface ComicsPageProps {
    comics: Comic[];
    total: number;
}

const ComicsPage: NextPage<ComicsPageProps> = ({ comics, total }) => {

    const router = useRouter();
    const [page, setPage] = React.useState<number>(1);
    const limit = 12;              // <-----------------------------Cantidad de resultados por pagina

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        router.push(`/?offset=${(newPage - 1) * limit}`);
    };

    return (
        <LayoutGeneral>
            <Head>
                <title>Pagina de personajes de Marvel</title>
                <meta name="marvel cards" content="Pagina de personajes de Marvel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={'COMICS'}>
                <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {comics.map((itemComic: Comic) => (
                        <Card
                            sx={{ width: '15rem', margin: '2rem', display: 'flex', flexDirection: 'column' }}
                            key={itemComic.id}
                        >
                            <CardMedia
                                sx={{ height: 150 }}
                                image={
                                    itemComic.images.length > 0
                                        ? `${itemComic.images[0].path}.${itemComic.images[0].extension}`
                                        : 'https://pbs.twimg.com/profile_images/1560508217867718657/8ak-Td6l_400x400.jpg'     //coloque esta imagen por defecto porque me parecio mejor
                                }
                                title={itemComic.title}
                            />
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="subtitle2" component="div">
                                    {itemComic.title}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-around' }}>
                                <Button size="small" variant="outlined">
                                    <Link href={`/comic/${itemComic.id}`} passHref>
                                        <a style={{ textDecoration: 'none', color: '#1565c0' }}>DETAIL</a>
                                    </Link>
                                </Button>
                                <Link href={`/checkout/${itemComic.id}`} passHref>
                                    <Button size="small" variant="contained">
                                        BUY
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            page={page}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="primary"
                        />
                    </Stack>
                </Box>
            </BodySingle>
        </LayoutGeneral>
    );
};

export default ComicsPage;

export const getServerSideProps: GetServerSideProps<ComicsPageProps> = async ({ query }) => {
    try {
        const offset = parseInt(query.offset as string) || 0; // RECORDAR: como estoy usando 'query' que se alimenta de la URL y cada que cambia se re-renderiza, pero lo tomo de la URL entonces lo debo pasar a numero
        const limit = 12; 
        const comics = await getComics(offset, limit); 

        return {
            props: {
                comics: comics.data.results,
                total: comics.data.total,
            },
        };
    } catch (error) {
        console.error('Error fetching comics:', error);
        return {
            props: {
                comics: [],
                total: 0,
            },
        };
    }
};
