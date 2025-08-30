// src/lib/types/runriot-types.ts

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

export interface Session {
    name: string;
    _id: string;
    token: string;
}

export interface Trail {
    _id?: string;
    title: string; 
    location: string;
    userid?: string;
    img?: string;
    lat?: number;
    lng?: number;
}

export interface Result {
    _id?: string;
    distance: number;
    duration: number;
    date: string; 
    trailid?: string; // Optional since it comes from URL parameter
    lat: number;
    lng: number;
}

export interface PopulatedResult extends Omit<Result, 'trailid'> {
    trailid?: Trail; // When populated, trailid contains the full trail object
}
