export interface customerT{
    id:         number,
    firstName:  string,
    lastName:   string,
    maidenName: string,
    age:        number,
    gender:     string,
    email:      string,
    phone:      string,
    username:   string,
    password:   string,
    birthDate:  string,
    image:      string,
    bloodGroup: string,
    height:     number,
    weight:     number,
    eyeColor:   string,
    hair:       {
        color : string,
        type : string
    };
    ip :        string,
    address:    Address,
    company:    {
        department: string;
        name:       string;
        title:      string;
        address:    Address;
    },
    ein:        string;
    ssn:        string;
    userAgent:  string;
    crypto:     {
        coin : string,
        wallet : string,
        network : string
    };
    role:       string;
}

export interface Address {
    address:     string;
    city:        string;
    state:       string;
    stateCode:   string;
    postalCode:  string;
    coordinates: Coordinates;
    country:     string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface ImageT {
    id : string,
    author : string,
    width : Number,
    height : Number,
    url : string,
    download_url : string
}