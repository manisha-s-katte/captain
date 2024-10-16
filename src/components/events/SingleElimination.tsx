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
    nextMatchId: 5,
    tournamentRoundText: '1',
    startTime: '2024-10-16T04:47:15.579Z',
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
    nextMatchId: 5,
    tournamentRoundText: '1',
    startTime: '2024-10-16T04:47:15.579Z',
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
    nextMatchId: 6,
    tournamentRoundText: '1',
    startTime: '2024-10-16T04:47:15.579Z',
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
    nextMatchId: 6,
    tournamentRoundText: '1',
    startTime: '2024-10-16T04:47:15.579Z',
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
    name: 'Round 2 - Match 1',
    nextMatchId: 7,
    tournamentRoundText: '2',
    startTime: '2024-10-16T04:47:15.579Z',
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
    name: 'Round 2 - Match 2',
    nextMatchId: 7,
    tournamentRoundText: '2',
    startTime: '2024-10-16T04:47:15.579Z',
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
    name: 'Round 3 - Match 1',
    nextMatchId: null,
    tournamentRoundText: '3',
    startTime: '2024-10-16T04:47:15.579Z',
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

export const SingleElimination = ({ matches }: { matches: any }) => {
  const [updatedMatches, setUpdatedMatches] = useState(matchesMockData);
  const size = useWindowSize();
  const finalWidth = size?.width && size.width * 0.9;
  const finalHeight = size?.height && size.height * 0.9;

  return (
    <SingleEliminationBracket
      matches={matches}
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
