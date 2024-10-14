'use client';
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets';
import { useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

const matchesMockData = [
  {
    id: 1,
    name: 'Round 1 - Match 1',
    nextMatchId: 16,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.990Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team1',
        name: 'Team 1',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team2',
        name: 'Team 2',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 2,
    name: 'Round 1 - Match 2',
    nextMatchId: 16,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team3',
        name: 'Team 3',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team4',
        name: 'Team 4',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 3,
    name: 'Round 1 - Match 3',
    nextMatchId: 17,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team5',
        name: 'Team 5',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team6',
        name: 'Team 6',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 4,
    name: 'Round 1 - Match 4',
    nextMatchId: 17,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team7',
        name: 'Team 7',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team8',
        name: 'Team 8',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 5,
    name: 'Round 1 - Match 5',
    nextMatchId: 18,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team9',
        name: 'Team 9',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team10',
        name: 'Team 10',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 6,
    name: 'Round 1 - Match 6',
    nextMatchId: 18,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team11',
        name: 'Team 11',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team12',
        name: 'Team 12',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 7,
    name: 'Round 1 - Match 7',
    nextMatchId: 19,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team13',
        name: 'Team 13',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team14',
        name: 'Team 14',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 8,
    name: 'Round 1 - Match 8',
    nextMatchId: 19,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team15',
        name: 'Team 15',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team16',
        name: 'Team 16',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 9,
    name: 'Round 1 - Match 9',
    nextMatchId: 20,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team17',
        name: 'Team 17',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team18',
        name: 'Team 18',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 10,
    name: 'Round 1 - Match 10',
    nextMatchId: 20,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team19',
        name: 'Team 19',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team20',
        name: 'Team 20',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 11,
    name: 'Round 1 - Match 11',
    nextMatchId: 21,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team21',
        name: 'Team 21',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team22',
        name: 'Team 22',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 12,
    name: 'Round 1 - Match 12',
    nextMatchId: 21,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team23',
        name: 'Team 23',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team24',
        name: 'Team 24',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 13,
    name: 'Round 1 - Match 13',
    nextMatchId: 22,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team25',
        name: 'Team 25',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team26',
        name: 'Team 26',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 14,
    name: 'Round 1 - Match 14',
    nextMatchId: 22,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team27',
        name: 'Team 27',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team28',
        name: 'Team 28',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 15,
    name: 'Round 1 - Match 15',
    nextMatchId: 23,
    tournamentRoundText: '1',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team29',
        name: 'Team 29',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team30',
        name: 'Team 30',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 16,
    name: 'Round 2 - Match 1',
    nextMatchId: 24,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team31',
        name: 'Team 31',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'bye',
        name: 'BYE',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 17,
    name: 'Round 2 - Match 2',
    nextMatchId: 24,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team33',
        name: 'Team 33',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team34',
        name: 'Team 34',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 18,
    name: 'Round 2 - Match 3',
    nextMatchId: 25,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team35',
        name: 'Team 35',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team36',
        name: 'Team 36',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 19,
    name: 'Round 2 - Match 4',
    nextMatchId: 25,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team37',
        name: 'Team 37',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team38',
        name: 'Team 38',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 20,
    name: 'Round 2 - Match 5',
    nextMatchId: 26,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team39',
        name: 'Team 39',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team40',
        name: 'Team 40',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 21,
    name: 'Round 2 - Match 6',
    nextMatchId: 26,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team41',
        name: 'Team 41',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team42',
        name: 'Team 42',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 22,
    name: 'Round 2 - Match 7',
    nextMatchId: 27,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team43',
        name: 'Team 43',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team44',
        name: 'Team 44',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 23,
    name: 'Round 2 - Match 8',
    nextMatchId: 27,
    tournamentRoundText: '2',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team45',
        name: 'Team 45',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team46',
        name: 'Team 46',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 24,
    name: 'Round 3 - Match 1',
    nextMatchId: 28,
    tournamentRoundText: '3',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team47',
        name: 'Team 47',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team48',
        name: 'Team 48',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 25,
    name: 'Round 3 - Match 2',
    nextMatchId: 28,
    tournamentRoundText: '3',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team49',
        name: 'Team 49',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team50',
        name: 'Team 50',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 26,
    name: 'Round 3 - Match 3',
    nextMatchId: 29,
    tournamentRoundText: '3',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team51',
        name: 'Team 51',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team52',
        name: 'Team 52',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 27,
    name: 'Round 3 - Match 4',
    nextMatchId: 29,
    tournamentRoundText: '3',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team53',
        name: 'Team 53',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team54',
        name: 'Team 54',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 28,
    name: 'Round 4 - Match 1',
    nextMatchId: 30,
    tournamentRoundText: '4',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team55',
        name: 'Team 55',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team56',
        name: 'Team 56',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 29,
    name: 'Round 4 - Match 2',
    nextMatchId: 30,
    tournamentRoundText: '4',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team57',
        name: 'Team 57',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team58',
        name: 'Team 58',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
  {
    id: 30,
    name: 'Round 5 - Match 1',
    nextMatchId: null,
    tournamentRoundText: '5',
    startTime: '2024-10-14T09:15:48.991Z',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'team59',
        name: 'Team 59',
        resultText: null,
        isWinner: false,
        status: null,
      },
      {
        id: 'team60',
        name: 'Team 60',
        resultText: null,
        isWinner: false,
        status: null,
      },
    ],
  },
];

const theme = createTheme({
  textColor: { main: '#FFFFFF', highlighted: '#FFFFFF', dark: '#FFFFFF' },
  matchBackground: {
    wonColor: '#2A0A38',
    lostColor: '#2A0A38',
    defaultColor: '#1A0024',
  },
  score: {
    background: {
      wonColor: '#2A0A38',
      lostColor: '#2A0A38',
    },
    text: { highlightedWonColor: '#FFFFFF', highlightedLostColor: '#FFFFFF' },
  },
  border: {
    color: '#FFD700', // Gold color for borders
    highlightedColor: '#FFD700',
  },
  roundHeader: { backgroundColor: '#2A0A', fontColor: '#FFFFFF' },
  connectorColor: '#FFD700', // Gold color for connectors
  connectorColorHighlight: '#FFD700',
  svgBackground: '#1A0024', // Dark purple background
});

export const SingleElimination = () => {
  const [updatedMatches, setUpdatedMatches] = useState(matchesMockData);
  const size = useWindowSize();
  const finalWidth = size?.width && size.width * 0.9;
  const finalHeight = size?.height && size.height * 0.9;

  return (
    <SingleEliminationBracket
      matches={matchesMockData}
      theme={theme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: theme.roundHeader.backgroundColor, //* this is not changing
            fontColor: theme.roundHeader.fontColor,
          },
          connectorColor: theme.connectorColor,
          connectorColorHighlight: theme.connectorColorHighlight,
        },
      }}
      matchComponent={Match}
      svgWrapper={({ children, ...props }: any) => (
        <SVGViewer
          background={theme.svgBackground}
          SVGBackground={theme.svgBackground}
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
    />
  );
};
