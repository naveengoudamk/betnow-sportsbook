import { NextResponse } from 'next/server';

// CricketData API endpoint
const CRICKET_API_URL = 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY || 'demo';

export async function GET() {
    try {
        // Fetch current matches
        const response = await fetch(
            `${CRICKET_API_URL}/currentMatches?apikey=${API_KEY}&offset=0`,
            {
                next: { revalidate: 30 } // Cache for 30 seconds
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch cricket data');
        }

        const data = await response.json();

        // Filter for live matches and format the data
        const liveMatches = data.data
            ?.filter((match: any) => match.matchStarted && !match.matchEnded)
            .slice(0, 5)
            .map((match: any) => {
                // Parse score data
                const team1Score = match.score?.[0] || {};
                const team2Score = match.score?.[1] || {};

                return {
                    id: match.id,
                    team1: match.teams?.[0] || match.teamInfo?.[0]?.name || 'Team 1',
                    team2: match.teams?.[1] || match.teamInfo?.[1]?.name || 'Team 2',
                    tournament: match.series || match.matchType || 'Cricket Match',
                    status: 'live',
                    currentInning: match.status || 'In Progress',
                    score1: team1Score.r && team1Score.w !== undefined
                        ? `${team1Score.r}/${team1Score.w}`
                        : team1Score.inning || 'Yet to bat',
                    score2: team2Score.r && team2Score.w !== undefined
                        ? `${team2Score.r}/${team2Score.w}`
                        : team2Score.inning || 'Yet to bat',
                    overs1: team1Score.o ? `${team1Score.o}` : undefined,
                    overs2: team2Score.o ? `${team2Score.o}` : undefined,
                    matchType: match.matchType || 'ODI',
                    venue: match.venue || '',
                    // Generate realistic odds and ratios
                    odds: generateOdds(team1Score, team2Score, match.matchType),
                    ratios: generateRatios(team1Score, team2Score),
                    sessions: generateSessions(team1Score),
                    inPlayOdds: generateInPlayOdds()
                };
            }) || [];

        // If no live matches, return sample data
        if (liveMatches.length === 0) {
            return NextResponse.json({
                success: true,
                data: getSampleMatches(),
                message: 'No live matches currently. Showing sample data.'
            });
        }

        return NextResponse.json({
            success: true,
            data: liveMatches,
            message: 'Live matches fetched successfully'
        });

    } catch (error) {
        console.error('Cricket API Error:', error);

        // Return sample data on error
        return NextResponse.json({
            success: true,
            data: getSampleMatches(),
            message: 'Using sample data due to API error'
        });
    }
}

// Generate realistic odds based on current match situation
function generateOdds(team1Score: any, team2Score: any, matchType: string) {
    const hasDrawOdds = matchType?.toLowerCase().includes('test');
    const team1Runs = parseInt(team1Score.r) || 0;
    const team2Runs = parseInt(team2Score.r) || 0;

    let team1Win = 2.00;
    let team2Win = 2.00;

    if (team1Runs > team2Runs) {
        team1Win = 1.50 + Math.random() * 0.5;
        team2Win = 2.50 + Math.random() * 1.0;
    } else if (team2Runs > team1Runs) {
        team1Win = 2.50 + Math.random() * 1.0;
        team2Win = 1.50 + Math.random() * 0.5;
    }

    return {
        team1Win: parseFloat(team1Win.toFixed(2)),
        team2Win: parseFloat(team2Win.toFixed(2)),
        ...(hasDrawOdds && { draw: parseFloat((3.50 + Math.random() * 1.0).toFixed(2)) })
    };
}

// Generate realistic Back/Lay ratios (Indian Market Style)
function generateRatios(team1Score: any, team2Score: any) {
    const t1r = parseInt(team1Score.r) || 0;
    const t2r = parseInt(team2Score.r) || 0;

    // Base ratio calculation
    let base = 80;
    if (t1r > t2r) base = 60 + Math.floor(Math.random() * 10);
    else base = 90 + Math.floor(Math.random() * 10);

    return {
        team1: { back: base, lay: base + 2 },
        team2: { back: 100 - base - 2, lay: 100 - base }
    };
}

// Generate Session/Lambi data
function generateSessions(score: any) {
    const currentRuns = parseInt(score.r) || 0;
    const currentOvers = parseFloat(score.o) || 0;

    return [
        { name: '6 Over Session', back: Math.floor(currentRuns + 15), lay: Math.floor(currentRuns + 17) },
        { name: '10 Over Session', back: Math.floor(currentRuns + 35), lay: Math.floor(currentRuns + 38) },
        { name: '20 Over Session', back: Math.floor(currentRuns + 85), lay: Math.floor(currentRuns + 90) },
        { name: 'Lambi (50 Over)', back: Math.floor(currentRuns + 210), lay: Math.floor(currentRuns + 215) }
    ];
}

function generateInPlayOdds() {
    return {
        nextBallSix: parseFloat((7.00 + Math.random() * 3.0).toFixed(2)),
        nextBallFour: parseFloat((4.00 + Math.random() * 2.0).toFixed(2)),
        nextBallWicket: parseFloat((5.00 + Math.random() * 2.0).toFixed(2)),
        nextBallDot: parseFloat((2.50 + Math.random() * 1.5).toFixed(2))
    };
}

function getSampleMatches() {
    return [
        {
            id: 1,
            team1: 'India',
            team2: 'Australia',
            tournament: 'ICC World Cup 2026',
            status: 'live',
            currentInning: '1st Innings',
            score1: '245/4',
            overs1: '42.3',
            score2: 'Yet to bat',
            matchType: 'ODI',
            venue: 'Mumbai',
            lastBalls: ['4', '1', '6', '0', 'W', '2'],
            odds: { team1Win: 1.85, team2Win: 2.10 },
            ratios: {
                team1: { back: 82, lay: 84 },
                team2: { back: 118, lay: 120 }
            },
            sessions: [
                { name: '6 Over Session', back: 48, lay: 50 },
                { name: '10 Over Session', back: 75, lay: 78 },
                { name: '20 Over Session', back: 145, lay: 148 },
                { name: 'Lambi (50 Over)', back: 310, lay: 315 }
            ],
            inPlayOdds: {
                nextBallSix: 8.50,
                nextBallFour: 5.20,
                nextBallWicket: 6.00,
                nextBallDot: 2.80,
            }
        },
        {
            id: 2,
            team1: 'England',
            team2: 'Pakistan',
            tournament: 'T20 International',
            status: 'live',
            currentInning: '2nd Innings',
            score1: '178/7',
            overs1: '20.0',
            score2: '145/5',
            overs2: '16.2',
            matchType: 'T20',
            venue: 'Dubai',
            lastBalls: ['1', '2', '4', '1', '0', '6'],
            odds: { team1Win: 3.20, team2Win: 1.35 },
            ratios: {
                team1: { back: 320, lay: 330 },
                team2: { back: 132, lay: 135 }
            },
            sessions: [
                { name: 'Match Winner England', back: 3.2, lay: 3.3 },
                { name: 'Match Winner Pakistan', back: 1.3, lay: 1.35 }
            ],
            inPlayOdds: {
                nextBallSix: 7.00,
                nextBallFour: 4.50,
                nextBallWicket: 5.50,
                nextBallDot: 3.20,
            }
        }
    ];
}

