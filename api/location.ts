import axios from "axios";

const postcodeAPI = axios.create({
    headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
    },
});

export function getPostCodeDetails(postcode: string) {
    return postcodeAPI.get<GetPostcodeResponse>(`https://api.postcodes.io/postcodes/${postcode}`);
};

export function verifyPostCode(postcode: string) {
    return postcodeAPI.get<ValidatePostcodeResponse>(`https://api.postcodes.io/postcodes/${postcode}/validate`);
}

export function getNearestPostCode(params: { lat: number; long: number }) {
    return postcodeAPI.get<NearestPostcodeResponse>(`https://api.postcodes.io/postcodes?lon=${params.long}&lat=${params.lat}`);
}


export type GetPostcodeResponse = {
    status: number;
    result: PostCodeResult;
}



export type ValidatePostcodeResponse = {
    status: number;
    result: boolean;
}

export type NearestPostcodeResponse = {
    status: number;
    result: NearestPostcodeResult[];
}

export type NearestPostcodeResult = PostCodeResult & { distance: number };

export type PostCodeResult = {
    postcode: string;
    quality: number;
    eastings: number;
    northings: number;
    country: string;
    nhs_ha: string;
    longitude: number;
    latitude: number;
    european_electoral_region: string;
    primary_care_trust: string;
    region: null;
    lsoa: string;
    msoa: string;
    incode: string;
    outcode: string;
    parliamentary_constituency: string;
    parliamentary_constituency_2024: string;
    admin_district: string;
    parish: string;
    admin_county: null;
    date_of_introduction: string;
    admin_ward: string;
    ced: null;
    ccg: string;
    nuts: string;
    pfa: string;
    codes: Codes;
}

export type Codes = {
    admin_district: string;
    admin_county: string;
    admin_ward: string;
    parish: string;
    parliamentary_constituency: string;
    parliamentary_constituency_2024: string;
    ccg: string;
    ccg_id: string;
    ced: string;
    nuts: string;
    lsoa: string;
    msoa: string;
    lau2: string;
    pfa: string;
}