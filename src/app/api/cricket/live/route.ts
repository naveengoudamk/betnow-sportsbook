import { NextResponse } from 'next/server';

// CricketData API endpoint
const CRICKET_API_URL = 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY || 'demo'; // You'll need to get a free API key from cricketdata.org

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
            .slice(0, 5) // Limit to 5 matches
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
                    // Generate realistic odds based on scores
                    odds: generateOdds(team1Score, team2Score, match.matchType),
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

    // Simple odds calculation based on runs
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

// Generate in-play betting odds
function generateInPlayOdds() {
    return {
        nextBallSix: parseFloat((7.00 + Math.random() * 3.0).toFixed(2)),
        nextBallFour: parseFloat((4.00 + Math.random() * 2.0).toFixed(2)),
        nextBallWicket: parseFloat((5.00 + Math.random() * 2.0).toFixed(2)),
        nextBallDot: parseFloat((2.50 + Math.random() * 1.5).toFixed(2))
    };
}

// Sample matches for when API is unavailable or no live matches
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
            odds: {
                team1Win: 1.85,
                team2Win: 2.10,
            },
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
            odds: {
                team1Win: 3.20,
                team2Win: 1.35,
            },
            inPlayOdds: {
                nextBallSix: 7.00,
                nextBallFour: 4.50,
                nextBallWicket: 5.50,
                nextBallDot: 3.20,
            }
        },
        {
            id: 3,
            team1: 'South Africa',
            team2: 'New Zealand',
            tournament: 'Test Match - Day 3',
            status: 'live',
            currentInning: '1st Innings',
            score1: '312/8',
            overs1: '98.4',
            score2: 'Yet to bat',
            matchType: 'Test',
            venue: 'Cape Town',
            lastBalls: ['0', '1', '0', '2', '0', '1'],
            odds: {
                team1Win: 2.40,
                team2Win: 2.60,
                draw: 3.80,
            },
            inPlayOdds: {
                nextBallSix: 12.00,
                nextBallFour: 8.00,
                nextBallWicket: 4.20,
                nextBallDot: 1.90,
            }
        }
    ];
}
