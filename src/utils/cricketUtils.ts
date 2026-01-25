// Cricket match statistics and insights
export interface MatchStats {
    totalMatches: number;
    liveMatches: number;
    upcomingMatches: number;
    completedToday: number;
}

export interface TournamentInfo {
    name: string;
    type: 'ODI' | 'T20' | 'Test' | 'T10';
    startDate: string;
    endDate: string;
    teams: number;
}

export const POPULAR_TOURNAMENTS: TournamentInfo[] = [
    {
        name: 'ICC World Cup 2026',
        type: 'ODI',
        startDate: '2026-02-01',
        endDate: '2026-03-15',
        teams: 10
    },
    {
        name: 'IPL 2026',
        type: 'T20',
        startDate: '2026-03-20',
        endDate: '2026-05-25',
        teams: 10
    },
    {
        name: 'The Ashes 2026',
        type: 'Test',
        startDate: '2026-06-01',
        endDate: '2026-08-15',
        teams: 2
    },
    {
        name: 'T20 World Cup 2026',
        type: 'T20',
        startDate: '2026-10-01',
        endDate: '2026-11-15',
        teams: 16
    }
];

export const getBettingTips = () => {
    return [
        'Always check pitch conditions before betting',
        'Consider team form in recent matches',
        'Weather can significantly impact match outcomes',
        'In-play betting offers better odds during momentum shifts',
        'Set a budget and stick to it'
    ];
};

export const formatOdds = (odds: number): string => {
    return odds.toFixed(2);
};

export const calculatePotentialWin = (stake: number, odds: number): number => {
    return stake * odds;
};

export const getMatchStatus = (status: string): { color: string; text: string } => {
    switch (status.toLowerCase()) {
        case 'live':
            return { color: '#ff4444', text: 'LIVE' };
        case 'upcoming':
            return { color: '#ffc107', text: 'UPCOMING' };
        case 'completed':
            return { color: '#00ff87', text: 'COMPLETED' };
        default:
            return { color: '#ffffff', text: status };
    }
};
