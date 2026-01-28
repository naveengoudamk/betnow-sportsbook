import { NextResponse } from 'next/server';

const CRICKET_API_URL = 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY || 'demo';

export async function GET() {
    try {
        const response = await fetch(
            `${CRICKET_API_URL}/matches?apikey=${API_KEY}&offset=0`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) throw new Error('Failed to fetch matches');

        const data = await response.json();

        // Filter for upcoming and results
        const upcoming = data.data?.filter((m: any) => !m.matchStarted).slice(0, 10) || [];
        const results = data.data?.filter((m: any) => m.matchEnded).slice(0, 10) || [];

        return NextResponse.json({
            success: true,
            upcoming,
            results
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'API Error' });
    }
}
