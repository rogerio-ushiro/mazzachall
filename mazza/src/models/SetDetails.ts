interface SetDetails {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: { [key: string]: string };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string;
        logo: string;
    };
}